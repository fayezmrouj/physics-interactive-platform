"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Atom, Waves, Lightbulb, Sparkles, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProgressStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export function WelcomeView() {
  const { studentName, setStudentName, startJourney } = useProgressStore();
  const [name, setName] = useState(studentName ?? "");
  const { toast } = useToast();

  // إذا عاد الطالب وكان اسمه محفوظًا، اعرض زر "متابعة الرحلة"
  const isReturning = Boolean(studentName);

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      toast({
        title: "الاسم قصير جدًا",
        description: "من فضلك أدخل اسمك الكامل لبدء الرحلة.",
        variant: "destructive",
      });
      return;
    }
    setStudentName(trimmed);
    startJourney();
    toast({
      title: `أهلًا بك ${trimmed}! 🚀`,
      description: "لنبدأ رحلة استكشاف عالم الفيزياء التفاعلي.",
    });
  };

  return (
    <div className="physics-gradient min-h-screen flex flex-col">
      {/* ترويسة */}
      <header className="px-4 sm:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Atom className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg text-primary leading-tight">منصة الفيزياء التفاعلية</h1>
            <p className="text-[11px] text-muted-foreground">الصف التاسع — الفصل الدراسي الثاني</p>
            <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mt-1">إعداد المعلم: فايز مروج</p>
          </div>
        </div>
        {isReturning && (
          <span className="text-xs text-muted-foreground hidden sm:block">
            مرحبًا بعودتك، <span className="font-semibold text-foreground">{studentName}</span>
          </span>
        )}
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          {/* بطاقة الترحيب */}
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl shadow-primary/5">
            {/* زخارف */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative p-6 sm:p-10 md:p-14">
              <div className="flex flex-col items-center text-center gap-6">
                {/* شعار */}
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
                >
                  <Atom className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
                </motion.div>

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    منصة تعلّم تفاعلية شاملة
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                    انطلق في رحلة استكشاف عالم الفيزياء
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    تعلّم ميكانيكا الموائع وانكسار الضوء والعدسات الرقيقة من خلال شرح مبسّط،
                    أمثلة محلولة خطوة بخطوة، تجارب تخيلية، واختبارات تفاعلية.
                  </p>
                </div>

                {/* إدخال الاسم */}
                <div className="w-full max-w-md space-y-3 mt-2">
                  <Label htmlFor="student-name" className="text-right block text-sm font-semibold">
                    ما اسمك أيها المستكشف؟
                  </Label>
                  <Input
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                    placeholder="اكتب اسمك هنا..."
                    className="h-12 text-base text-center font-medium"
                    maxLength={40}
                    autoFocus
                  />
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="w-full h-12 text-base font-bold gap-2 group"
                  >
                    <Rocket className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    {isReturning ? "تابع رحلة الاستكشاف" : "ابدأ رحلة الاستكشاف"}
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </div>

                {/* معالم الرحلة */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-6">
                  <FeaturePill icon={<Waves className="w-4 h-4" />} title="وحدتان دراسيتان" desc="موائع + ضوء" />
                  <FeaturePill icon={<BookOpen className="w-4 h-4" />} title="٥ دروس كاملة" desc="شرح + أمثلة" />
                  <FeaturePill icon={<Lightbulb className="w-4 h-4" />} title="اختبارات تفاعلية" desc="مع الحل النموذجي" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            يُحفظ اسمك وتقدّك الدراسي تلقائيًا في متصفحك — يمكنك المتابعة في أي وقت.
          </p>
        </motion.div>
      </main>

      {/* تذييل ثابت */}
      <footer className="mt-auto border-t border-border/40 bg-card/50 backdrop-blur px-4 py-4 text-center space-y-1">
        <p className="text-sm font-semibold text-primary">
          إعداد المعلم: فايز مروج
        </p>
        <p className="text-xs text-muted-foreground">
          منصة الفيزياء التفاعلية · مبنية على كتاب الطالب الرسمي للصف التاسع
        </p>
      </footer>
    </div>
  );
}

function FeaturePill({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-3 py-2.5 text-right">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold text-foreground leading-tight">{title}</div>
        <div className="text-[11px] text-muted-foreground leading-tight">{desc}</div>
      </div>
    </div>
  );
}
