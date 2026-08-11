import os
import re
import time
import sqlite3
import secrets
import smtplib
import threading
from email.mime.text import MIMEText
from urllib.parse import urlparse
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone

import requests
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Config — everything here comes from Railway → Variables. Nothing secret is
# hardcoded. See README.md for what to set and why.
# ---------------------------------------------------------------------------
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://aaad3ee3.github.io")
PLUS_API_KEY = os.environ["PLUS_API_KEY"]
SITE_TOKEN = os.environ.get("SITE_TOKEN")  # optional extra gate, see README
DAILY_CAP_USD = float(os.environ.get("DAILY_CAP_USD", "20"))  # hard stop on real spend/day
DB_PATH = os.environ.get("DB_PATH", "app.db")  # point this at a Railway Volume — see README

PLUS_BASE = "https://hamadh.net/api/v2"
MARKUP = 1.25  # 25% margin, applied here on the server — the browser never sees the base cost

# Server-side allow-list. Mirrors the front-end catalog on purpose: even if someone
# crafts a raw request straight to this API (skipping the website entirely), only
# these service_ids can ever be ordered. Poll-vote services and the Gemini Pro
# endpoint are deliberately not in this list and can't be added by a frontend request.
ALLOWED_SERVICES = {
    401: {"min": 100, "max": 1000000},
    402: {"min": 100, "max": 1000000},
    283: {"min": 10, "max": 1000000},
    139: {"min": 100, "max": 217545811},
    130: {"min": 50, "max": 5000000},
    132: {"min": 10, "max": 1000000},
    363: {"min": 10, "max": 10000},
    397: {"min": 10, "max": 1000000},
    287: {"min": 1, "max": 1000000},
    460: {"min": 1, "max": 10000},
    269: {"min": 200, "max": 100000},
    270: {"min": 10, "max": 20000},
    140: {"min": 10, "max": 10000},
    414: {"min": 10, "max": 100000},
}

# ---------------------------------------------------------------------------
# In-memory guards. IMPORTANT LIMITATION: this resets on every restart/redeploy
# and does NOT share state across multiple instances if you ever scale beyond
# one Railway service. Good enough for a single small instance; if you outgrow
# that, this needs to move to Redis or a database instead.
# ---------------------------------------------------------------------------
_lock = threading.Lock()
_request_log = defaultdict(deque)      # ip -> deque[timestamps] for rate limiting
_price_cache = {}                      # service_id -> last known price_per_1000_usd (base, pre-markup)
_cards_price_cache = {}                # cards product_id -> last known base price (pre-markup)

RATE_LIMIT_WINDOW_SEC = 60
RATE_LIMIT_MAX_REQUESTS = 20  # per IP, per window, on the order endpoint


def client_ip():
    # Railway sits as a single reverse proxy in front of this app and appends
    # the real client IP as the LAST hop of X-Forwarded-For. Trusting the
    # FIRST hop instead (a common mistake) lets any client bypass every
    # IP-based rate limit below just by sending its own fake header, e.g.
    # `X-Forwarded-For: 1.2.3.4` on every request.
    fwd = request.headers.get("X-Forwarded-For", "")
    if fwd:
        parts = [p.strip() for p in fwd.split(",") if p.strip()]
        if parts:
            return parts[-1]
    return request.remote_addr or "unknown"


def rate_limited(ip, max_requests=RATE_LIMIT_MAX_REQUESTS, window=RATE_LIMIT_WINDOW_SEC):
    now = time.time()
    with _lock:
        q = _request_log[ip]
        while q and now - q[0] > window:
            q.popleft()
        if len(q) >= max_requests:
            return True
        q.append(now)
        return False


_spend_today = {"rashq": {"date": None, "total_usd": 0.0}, "cards": {"date": None, "total_usd": 0.0}}


def add_spend(usd, bucket="rashq"):
    today = time.strftime("%Y-%m-%d")
    with _lock:
        b = _spend_today[bucket]
        if b["date"] != today:
            b["date"] = today
            b["total_usd"] = 0.0
        b["total_usd"] += usd


