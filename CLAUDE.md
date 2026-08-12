# Supersonic — ملخص المشروع لـ Claude Code

أنت تكمل تطوير متجر رقمي (ألعاب، بطاقات هدايا، شحن رصيد، خدمات رشق/SMM) اسمه **Supersonic**، مبني بالكامل بمحادثة سابقة مع Claude.ai. هذا الملف يلخّص كل قرار وحالة تقنية عشان ما تعيد اكتشافها أو تكسرها بالغلط.

## البنية — صار ريبو واحد (`rashq-backend` القديم اتلغى)

**`supersonic`** (GitHub, **Public** — لازم يضل Public عشان GitHub Pages يشتغل مجانًا) فيه الموقع والباك اند مع بعض:

- **الموقع** (`docs/` — هذا مجلد GitHub Pages الفعلي، مو الجذر):
  - `docs/index.html`, `docs/app.js`, `docs/robots.txt`, `docs/sitemap.xml`, `docs/favicon.png`, `docs/apple-touch-icon.png`
  - منشور على: `https://aaad3ee3.github.io/supersonic/`
  - **مافيه أي build tool أو npm بجهة النشر.** `docs/app.js` هو ناتج تجميع (compile) لملف React JSX (`supersonic-app.jsx` **بجذر الريبو**، مو داخل `docs/`) عبر esbuild، مصدّر كـ ES module خارجي (external: react, react-dom, lucide-react) ومحمّل بالمتصفح عبر **import map** بـ`docs/index.html` يشاور على esm.sh. Tailwind محمّل من CDN (`cdn.tailwindcss.com`) + تخصيص ألوان عبر `tailwind.config` inline بنفس الملف (شيفت مو npm package). GlassMorphism مطبّق على شاشة الدخول/التسجيل بالتحديد.
  - **أي تعديل على منطق الموقع، لازم يصير على `supersonic-app.jsx` (المصدر الحقيقي الوحيد)، وبعدين يتصدّر `docs/app.js` من جديد بنفس أمر esbuild**: `esbuild supersonic-app.jsx --bundle --format=esm --jsx=transform --external:react --external:react-dom --external:lucide-react --outfile=docs/app.js`. لا تلمس `docs/app.js` يدويًا. (ملاحظة: النسخة الأصلية اللي بناها Claude.ai ما كانت مسوّية commit لملف `supersonic-app.jsx` أصلًا رغم إنها توثّق هالقاعدة — رجّعناه آليًا من `docs/app.js` بمقارنة حرفية لكل نص/رقم بالملف، صفر فقدان بيانات، وصار الحين مصدر حقيقي متابَع بـ git.)
  - **الجلسة تضل بعد تحديث الصفحة الحين** (`localStorage`، مفتاح `supersonic_session`) — القيد القديم كان خاص ببيئة Claude.ai artifacts بس، اتلغى.
  - مثبّت فيه skill اسمه `ui-ux-pro-max` (بمجلد `.claude/skills/`) — قاعدة بيانات أنماط/ألوان/خطوط جاهزة. استخدمناها فعليًا مرتين: أول مرة لتحديث لوحة الألوان الأولى، وبعدها لإعادة تصميم كاملة (راجع "التصميم البصري" تحت) موثّقة بـ `design-system/supersonic/MASTER.md`.
  - **⚠️ درس تعلمناه بالطريقة الصعبة: لا تكتب نص عربي/يونيكود كـ `\uXXXX` escape notation مباشرة داخل JSX attribute أو JSX text (بين `<tag>...</tag>`)** — على عكس نص JS عادي جوّا `{}`, الـJSX ما يفك هالـescapes، فتطلع للمستخدم كنص مشوّه حرفي `مح...` بدل العربي. هذي كانت ثغرة حقيقية أثّرت على مربع البحث وشاشة التسجيل بالموقع الحي واتصلحت (راجع commit "fix garbled Arabic text"). اكتب الحروف العربية الحقيقية مباشرة دايمًا بهالمواضع.
  - **21st MCP مسجّل** (بـ`claude mcp add`, مفتاح API محفوظ بـ`.claude.json` المحلي) لكن ما يشتغل إلا بجلسة/محادثة جديدة (الجلسات الحالية ما تعيد الاتصال بسيرفرات MCP تنضاف أثناء الشغل). فايدته العملية محدودة أصلًا لأن الموقع ملف JSX واحد بدون shadcn/component library.

