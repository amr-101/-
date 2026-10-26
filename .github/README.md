# لوحة الحضور والانصراف — نسخة سطح المكتب

برنامج Electron يعمل بدون إنترنت بعد التثبيت (Windows / macOS / Linux).

## الطريقة 1: بناء الملفات على جهازك
1. ثبّت Node.js (الإصدار 20 أو أحدث) من https://nodejs.org
2. افتح الـ Terminal داخل هذا المجلد ونفّذ:
   - `npm install`
   - `npm start`  ← لتشغيل البرنامج للتجربة
   - `npm run dist`  ← لإنشاء ملف التثبيت داخل مجلد `dist/`
3. الناتج حسب نظام جهازك:
   - Windows: ملف `.exe` للتثبيت + نسخة portable
   - macOS: ملف `.dmg`  (لازم تبني على Mac)
   - Linux: `.AppImage` و`.deb`

> البناء لنظام معيّن يتم على نفس النظام. الأوامر `dist:win` و`dist:mac` و`dist:linux` تبني لنظام محدد.

## الطريقة 2: بناء الثلاثة أنظمة تلقائيًا (بدون تثبيت أي شيء)
1. ارفع هذا المجلد على مستودع GitHub خاص بك.
2. من تبويب Actions شغّل workflow باسم **Build desktop installers**.
3. بعد انتهائه نزّل ملفات التثبيت من قسم Artifacts.

## ملاحظات
- ملف Mac غير موقّع: أول فتح يكون بزر يمين ← Open.
- ويندوز قد يعرض تحذير SmartScreen لنفس السبب (More info ← Run anyway).
- ملفات الواجهة في `src/index.html`، وأي تعديل عليها يظهر بعد `npm start`.