def spend_today(bucket="rashq"):
    today = time.strftime("%Y-%m-%d")
    with _lock:
        b = _spend_today[bucket]
        if b["date"] != today:
            return 0.0
        return b["total_usd"]


def valid_link(link):
    if not link or not isinstance(link, str) or len(link) > 500:
        return False
    try:
        parsed = urlparse(link)
    except Exception:
        return False
    return parsed.scheme in ("http", "https") and bool(parsed.netloc)


def site_token_ok():
    if not SITE_TOKEN:
        return True  # not configured — see README, recommended but not required
    # secrets.compare_digest instead of == — same constant-time-comparison
    # principle already used for login()'s password check, applied here too.
    return secrets.compare_digest(request.headers.get("X-Site-Token", ""), SITE_TOKEN)


# ---------------------------------------------------------------------------
# Auth — real accounts, real password hashing (werkzeug, ships with Flask —
# no plaintext passwords ever stored or logged). SQLite chosen deliberately:
# it's in Python's standard library (nothing new to install) and needs only
# a Railway Volume to persist — see README for the one extra setup step.
# ---------------------------------------------------------------------------
EMAIL_RE = re.compile(r'^[^@\s]{1,64}@[^@\s]{1,190}\.[^@\s]{2,24}$')
# Computed once at startup, used only to keep login() timing constant when the
# email isn't found — see the timing-attack note in login() below.
DUMMY_HASH = generate_password_hash(secrets.token_hex(16))

# --- Outgoing email, via Gmail SMTP (smtplib is Python's standard library —
# no new package, no new external service to sign up for beyond a Gmail
# account you already have + a Google "App Password" for it, see README). ---
SMTP_EMAIL = os.environ.get("SMTP_EMAIL")
SMTP_APP_PASSWORD = os.environ.get("SMTP_APP_PASSWORD")
SITE_URL = os.environ.get("SITE_URL", "https://aaad3ee3.github.io/supersonic")


def send_email(to_email, subject, body):
    if not SMTP_EMAIL or not SMTP_APP_PASSWORD:
        print(f"[email] SMTP not configured — would have sent to {to_email!r}: {subject!r}")
        return False
    try:
        msg = MIMEText(body, "plain", "utf-8")
        msg["Subject"] = subject
        msg["From"] = SMTP_EMAIL
        msg["To"] = to_email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=10) as server:
            server.login(SMTP_EMAIL, SMTP_APP_PASSWORD)
            server.sendmail(SMTP_EMAIL, [to_email], msg.as_string())
        return True
    except Exception as e:
        print(f"[email] send to {to_email!r} failed: {e}")
        return False