- **الباك اند** (`backend/` بنفس الريبو):
  - Flask (Python)، ملف وحيد `backend/app.py`، قاعدة بيانات SQLite (`DB_PATH`)، `backend/requirements.txt`, `backend/Procfile`.
  - منشور على Railway: `https://rashq-backend-production.up.railway.app`
  - **✅ Railway مؤكد شغال من هالريبو** — راقبنا Deploy Logs مباشرة بعد عدة pushes ورجع نفس التغييرات (مو ريبو `rashq-backend` القديم). كل push على `main` ينعكس live خلال دقيقة تقريبًا.
  - **ملاحظة:** ما فيه Railway Volume مفعّل بعد — يعني قاعدة البيانات (المستخدمين) تنمسح مع كل إعادة نشر. يحتاج المستخدم يضيف Volume بمسار `/data` ويغيّر `DB_PATH=/data/app.db`.
  - **⚠️ SMTP مو مضبوط حاليًا على Railway** (تأكدنا من Deploy Logs: `[email] SMTP not configured`) — يعني تفعيل البريد واسترجاع كلمة المرور **مبني بالكود بس مو شغال فعليًا حاليًا** لحد ما تُضاف `SMTP_EMAIL`/`SMTP_APP_PASSWORD` بمتغيرات Railway.
  - **إصلاحات أمان حقيقية صارت (راجع git log):** `X-Forwarded-For` كان يثق بأول قيمة (attacker-controlled) بدل آخر وحدة — يبطّل كل حدود الطلبات بالكامل، `secrets.compare_digest` بدل `==` لمقارنة `X-Site-Token`، `/api/cards/pay` كان يرجّع رد المورد الخام كامل للمتصفح، `X-Frame-Options`/`Strict-Transport-Security` مضافة، انتهاء صلاحية رابط تفعيل البريد (24 ساعة، كان ما ينتهي أبدًا).

## الحالة الحالية — شغال ومُختبر (Flask test_client + SSR React، مو Live)

⚠️ **ما فيه وصول إنترنت خارجي بالبيئة اللي بنيت فيها هذا** — كل الاختبارات صارت بمحاكاة (mock) ردود APIs الحقيقية بنفس الشكل المؤكد من المستخدم، مو باتصال فعلي. أول تشغيل حقيقي بيئتك (لو عندك إنترنت) لازم يتأكد منه فعليًا.

### نظام الحسابات (`/api/auth/*`)
- signup / login / logout / me — تشفير حقيقي (werkzeug scrypt)، ما فيه نص صريح أبدًا.
- **تفعيل بريد + استرجاع كلمة مرور** كامل عبر Gmail SMTP (`smtplib`, stdlib، ما يحتاج مكتبة جديدة). يحتاج `SMTP_EMAIL` + `SMTP_APP_PASSWORD` (App Password من Google، مو الباسورد العادي).
- إصلاحات أمان صارت فعليًا: مقاومة هجوم التوقيت على تسجيل الدخول (دائمًا يسوي hash comparison حتى لو الإيميل مو موجود)، انتهاء صلاحية الجلسة (30 يوم)، حد منفصل على المحاولات لكل IP ولكل إيميل (منع brute-force حتى لو بدّل المهاجم الـIP).
- **كل endpoint له namespace خاص بعداد الحماية من الطلبات الكثيرة** (`rate_limited(f"prefix:{ip}", ...)`) — لا ترجعها تشارك عداد واحد، هذي كانت ثغرة حقيقية لقيتها وصلحتها.

