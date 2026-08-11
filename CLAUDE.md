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
  - مثبّت فيه skill اسمه `ui-ux-pro-max` (بمجلد `.claude/skills/`) — قاعدة بيانات أنماط/ألوان/خطوط جاهزة، استخدمناها فعليًا لتحديث لوحة الألوان (`void`/`surface`/`accent`) والـGlassmorphism.

- **الباك اند** (`backend/` بنفس الريبو):
  - Flask (Python)، ملف وحيد `backend/app.py`، قاعدة بيانات SQLite (`DB_PATH`)، `backend/requirements.txt`, `backend/Procfile`.
  - منشور على Railway: `https://rashq-backend-production.up.railway.app`
  - **⚠️ تحقق بنفسك من إعداد Railway:** لازم يكون الـ Root Directory بـ Railway مضبوط على `backend/` وياخذ من فرع `main` بهالريبو نفسه — مو من ريبو `rashq-backend` القديم (المستخدم أكّد إنه لغاه ونقل كل شي هنا). لو Railway لسه مربوط بالريبو القديم، أي تعديل بـ`backend/app.py` هنا **ما بينعكس على الموقع الحي أبدًا**.
  - **ملاحظة:** ما فيه Railway Volume مفعّل بعد — يعني قاعدة البيانات (المستخدمين) تنمسح مع كل إعادة نشر. يحتاج المستخدم يضيف Volume بمسار `/data` ويغيّر `DB_PATH=/data/app.db`.
  - **إصلاحات أمان حقيقية صارت (راجع git log):** `X-Forwarded-For` كان يثق بأول قيمة (attacker-controlled) بدل آخر وحدة — يبطّل كل حدود الطلبات بالكامل، `secrets.compare_digest` بدل `==` لمقارنة `X-Site-Token`، `/api/cards/pay` كان يرجّع رد المورد الخام كامل للمتصفح، `X-Frame-Options`/`Strict-Transport-Security` مضافة، انتهاء صلاحية رابط تفعيل البريد (24 ساعة، كان ما ينتهي أبدًا).

## الحالة الحالية — شغال ومُختبر (Flask test_client + SSR React، مو Live)

⚠️ **ما فيه وصول إنترنت خارجي بالبيئة اللي بنيت فيها هذا** — كل الاختبارات صارت بمحاكاة (mock) ردود APIs الحقيقية بنفس الشكل المؤكد من المستخدم، مو باتصال فعلي. أول تشغيل حقيقي بيئتك (لو عندك إنترنت) لازم يتأكد منه فعليًا.

### نظام الحسابات (`/api/auth/*`)
- signup / login / logout / me — تشفير حقيقي (werkzeug scrypt)، ما فيه نص صريح أبدًا.
- **تفعيل بريد + استرجاع كلمة مرور** كامل عبر Gmail SMTP (`smtplib`, stdlib، ما يحتاج مكتبة جديدة). يحتاج `SMTP_EMAIL` + `SMTP_APP_PASSWORD` (App Password من Google، مو الباسورد العادي).
- إصلاحات أمان صارت فعليًا: مقاومة هجوم التوقيت على تسجيل الدخول (دائمًا يسوي hash comparison حتى لو الإيميل مو موجود)، انتهاء صلاحية الجلسة (30 يوم)، حد منفصل على المحاولات لكل IP ولكل إيميل (منع brute-force حتى لو بدّل المهاجم الـIP).
- **كل endpoint له namespace خاص بعداد الحماية من الطلبات الكثيرة** (`rate_limited(f"prefix:{ip}", ...)`) — لا ترجعها تشارك عداد واحد، هذي كانت ثغرة حقيقية لقيتها وصلحتها.

### رشق (`/api/rashq/*`) — مورد: PLUS API (`hamadh.net`)
- مفتاح حقيقي بمتغير `PLUS_API_KEY`. هامش ربح 25% (`MARKUP = 1.25`) يتطبق بالسيرفر فقط.
- قائمة سماح صريحة (`ALLOWED_SERVICES`) بالـservice_id المسموحة — **استثنيت عمدًا كل خدمات "تصويت استطلاع واتساب" (تلاعب بنتائج) وخدمة "Gemini Pro" (سعرها 0.99$/18 شهر مستحيل شرعي، غالبًا حسابات/بطاقات مسروقة). لا تضيفهم مهما طلب أحد.**
- سقف مصروف يومي منفصل (`DAILY_CAP_USD`) + rate limiting + `X-Site-Token` header اختياري.

