# منصة الفيزياء التفاعلية ⚛️

تطبيق ويب عربي تفاعلي لتعلّم الفيزياء للصف التاسع — الفصل الدراسي الثاني، مبني على كتاب الطالب الرسمي.

## ✨ المميزات

- **واجهة عربية كاملة** من اليمين لليسار (RTL)
- **متجاوب تماماً** مع الجوال واللوحي والكمبيوتر
- **خط عربي واضح** (Tajawal + Cairo)
- **ألوان علمية مهدئة** (أزرق فيزيائي عميق + بنفسجي/كحلي)
- **حفظ دائم للتقدم** في متصفح الطالب (LocalStorage)
- **محتوى منظم**: الوحدة ← الدرس ← الشرح ← التطبيق ← التقييم

### المحتوى التعليمي
- **الوحدة 4**: ميكانيكا الموائع (درسان)
- **الوحدة 5**: انكسار الضوء وتطبيقاته (ثلاثة دروس)

كل درس يتضمن: الأهداف، المفاهيم والثوابت، القوانين الرياضية، أمثلة محلولة خطوة بخطوة، تجربة مخبرية تخيلية، أخطاء مفاهيمية شائعة، تطبيقات عملية، وأسئلة كويز تفاعلية.

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State**: Zustand (مع persist middleware لحفظ التقدم في LocalStorage)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Tajawal + Cairo (Google Fonts)

---

## 🚀 النشر على Vercel (الدليل الكامل)

Vercel هي أفضل خيار لنشر هذا التطبيق لأنها مملوكة لنفس فريق Next.js وتدعمه بشكل مثالي.

### المتطلبات
- حساب على [GitHub](https://github.com) (مجاني)
- حساب على [Vercel](https://vercel.com) (مجاني - يمكن التسجيل بحساب GitHub)

---

### الخطوة 1: رفع المشروع إلى GitHub

1. أنشئ مستودعاً جديداً على GitHub:
   - اذهب إلى [github.com/new](https://github.com/new)
   - اسم المستودع: `physics-interactive-platform`
   - اختر **Private** (خاص) أو **Public** (عام)
   - **لا** تختر "Add a README" (لدينا واحد بالفعل)
   - اضغط **Create repository**

2. في جهازك، افتح Terminal (أو Git Bash) في مجلد المشروع ونفّذ:
   ```bash
   # تهيئة Git (إذا لم يكن مهيأ)
   git init
   git add .
   git commit -m "النسخة الأولى من منصة الفيزياء التفاعلية"

   # اربط المستودع (استبدل USERNAME باسم مستخدم GitHub)
   git branch -M main
   git remote add origin https://github.com/USERNAME/physics-interactive-platform.git
   git push -u origin main
   ```

---

### الخطوة 2: النشر على Vercel

1. اذهب إلى [vercel.com/new](https://vercel.com/new)
2. سجّل الدخول بحساب GitHub
3. اضغط **Import Project** واختر مستودع `physics-interactive-platform`

4. في صفحة الإعدادات:
   - **Framework Preset**: Next.js (سيُكتشف تلقائياً)
   - **Build Command**: `bun run build` (أو اتركه افتراضياً)
   - **Output Directory**: `.next` (افتراضي)
   - **Install Command**: `bun install` (أو `npm install`)

5. في قسم **Environment Variables**، أضف:
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | `postgresql://dummy` |

   > **ملاحظة**: التطبيق لا يعتمد فعلياً على قاعدة بيانات في وظيفته (التقدم يُحفظ في متصفح الطالب)، لكن Prisma يحتاج قيمة أثناء البناء. القيمة `postgresql://dummy` كافية.

6. اضغط **Deploy** ✅

7. انتظر 2-3 دقائق حتى يكتمل البناء. ستحصل على رابط مثل:
   ```
   https://physics-interactive-platform.vercel.app
   ```

---

### الخطوة 3 (اختيارية): ربط نطاق مخصص

1. في لوحة تحكم Vercel → مشروعك → **Settings** → **Domains**
2. أضف نطاقك (مثل `physics.myschool.com`)
3. اتبع التعليمات لتحديث سجلات DNS عند مقدم النطاق

---

### الخطوة 4 (اختيارية): التضمين في Google Sites

بعد الحصول على رابط Vercel، يمكنك تضمين التطبيق داخل Google Sites:

1. افتح [sites.google.com](https://sites.google.com) وأنشئ موقعاً
2. من القائمة الجانبية: **Insert** (إدراج) → **Embed** (تضمين)
3. الصق رابط Vercel: `https://physics-interactive-platform.vercel.app`
4. اضبط الأبعاد (العرض 100%، الارتفاع 800px أو أكثر)
5. اضغط **Insert**

سيظهر التطبيق التفاعلي الكامل داخل صفحة Google Sites. ✨

---

## 💻 التشغيل محلياً (للتطوير)

```bash
# تثبيت الحزم
bun install

# تشغيل خادم التطوير
bun run dev

# فتح المتصفح
# http://localhost:3000
```

### أوامر أخرى
```bash
bun run lint    # فحص جودة الكود
bun run build   # بناء نسخة الإنتاج
bun run start   # تشغيل نسخة الإنتاج
```

---

## 📁 بنية المشروع

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          # التخطيط الرئيسي (RTL، خطوط عربية)
│   │   ├── page.tsx            # الصفحة الوحيدة المرئية
│   │   ├── globals.css         # الأنماط العامة
│   │   └── api/
│   ├── components/
│   │   ├── physics/
│   │   │   ├── welcome-view.tsx    # صفحة الترحيب
│   │   │   ├── dashboard-view.tsx  # لوحة التحكم + الوحدات
│   │   │   ├── lesson-view.tsx     # صفحة الدرس
│   │   │   └── formula-display.tsx # عرض القوانين الرياضية
│   │   └── ui/                 # مكونات shadcn/ui
│   ├── lib/
│   │   ├── curriculum.ts       # المحتوى التعليمي الكامل
│   │   ├── store.ts            # حالة Zustand (حفظ التقدم)
│   │   ├── db.ts               # عميل Prisma
│   │   └── utils.ts            # دوال مساعدة
│   └── hooks/
├── prisma/
│   └── schema.prisma           # مخطط قاعدة البيانات
├── public/                     # الملفات الثابتة (شعار، أيقونات)
├── vercel.json                 # إعدادات النشر على Vercel
├── next.config.ts              # إعدادات Next.js
└── package.json
```

---

## 📝 ملاحظات تقنية

- **حفظ التقدم**: يتم عبر Zustand persist middleware في LocalStorage بمفتاح `physics-platform-storage`. لا يحتاج خادماً أو قاعدة بيانات.
- **Prisma**: مُضمّن افتراضياً لكنه غير مستخدم فعلياً في وظائف التطبيق. مطلوب فقط أثناء البناء (`prisma generate`).
- **خط Vercel**: لا يحتاج إعدادات إضافية - Next.js 16 يدعمها تلقائياً.
- **الأمان**: بيانات الطالب (الاسم + التقدم) تُحفظ محلياً في متصفحه فقط، ولا تُرسل لأي خادم.

---

## 👨‍🏫 إعداد المعلم

**إعداد المعلم: فايز مروج**

---

## 📜 الترخيص

هذا المشروع تعليمي ويمكن استخدامه وتعديله بحرية للأغراض التعليمية.

المحتوى العلمي مستخرج من كتاب الطالب الرسمي للصف التاسع — الفصل الدراسي الثاني (المركز الوطني لتطوير المناهج).