### رشق (`/api/rashq/*`) — مورد: PLUS API (`hamadh.net`)
- مفتاح حقيقي بمتغير `PLUS_API_KEY`. التسعير بالدينار: `price_lyd = base_usd × RASHQ_USD_TO_LYD(12.5) × RASHQ_MARKUP(1.20)`.
- **الكتالوج الكامل الحقيقي مستورد** — 240 خدمة حقيقية (مو بيانات تجريبية) موزّعة على 8 منصات (انستقرام، تيك توك، فيسبوك، تيليجرام، يوتيوب، واتساب، تويتر، "عام"). نفس الـservice_id بالضبط بين `ALLOWED_SERVICES` بـ`backend/app.py` و`RASHQ_PLATFORMS` بـ`supersonic-app.jsx` — لو ضفت/غيّرت خدمة لازم تحدّث الاثنين مع بعض.
- **استثنيت عمدًا** كل خدمات "تصويت استطلاع واتساب" (تلاعب بنتائج) وخدمة "Gemini Pro" (سعرها 0.99$/18 شهر مستحيل شرعي). لا تضيفهم مهما طلب أحد.
- سقف مصروف يومي منفصل (`DAILY_CAP_USD`) + rate limiting + `X-Site-Token` header اختياري.

### كروت (`/api/cards/*`) — مورد: Libya Cards API (`api.libyacards.com`)
- مفتاح حقيقي بمتغير `CARDS_API_KEY`، **مؤكد شغال live** (Deploy Logs: `[cards] fetched 26 categories OK`). التسعير: `price = base_lyd × CARDS_MARKUP(1.20)`.
- شكل الـAPI الحقيقي المؤكد: `category → subCategories[] → products[]`. كل ده موثّق بالكود بالتفصيل.
- **9 تصنيفات حقيقية مربوطة ومؤكدة** (`CARDS_CATEGORY_MAP` بـ supersonic-app.jsx): ببجي موبايل، فري فاير، ستيم، يلا لودو، ريزر جولد، بلايستيشن، آيتونز، إكس بوكس، نتفليكس.
- **غير موجودين بكتالوج Libya Cards أصلًا** (تحققت من الـ27 تصنيف كامل): بلود سترايك، لوردس موبايل، الفاتحون الذهبي، البرامج الصوتية (لايف apps)، المحافظ الرقمية (Zain Cash/Sham Cash/إلخ) — هذي كلها بيانات تجريبية بـ`PRODUCT_PACKAGES` بالفرونت، لين يتلقى مورد حقيقي.
- `/api/cards/pay` مبني (allow-list غير ممكن هنا لأن الكتالوج ضخم، يعتمد بدل كذا على `_cards_price_cache` المبني من آخر fetch حقيقي + سقف يومي منفصل) لكن **شكل طلب الدفع الحقيقي (request body) غير موثّق رسميًا من المورد — مبني بأفضل تخمين مع logging كامل**. أول عملية شراء حقيقية لازم تتراقب بـ Deploy Logs (ابحث `[cards] PAY`) — **لسه ما تأكدت ضد شراء حقيقي فعلي**.