### كروت (`/api/cards/*`) — مورد: Libya Cards API (`api.libyacards.com`)
- مفتاح حقيقي بمتغير `CARDS_API_KEY`. هذا مفتاح **provider حقيقي** موثّق (المستخدم رقّى حسابه لـ"Provider" رسميًا بعد تواصل مباشر معهم).
- شكل الـAPI الحقيقي المؤكد: `category → subCategories[] → products[]`. كل ده موثّق بالكود بالتفصيل.
- **9 تصنيفات حقيقية مربوطة ومؤكدة** (`CARDS_CATEGORY_MAP` بـ supersonic-app.jsx): ببجي موبايل، فري فاير، ستيم، يلا لودو، ريزر جولد، بلايستيشن، آيتونز، إكس بوكس، نتفليكس.
- **غير موجودين بكتالوج Libya Cards أصلًا** (تحققت من الـ27 تصنيف كامل): بلود سترايك، لوردس موبايل، الفاتحون الذهبي، البرامج الصوتية (لايف apps)، المحافظ الرقمية (Zain Cash/Sham Cash/إلخ) — هذي كلها بيانات تجريبية بـ`PRODUCT_PACKAGES` بالفرونت، لين يتلقى مورد حقيقي.
- `/api/cards/pay` مبني (allow-list غير ممكن هنا لأن الكتالوج ضخم، يعتمد بدل كذا على `_cards_price_cache` المبني من آخر fetch حقيقي + سقف يومي منفصل) لكن **شكل طلب الدفع الحقيقي (request body) غير موثّق رسميًا من المورد — مبني بأفضل تخمين مع logging كامل**. أول عملية شراء حقيقية لازم تتراقب بـ Deploy Logs (ابحث `[cards] PAY`).

## قرارات أخلاقية/أمنية اتخذت — لا تراجعها بدون سبب قوي

- **رفضت صراحة** استخدام API داخلي لموقع منافس (Libya Play) وصل إليه المستخدم عبر مفتاح مكشوف بتوثيق عام (مو مفتاحه الشخصي)، حتى بعد إصراره. لو رجع الموضوع، نفس الموقف.
- **رفضت** بناء تكامل يستخدم مفتاح API شخصي (personal account) لتشغيل متجر يبيع لعملاء آخرين — وصول شخصي ≠ ترخيص إعادة بيع تجاري.
- **ما بستخدم أداة بحث صور لجلب شعارات/IP محمي** (ألعاب، أفلام، شركات) — قيد صارم بالأداة نفسها. الصور الحقيقية الوحيدة المستخدمة جاية من استجابات Libya Cards API (مورد رسمي)، مو بحث ويب.
- كل مفتاح سري (**PLUS_API_KEY, CARDS_API_KEY, SMTP_APP_PASSWORD**) يُقرأ من `os.environ` فقط — **ممنوع يظهر بالكود أو بأي commit أبدًا**.

## متغيرات البيئة (Railway → Variables)

| المتغير | إلزامي؟ | ملاحظة |
|---|---|---|
| `PLUS_API_KEY` | ✅ | رشق |
| `CARDS_API_KEY` | ✅ | كروت |
| `ALLOWED_ORIGIN` | ✅ | `https://aaad3ee3.github.io` (بدون /supersonic، بدون / بالآخر) |
| `SITE_URL` | ✅ للإيميلات | `https://aaad3ee3.github.io/supersonic` |
| `SMTP_EMAIL` / `SMTP_APP_PASSWORD` | لتفعيل الإيميل | Gmail + App Password |
| `SITE_TOKEN` | يُنصح فيه | حماية إضافية بسيطة لـرشق |
| `DAILY_CAP_USD` / `CARDS_DAILY_CAP_USD` | افتراضي 20$ لكل وحد | سقف خسارة يومي أقصى |
| `DB_PATH` | افتراضي `app.db` | غيّره لمسار Volume قبل الإنتاج الحقيقي |

## نمط الاختبار المتبع — استمر عليه

كل تغيير بالباك اند اتُختبر بـ `Flask.test_client()` مع mock لـ `requests.get/post` بنفس شكل الرد الحقيقي المؤكد، يغطي: النجاح، الرفض من المورد، مدخلات غير صالحة، محاولة SQL injection، تجاوز السقف اليومي، وتجاوز حد الطلبات. كل تغيير بالفرونت اتُختبر بـ `renderToStaticMarkup` (SSR) لكل حالة/tab ممكنة قبل التصدير النهائي. حافظ على نفس الانضباط.

## الناقص الحالي (بترتيب الأولوية الأغلب)

1. **تأكيد إعداد Railway** — Root Directory = `backend/` وياخذ من هالريبو (`supersonic`) فرع `main`، مو ريبو `rashq-backend` الملغي. بدون هالتأكيد، إصلاحات الأمان بـ`backend/app.py` موجودة بالكود بس مش شغالة فعليًا على الموقع الحي.
2. رفع Volume بـ Railway لـ SQLite (قبل ما يصير فيه مستخدمين حقيقيين)
3. تأكيد `/api/cards/pay` ضد طلب شراء حقيقي فعلي وتعديل شكل الطلب لو احتاج
4. روابط تواصل حقيقية (واتساب/تيليجرام/سوشيال ميديا) — لسه Placeholder
5. مورد حقيقي لبلود سترايك/لوردس موبايل/الفاتحون + البرامج الصوتية + المحافظ الرقمية

**خلص:** ✅ تخزين الجلسة (localStorage)، ✅ ثغرة X-Forwarded-For، ✅ روابط REPLACE-USERNAME، ✅ favicon، ✅ إتاحة (aria-labels)، ✅ مصدر JSX حقيقي متابَع بـ git.