def make_email_token(conn, user_id, kind):
    token = secrets.token_hex(24)
    conn.execute("INSERT INTO email_tokens (token, user_id, kind) VALUES (?, ?, ?)", (token, user_id, kind))
    return token


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email_verified INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS email_tokens (
            token TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            kind TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            used INTEGER DEFAULT 0
        )
    """)
    # For databases created before email_verified existed.
    try:
        conn.execute("ALTER TABLE users ADD COLUMN email_verified INTEGER DEFAULT 0")
    except sqlite3.OperationalError:
        pass  # already there
    conn.commit()
    conn.close()


init_db()


SESSION_TTL_DAYS = 30


def current_user():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    token = auth[7:].strip()
    if not token:
        return None
    conn = get_db()
    row = conn.execute(
        "SELECT users.id, users.name, users.email, users.email_verified, sessions.created_at FROM sessions "
        "JOIN users ON sessions.user_id = users.id WHERE sessions.token = ?",
        (token,),
    ).fetchone()
    if not row:
        conn.close()
        return None

    created = None
    try:
        created = datetime.strptime(row["created_at"], "%Y-%m-%d %H:%M:%S")
    except (ValueError, TypeError):
        pass
    if created and (datetime.now(timezone.utc).replace(tzinfo=None) - created) > timedelta(days=SESSION_TTL_DAYS):
        conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()
        return None

    conn.close()
    return {"id": row["id"], "name": row["name"], "email": row["email"], "email_verified": bool(row["email_verified"])}


# ---------------------------------------------------------------------------
# CORS — restricted to your one site, and only the methods/headers actually used.
# ---------------------------------------------------------------------------
@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Site-Token, Authorization"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    return resp


@app.route("/api/rashq/<path:_>", methods=["OPTIONS"])
@app.route("/api/auth/<path:_>", methods=["OPTIONS"])
def cors_preflight(_):
    return "", 204


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/auth/signup")
def signup():
    ip = client_ip()
    if rate_limited(f"signup:{ip}", max_requests=10, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    body = request.get_json(force=True, silent=True) or {}
    name = str(body.get("name") or "").strip()
    email = str(body.get("email") or "").strip().lower()
    password = str(body.get("password") or "")

    if not name or len(name) > 60:
        return jsonify({"success": False, "error": "الاسم غير صالح"}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"success": False, "error": "بريد إلكتروني غير صالح"}), 400
    if len(password) < 8 or len(password) > 200:
        return jsonify({"success": False, "error": "كلمة المرور لازم تكون 8 أحرف على الأقل"}), 400

    conn = get_db()
    try:
        exists = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
        if exists:
            return jsonify({"success": False, "error": "البريد الإلكتروني مستخدم بالفعل"}), 409

        pw_hash = generate_password_hash(password)
        cur = conn.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            (name, email, pw_hash),
        )
        user_id = cur.lastrowid
        token = secrets.token_hex(32)
        conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user_id))
        verify_token = make_email_token(conn, user_id, "verify")
        conn.commit()
    finally:
        conn.close()

    verify_link = f"{SITE_URL}?verify_token={verify_token}"
    send_email(
        email,
        "فعّل بريدك الإلكتروني — Supersonic",
        f"أهلًا {name}،\n\nفعّل بريدك الإلكتروني عبر هذا الرابط:\n{verify_link}\n\nلو ما طلبت هذا الحساب، تجاهل الرسالة.",
    )

    print(f"[auth] new signup — ip={ip} user_id={user_id}")
    return jsonify({"success": True, "token": token, "user": {"id": user_id, "name": name, "email": email, "email_verified": False}})


@app.post("/api/auth/login")
def login():
    ip = client_ip()
    # Tighter than the general limit on purpose — this endpoint checks passwords.
    if rate_limited(f"login-ip:{ip}", max_requests=8, window=60):
        return jsonify({"success": False, "error": "محاولات كثيرة، حاول بعد شوي"}), 429

    body = request.get_json(force=True, silent=True) or {}
    email = str(body.get("email") or "").strip().lower()
    password = str(body.get("password") or "")

    # A second limiter keyed by email (not IP) — stops someone from rotating IPs
    # to brute-force one specific account past the per-IP limit above.
    if email and rate_limited(f"login-email:{email}", max_requests=8, window=60):
        return jsonify({"success": False, "error": "محاولات كثيرة، حاول بعد شوي"}), 429

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT id, name, password_hash, email_verified FROM users WHERE email = ?", (email,)
        ).fetchone()

        # Always run a hash check, even when the email doesn't exist — comparing
        # against DUMMY_HASH keeps the response time the same either way, so
        # response timing can't be used to guess which emails are registered.
        hash_to_check = row["password_hash"] if row else DUMMY_HASH
        password_ok = check_password_hash(hash_to_check, password)

        if not row or not password_ok:
            return jsonify({"success": False, "error": "البريد الإلكتروني أو كلمة المرور غير صحيحة"}), 401

        token = secrets.token_hex(32)
        conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, row["id"]))
        conn.commit()
    finally:
        conn.close()

    print(f"[auth] login — ip={ip} user_id={row['id']}")
    return jsonify({
        "success": True,
        "token": token,
        "user": {"id": row["id"], "name": row["name"], "email": email, "email_verified": bool(row["email_verified"])},
    })


@app.get("/api/auth/me")
def me():
    user = current_user()
    if not user:
        return jsonify({"success": False}), 401
    return jsonify({"success": True, "user": user})


@app.post("/api/auth/logout")
def logout():
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        token = auth[7:].strip()
        conn = get_db()
        conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()
    return jsonify({"success": True})


@app.get("/api/auth/verify")
def verify_email():
    ip = client_ip()
    if rate_limited(f"verify:{ip}", max_requests=20, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    token = request.args.get("token", "")
    conn = get_db()
    try:
        row = conn.execute(
            "SELECT user_id FROM email_tokens WHERE token = ? AND kind = 'verify' AND used = 0", (token,)
        ).fetchone()
        if not row:
            return jsonify({"success": False, "error": "رابط التفعيل غير صالح أو مستخدم من قبل"}), 400
        conn.execute("UPDATE users SET email_verified = 1 WHERE id = ?", (row["user_id"],))
        conn.execute("UPDATE email_tokens SET used = 1 WHERE token = ?", (token,))
        conn.commit()
    finally:
        conn.close()
    print(f"[auth] email verified — ip={ip} user_id={row['user_id']}")
    return jsonify({"success": True})


@app.post("/api/auth/resend-verification")
def resend_verification():
    user = current_user()
    if not user:
        return jsonify({"success": False, "error": "سجّل دخولك أول"}), 401
    ip = client_ip()
    if rate_limited(f"resend:{user['id']}", max_requests=3, window=300):
        return jsonify({"success": False, "error": "حاول بعد شوي"}), 429
    if user["email_verified"]:
        return jsonify({"success": True})  # already verified, nothing to do

    conn = get_db()
    try:
        verify_token = make_email_token(conn, user["id"], "verify")
        conn.commit()
    finally:
        conn.close()
    verify_link = f"{SITE_URL}?verify_token={verify_token}"
    send_email(user["email"], "فعّل بريدك الإلكتروني — Supersonic", f"فعّل بريدك عبر:\n{verify_link}")
    print(f"[auth] verification resent — ip={ip} user_id={user['id']}")
    return jsonify({"success": True})


@app.post("/api/auth/forgot-password")
def forgot_password():
    ip = client_ip()
    if rate_limited(f"forgot-ip:{ip}", max_requests=5, window=300):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    body = request.get_json(force=True, silent=True) or {}
    email = str(body.get("email") or "").strip().lower()
    if email:
        # Same email-based limiter pattern used on login — stops someone from
        # spamming one inbox with reset emails from rotating IPs.
        if rate_limited(f"forgot:{email}", max_requests=3, window=300):
            return jsonify({"success": True})  # pretend success, don't reveal the limiter fired

    conn = get_db()
    try:
        row = conn.execute("SELECT id, name FROM users WHERE email = ?", (email,)).fetchone()
        if row:
            reset_token = make_email_token(conn, row["id"], "reset")
            conn.commit()
            reset_link = f"{SITE_URL}?reset_token={reset_token}"
            send_email(
                email,
                "إعادة تعيين كلمة المرور — Supersonic",
                f"أهلًا {row['name']}،\n\nلإعادة تعيين كلمة المرور:\n{reset_link}\n\nالرابط صالح لمدة ساعة. "
                f"لو ما طلبت هذا، تجاهل الرسالة.",
            )
    finally:
        conn.close()

    # Always the same response whether or not the email exists — same principle
    # as login()'s constant-time check, just applied to this endpoint instead.
    print(f"[auth] forgot-password requested — ip={ip} email_known={bool(row)}")
    return jsonify({"success": True})


@app.post("/api/auth/reset-password")
def reset_password():
    ip = client_ip()
    if rate_limited(f"reset-pw:{ip}", max_requests=10, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    body = request.get_json(force=True, silent=True) or {}
    token = str(body.get("token") or "")
    new_password = str(body.get("password") or "")

    if len(new_password) < 8 or len(new_password) > 200:
        return jsonify({"success": False, "error": "كلمة المرور لازم تكون 8 أحرف على الأقل"}), 400

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT user_id, created_at FROM email_tokens WHERE token = ? AND kind = 'reset' AND used = 0", (token,)
        ).fetchone()
        if not row:
            return jsonify({"success": False, "error": "الرابط غير صالح أو مستخدم من قبل"}), 400

        created = datetime.strptime(row["created_at"], "%Y-%m-%d %H:%M:%S")
        if (datetime.now(timezone.utc).replace(tzinfo=None) - created) > timedelta(hours=1):
            return jsonify({"success": False, "error": "انتهت صلاحية الرابط، اطلب رابط جديد"}), 400

        pw_hash = generate_password_hash(new_password)
        conn.execute("UPDATE users SET password_hash = ? WHERE id = ?", (pw_hash, row["user_id"]))
        conn.execute("UPDATE email_tokens SET used = 1 WHERE token = ?", (token,))
        # Reset means the old password may be compromised — kill all existing
        # sessions so a leaked token doesn't outlive the password change.
        conn.execute("DELETE FROM sessions WHERE user_id = ?", (row["user_id"],))
        conn.commit()
    finally:
        conn.close()

    print(f"[auth] password reset — ip={ip} user_id={row['user_id']}, all sessions invalidated")
    return jsonify({"success": True})


@app.get("/api/rashq/services")
def list_services():
    ip = client_ip()
    if rate_limited(f"rashq-services:{ip}", max_requests=30, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    try:
        r = requests.get(
            PLUS_BASE,
            params={"action": "services", "api_key": PLUS_API_KEY},
            timeout=15,
        )
        data = r.json()
    except Exception:
        return jsonify({"success": False, "error": "تعذر الاتصال بالمورد"}), 502

    if not data.get("success"):
        return jsonify({"success": False, "error": "تعذر جلب الخدمات"}), 502

    out = []
    with _lock:
        for s in data.get("services", []):
            sid = s.get("service_id")
            if sid not in ALLOWED_SERVICES:
                continue
            base_price = s.get("price_per_1000_usd", 0)
            _price_cache[sid] = base_price  # keep fresh for the spend-cap estimate below
            out.append({
                "service_id": sid,
                "name": s.get("name"),
                "min": s.get("min"),
                "max": s.get("max"),
                "price_per_1000_usd": round(base_price * MARKUP, 4),
            })
    return jsonify({"success": True, "services": out})


@app.post("/api/rashq/order")
def create_order():
    ip = client_ip()
    if rate_limited(f"rashq-order:{ip}"):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    if not site_token_ok():
        return jsonify({"success": False, "error": "غير مصرح"}), 401

    body = request.get_json(force=True, silent=True) or {}
    service_id = body.get("service_id")
    quantity = body.get("quantity")
    link = body.get("link")

    if service_id not in ALLOWED_SERVICES:
        return jsonify({"success": False, "error": "خدمة غير متاحة"}), 400

    bounds = ALLOWED_SERVICES[service_id]
    # isinstance(True, int) is True in Python — explicitly reject bools here,
    # otherwise {"quantity": true} could slip through as 1 on min:1 services.
    if isinstance(quantity, bool) or not isinstance(quantity, int):
        return jsonify({"success": False, "error": "الكمية غير صالحة"}), 400
    if not (bounds["min"] <= quantity <= bounds["max"]):
        return jsonify({"success": False, "error": f"الكمية يجب أن تكون بين {bounds['min']} و {bounds['max']}"}), 400

    if not valid_link(link):
        return jsonify({"success": False, "error": "رابط غير صالح"}), 400

    # Daily spend safety valve — estimated from the last fetched price. If we've
    # never fetched prices yet, refresh the cache once so the estimate is real.
    if service_id not in _price_cache:
        try:
            r = requests.get(PLUS_BASE, params={"action": "services", "api_key": PLUS_API_KEY}, timeout=15)
            for s in r.json().get("services", []):
                if s.get("service_id") in ALLOWED_SERVICES:
                    _price_cache[s["service_id"]] = s.get("price_per_1000_usd", 0)
        except Exception:
            pass

    estimated_cost = (_price_cache.get(service_id, 0) / 1000) * quantity
    if spend_today() + estimated_cost > DAILY_CAP_USD:
        print(f"[rashq] BLOCKED by daily cap — ip={ip} service={service_id} qty={quantity} "
              f"est=${estimated_cost:.4f} spent_today=${spend_today():.4f} cap=${DAILY_CAP_USD}")
        return jsonify({"success": False, "error": "تم بلوغ الحد اليومي للطلبات، تواصل مع الدعم"}), 403

    print(f"[rashq] order attempt — ip={ip} service={service_id} qty={quantity}")

    try:
        r = requests.post(
            PLUS_BASE,
            headers={
                "Authorization": f"Bearer {PLUS_API_KEY}",
                "Content-Type": "application/json",
            },
            json={"action": "order", "service_id": service_id, "quantity": quantity, "link": link},
            timeout=20,
        )
        data = r.json()
    except Exception:
        return jsonify({"success": False, "error": "تعذر الاتصال بالمورد"}), 502

    if not data.get("success"):
        print(f"[rashq] supplier rejected order — ip={ip} service={service_id} qty={quantity}")
        return jsonify({"success": False, "error": "تعذر تنفيذ الطلب"}), 502

    real_cost = data.get("price_usd", estimated_cost)
    add_spend(real_cost)
    print(f"[rashq] order OK — ip={ip} service={service_id} qty={quantity} "
          f"order_number={data.get('order_number')} cost=${real_cost}")

    return jsonify({
        "success": True,
        "order_number": data.get("order_number"),
    })


@app.get("/api/rashq/order-status")
def order_status():
    ip = client_ip()
    if rate_limited(f"rashq-status:{ip}", max_requests=30, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    order_number = request.args.get("order_number")
    if not order_number:
        return jsonify({"success": False, "error": "order_number مطلوب"}), 400

    try:
        r = requests.get(
            PLUS_BASE,
            params={"action": "order_status", "order_number": order_number, "api_key": PLUS_API_KEY},
            timeout=15,
        )
        return jsonify(r.json())
    except Exception:
        return jsonify({"success": False, "error": "تعذر الاتصال بالمورد"}), 502


# ---------------------------------------------------------------------------
# كروت (Libya Cards) — STAGE 1: catalog only.
# We have the endpoint list but not a confirmed response schema, so this parses
# defensively (tries the common wrapper shapes) and logs the raw response the
# first time so we can see exactly what came back and tighten this precisely.
# The /pay (purchase) endpoint is deliberately not wired yet — safer to confirm
# the catalog shape first than guess at a payment request body.
# ---------------------------------------------------------------------------
CARDS_API_KEY = os.environ.get("CARDS_API_KEY")  # optional — كروت just won't work until this is set
CARDS_BASE = "https://api.libyacards.com/api"
CARDS_DAILY_CAP_USD = float(os.environ.get("CARDS_DAILY_CAP_USD", "20"))


@app.get("/api/cards/categories")
def list_card_categories():
    if not CARDS_API_KEY:
        return jsonify({"success": False, "error": "الكروت مو مربوطة بعد — أضف CARDS_API_KEY"}), 503

    ip = client_ip()
    if rate_limited(f"cards-categories:{ip}", max_requests=30, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    try:
        r = requests.get(
            f"{CARDS_BASE}/provider/digital-products",
            headers={"X-API-Key": CARDS_API_KEY, "Content-Type": "application/json"},
            timeout=15,
        )
        raw = r.json()
    except Exception as e:
        print(f"[cards] categories request failed: {e}")
        return jsonify({"success": False, "error": "تعذر الاتصال بمورد الكروت"}), 502

    # Confirmed shape: {"status": true, "data": {"categories": [...]}}
    categories = None
    if isinstance(raw, dict) and isinstance(raw.get("data"), dict):
        categories = raw["data"].get("categories")

    if not isinstance(categories, list):
        print(f"[cards] categories: unexpected shape, sample: {str(raw)[:500]}")
        return jsonify({"success": False, "error": "شكل رد غير متوقع — راجع الـlogs"}), 502

    out = []
    for c in categories:
        if not isinstance(c, dict):
            continue
        out.append({
            "id": c.get("id"),
            "name": c.get("name"),
            "description": c.get("description"),
            "image": c.get("image"),
            "rank": c.get("rank"),
        })
    out.sort(key=lambda c: (c.get("rank") if c.get("rank") is not None else 9999))
    print(f"[cards] fetched {len(out)} categories OK")
    return jsonify({"success": True, "categories": out})


# Real Libya Cards category UUIDs — kept server-side only now, on purpose.
# The frontend asks for "ببجي موبايل" by name; it never sees these IDs.
CARDS_CATEGORY_MAP = {
    "ببجي موبايل": "3889fd74-be30-43eb-8ade-487ae1daedf3",
    "فري فاير": "278505d4-debb-4173-a270-9681ebed087a",
    "ستيم": "81db6fb3-ddb9-41dd-abf8-ab3c7783d15b",
    "يلا لودو": "dba62042-3467-4368-9bc9-bf59c2e48c4a",
    "ريزر جولد": "26ce6d67-426f-4688-9232-a1f23f2be5fd",
    "بلايستيشن": "eb6bda9e-ec4f-4962-997a-c05d3e83d25c",
    "آيتونز": "faf425b1-5006-43df-8bba-82c03b8873ee",
    "إكس بوكس": "1cc049d6-8a56-4678-a3c9-d6df6b06db7a",
    "نتفليكس": "30b84760-8972-4128-b242-3dcd60557dc3",
}


@app.get("/api/cards/product/<name>")
def card_category_by_name(name):
    """Same data as /api/cards/category/<id>, just reached by our own item name
    instead of Libya Cards' real category UUID — see CARDS_CATEGORY_MAP above."""
    category_id = CARDS_CATEGORY_MAP.get(name)
    if not category_id:
        return jsonify({"success": False, "error": "غير مربوط بعد"}), 404
    return card_category_products(category_id)