### شحن رصيد ليبيانا (`/api/topup/libyana/*`) — ✅ مؤكد شغال end-to-end بتحويل حقيقي
- المستخدم يكتب رقمه **والمبلغ** اللي بينوي يحوّله، السيرفر يحفظ طلب معلّق بالمبلغ بالضبط. تطبيق SMS Gateway (على جوال رقم التحصيل) يفوّر رسالة التحويل الحقيقية لويبهوكنا، نطابقها على (نفس الرقم + نفس المبلغ بالضبط) ونزيد `users.balance_lyd`.
- **مطابقة الرقم:** `normalize_phone()` يشيل صفر واحد بالأول لو الرقم 10 خانات — لازم لأن المستخدم يكتب رقمه بصفر (`0928111895`) لكن رسالة ليبيانا نفسها تذكره بدونه (`928111895`).
- **شكل payload الحقيقي من SMS Gate** (event=`sms:received`): نص الرسالة والمرسل **جوّا `data.payload.message` / `data.payload.sender`**، مو بمستوى الجذر — غلطة وقعنا فيها أول مرة وصلحناها.
- **⚠️ `LIBYANA_WEBHOOK_SECRET` لازم يكون متغيّر بيئة ثابت بـRailway، مو يترك يتولّد تلقائيًا.** لو تركته فاضي، الكود يولّد سر عشوائي جديد كل إعادة تشغيل (كل push!)، فيصير الويبهوك المسجّل عند SMS Gate يحمل سر قديم ما يطابق — يرفضه السيرفر 401 بصمت وما ينضاف رصيد، بدون أي سطر بالـLogs حتى (السبب الحقيقي وراء أول محاولة تحويل فشلت). القيمة الحالية المسجّلة فعليًا عند SMS Gate: راجع Railway Variables.
- تسجيل الويبهوك عند SMS Gate صار مرة وحدة عبر `GET /api/admin/libyana/register-webhook` (يحتاج `SMSGATE_CLOUD_USERNAME`/`SMSGATE_CLOUD_PASSWORD`) — ما يحتاج تكراره إلا لو تغيّر `LIBYANA_WEBHOOK_SECRET`.
- تشخيص أي مشكلة مستقبلية: Deploy Logs → دور عن `[libyana]` — كل استدعاء يوصل يُسجّل بصرف النظر عن النتيجة.

## قرارات أخلاقية/أمنية اتخذت — لا تراجعها بدون سبب قوي

- **رفضت صراحة** استخدام API داخلي لموقع منافس (Libya Play) وصل إليه المستخدم عبر مفتاح مكشوف بتوثيق عام (مو مفتاحه الشخصي)، حتى بعد إصراره. لو رجع الموضوع، نفس الموقف.
- **رفضت** بناء تكامل يستخدم مفتاح API شخصي (personal account) لتشغيل متجر يبيع لعملاء آخرين — وصول شخصي ≠ ترخيص إعادة بيع تجاري.
- **ما بستخدم أداة بحث صور لجلب شعارات/IP محمي** (ألعاب، أفلام، شركات) — قيد صارم بالأداة نفسها. الصور الحقيقية الوحيدة المستخدمة جاية من استجابات Libya Cards API (مورد رسمي)، مو بحث ويب.
- كل مفتاح سري (**PLUS_API_KEY, CARDS_API_KEY, SMTP_APP_PASSWORD, LIBYANA_WEBHOOK_SECRET, SMSGATE_CLOUD_PASSWORD**) يُقرأ من `os.environ` فقط — **ممنوع يظهر بالكود أو بأي commit أبدًا**.

## التصميم البصري
إعادة تصميم كاملة صارت باستخدام `ui-ux-pro-max` (توثيق القرارات بـ `design-system/supersonic/MASTER.md`): خلفية بطبقات أعمق (`void`/`surface`/`elevated`)، لون ذهبي (`gold`) مخصص لمبالغ الفلوس بس (الرصيد، الإجمالي، الشحن) — مو كل شي بنفسجي، خط Tajawal (عربي) + Inter (لاتيني/أرقام) بدل الخط الافتراضي، Glassmorphism موسّع للهيدر والقائمة السفلية والنوافذ المنبثقة كلها (كان بس بشاشة الدخول). التوكنز بـ`tailwind.config` داخل `docs/index.html`.

## متغيرات البيئة (Railway → Variables)

| المتغير | إلزامي؟ | ملاحظة |
|---|---|---|
| `PLUS_API_KEY` | ✅ | رشق |
| `CARDS_API_KEY` | ✅ | كروت |
| `ALLOWED_ORIGIN` | ✅ | `https://aaad3ee3.github.io` (بدون /supersonic، بدون / بالآخر) |
| `SITE_URL` | ✅ للإيميلات | `https://aaad3ee3.github.io/supersonic` |
| `SMTP_EMAIL` / `SMTP_APP_PASSWORD` | ⚠️ ناقص حاليًا | Gmail + App Password — بدونه ما يُرسل أي إيميل تفعيل/استرجاع فعليًا |
| `LIBYANA_WEBHOOK_SECRET` | ✅ **لازم يكون ثابت** | لو تُرك فاضي، السر يتغيّر كل إعادة تشغيل ويكسر الويبهوك المسجّل عند SMS Gate بصمت |
| `LIBYANA_COLLECTION_NUMBER` | ✅ | رقم ليبيانا اللي يستقبل التحويلات |
| `SMSGATE_CLOUD_USERNAME` / `SMSGATE_CLOUD_PASSWORD` | لتسجيل الويبهوك بس | من إعدادات تطبيق sms-gate.app، تُستخدم مرة وحدة عبر `/api/admin/libyana/register-webhook` |
| `SITE_TOKEN` | يُنصح فيه | حماية إضافية بسيطة لـرشق |
| `DAILY_CAP_USD` / `CARDS_DAILY_CAP_USD` | افتراضي 20$ لكل وحد | سقف خسارة يومي أقصى |
| `DB_PATH` | افتراضي `app.db` | غيّره لمسار Volume قبل الإنتاج الحقيقي |

## نمط الاختبار المتبع — استمر عليه

كل تغيير بالباك اند اتُختبر بـ `Flask.test_client()` مع mock لـ `requests.get/post` بنفس شكل الرد الحقيقي المؤكد، يغطي: النجاح، الرفض من المورد، مدخلات غير صالحة، محاولة SQL injection، تجاوز السقف اليومي، وتجاوز حد الطلبات. كل تغيير بالفرونت اتُختبر بـ `renderToStaticMarkup` (SSR) لكل حالة/tab ممكنة قبل التصدير النهائي. حافظ على نفس الانضباط.

## الناقص الحالي (بترتيب الأولوية الأغلب)

1. **إضافة `SMTP_EMAIL`/`SMTP_APP_PASSWORD` بـRailway** — بدونها، تفعيل البريد واسترجاع كلمة المرور ما يُرسل فعليًا لأي مستخدم حقيقي (مبني بالكود، بس معطّل حاليًا).
2. رفع Volume بـ Railway لـ SQLite (قبل ما يصير فيه مستخدمين كثار — حاليًا قاعدة البيانات تنمسح مع كل إعادة نشر).
3. تأكيد `/api/cards/pay` ضد طلب شراء حقيقي فعلي وتعديل شكل الطلب لو احتاج (المستخدم أجّل هذا عمدًا، ركّزنا على ليبيانا).
4. روابط تواصل حقيقية (واتساب/تيليجرام/سوشيال ميديا) — لسه Placeholder.
5. مورد حقيقي لبلود سترايك/لوردس موبايل/الفاتحون + البرامج الصوتية + المحافظ الرقمية.
6. تجربة أداة 21st.dev (مسجّلة بمفتاح API صالح، تحتاج محادثة جديدة تشتغل فيها).

**خلص:** ✅ تأكيد Railway شغال من هالريبو، ✅ شحن رصيد ليبيانا end-to-end بتحويل حقيقي مؤكد، ✅ الكتالوج الكامل لرشق (240 خدمة)، ✅ تسعير LYD لرشق وكروت، ✅ إعادة تصميم بصري كاملة (ui-ux-pro-max)، ✅ إصلاح نص عربي مشوّه بمواضع JSX متعددة، ✅ تخزين الجلسة (localStorage)، ✅ ثغرة X-Forwarded-For، ✅ روابط REPLACE-USERNAME، ✅ favicon، ✅ إتاحة (aria-labels)، ✅ مصدر JSX حقيقي متابَع بـ git.