@app.get("/api/cards/images")
def card_images_by_name():
    """Same purpose as /api/cards/categories, but pre-matched against our own
    item names server-side — the frontend gets {'ببجي موبايل': 'https://...'}
    directly and never sees Libya Cards' real category IDs."""
    resp = list_card_categories()
    if isinstance(resp, tuple):
        return resp  # pass through errors (e.g. 503/429) unchanged
    payload = resp.get_json()
    if not payload.get("success"):
        return resp
    by_id = {c["id"]: c.get("image") for c in payload["categories"]}
    out = {name: by_id[cid] for name, cid in CARDS_CATEGORY_MAP.items() if by_id.get(cid)}
    return jsonify({"success": True, "images": out})


@app.get("/api/cards/category/<category_id>")
def card_category_products(category_id):
    if not CARDS_API_KEY:
        return jsonify({"success": False, "error": "الكروت مو مربوطة بعد"}), 503

    ip = client_ip()
    if rate_limited(f"cards-category-detail:{ip}", max_requests=30, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    try:
        r = requests.get(
            f"{CARDS_BASE}/provider/digital-products/category/{category_id}",
            headers={"X-API-Key": CARDS_API_KEY, "Content-Type": "application/json"},
            timeout=15,
        )
        raw = r.json()
    except Exception as e:
        print(f"[cards] category-detail request failed: {e}")
        return jsonify({"success": False, "error": "تعذر الاتصال بمورد الكروت"}), 502

    # Confirmed shape: {"status": true, "data": {"category": {...}, "subCategories": [{...,"products":[...]}]}}
    data = raw.get("data") if isinstance(raw, dict) else None
    if not isinstance(data, dict) or not isinstance(data.get("subCategories"), list):
        print(f"[cards] category-detail: unexpected shape: {str(raw)[:500]}")
        return jsonify({"success": False, "error": "شكل رد غير متوقع — راجع الـlogs"}), 502

    category = data.get("category") or {}
    out_subs = []
    for sub in data["subCategories"]:
        if not isinstance(sub, dict):
            continue
        products = []
        for p in (sub.get("products") or []):
            if not isinstance(p, dict):
                continue
            try:
                base_price = float(p.get("price") or 0)
            except (TypeError, ValueError):
                base_price = 0.0
            if p.get("id"):
                _cards_price_cache[p["id"]] = base_price
            products.append({
                "id": p.get("id"),
                "name": p.get("name"),
                "price": round(base_price * MARKUP, 3),
                "available": bool(p.get("available")),
                "image": p.get("image"),
            })
        out_subs.append({
            "id": sub.get("id"),
            "name": sub.get("name"),
            "how_to_use": sub.get("how_to_use"),  # tells us if a player ID field is needed
            "image": sub.get("image"),
            "products": products,
        })

    total_products = sum(len(s["products"]) for s in out_subs)
    print(f"[cards] category {category_id}: {len(out_subs)} subcategories, {total_products} products OK")

    return jsonify({
        "success": True,
        "category": {"id": category.get("id"), "name": category.get("name"), "image": category.get("image")},
        "subCategories": out_subs,
    })


@app.post("/api/cards/pay")
def card_pay():
    """
    Not documented by Libya Cards beyond the endpoint's existence, so this is
    built the same way the exploratory endpoints were: best-guess request shape,
    heavy logging of both what we send and what comes back, so the first real
    attempt tells us exactly what to adjust. Test with the cheapest item first.
    """
    if not CARDS_API_KEY:
        return jsonify({"success": False, "error": "الكروت مو مربوطة بعد"}), 503

    ip = client_ip()
    if rate_limited(f"cards-pay:{ip}", max_requests=10, window=60):
        return jsonify({"success": False, "error": "طلبات كثيرة، حاول بعد شوي"}), 429

    if not site_token_ok():
        return jsonify({"success": False, "error": "غير مصرح"}), 401

    body = request.get_json(force=True, silent=True) or {}
    product_id = body.get("product_id")
    player_id = body.get("player_id")  # optional — only some products need this

    if not product_id or not isinstance(product_id, str) or len(product_id) > 100:
        return jsonify({"success": False, "error": "معرف المنتج مطلوب"}), 400
    if player_id is not None and (not isinstance(player_id, str) or len(player_id) > 50):
        return jsonify({"success": False, "error": "آيدي اللاعب غير صالح"}), 400

    # Spend cap using whatever price we last saw for this product via the
    # categories/products endpoints. If we've never seen it, we can't estimate —
    # refuse rather than risk an unbounded charge.
    if product_id not in _cards_price_cache:
        print(f"[cards] PAY REFUSED — unknown/uncached product_id={product_id}")
        return jsonify({"success": False, "error": "المنتج غير معروف — حدّث الصفحة وحاول مرة ثانية"}), 400

    estimated_cost = _cards_price_cache[product_id]
    if spend_today("cards") + estimated_cost > CARDS_DAILY_CAP_USD:
        print(f"[cards] PAY BLOCKED by daily cap — ip={ip} product={product_id} "
              f"est=${estimated_cost:.4f} spent_today=${spend_today('cards'):.4f} cap=${CARDS_DAILY_CAP_USD}")
        return jsonify({"success": False, "error": "تم بلوغ الحد اليومي للطلبات، تواصل مع الدعم"}), 403

    payload = {"product_id": product_id}
    if player_id:
        payload["player_id"] = player_id
    print(f"[cards] PAY ATTEMPT — ip={ip} product_id={product_id} has_player_id={bool(player_id)} payload_keys={list(payload.keys())}")

    try:
        r = requests.post(
            f"{CARDS_BASE}/provider/digital-products/pay",
            headers={"X-API-Key": CARDS_API_KEY, "Content-Type": "application/json"},
            json=payload,
            timeout=20,
        )
        raw = r.json()
    except Exception as e:
        print(f"[cards] PAY request failed: {e}")
        return jsonify({"success": False, "error": "تعذر الاتصال بمورد الكروت"}), 502

    print(f"[cards] PAY raw response (first 800 chars): {str(raw)[:800]}")

    ok = isinstance(raw, dict) and (raw.get("status") is True or raw.get("success") is True)
    if not ok:
        print(f"[cards] PAY REJECTED by supplier — ip={ip} product={product_id}")
        return jsonify({
            "success": False,
            "error": "تعذر تنفيذ الطلب — راجع Deploy Logs بحث عن [cards] PAY لتفاصيل رد المورد",
        }), 502

    add_spend(estimated_cost, bucket="cards")
    order_ref = None
    if isinstance(raw.get("data"), dict):
        order_ref = raw["data"].get("id") or raw["data"].get("order_id") or raw["data"].get("code")
    print(f"[cards] PAY SUCCESS — ip={ip} product={product_id} order_ref={order_ref} cost=${estimated_cost}")

    # The full provider response is logged above for debugging, but never sent
    # to the client — it can carry internal identifiers or pricing detail the
    # frontend has no business seeing (and would expose our markup margin).
    return jsonify({"success": True, "order_ref": order_ref})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
