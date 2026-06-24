"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, Waves, Lightbulb, ChevronLeft, CheckCircle2, Circle, BookOpen,
  Trophy, RotateCcw, ArrowRight, GraduationCap, Target, Beaker, Calculator, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useProgressStore } from "@/lib/store";
import { curriculum } from "@/lib/curriculum";
import { useToast } from "@/hooks/use-toast";

const unitIcons: Record<string, React.ReactNode> = {
  waves: <Waves className="w-5 h-5" />,
  lightbulb: <Lightbulb className="w-5 h-5" />,
};

export function DashboardView() {
  const {
    studentName, view, goToDashboard, openLesson, expandedUnitId, toggleUnit,
    isLessonCompleted, getProgressPercent, getUnitProgress, resetProgress,
  } = useProgressStore();
  const { toast } = useToast();

  const totalPercent = getProgressPercent();
  const completedCount = useProgressStore((s) => s.completedLessons.length);
  const totalLessons = curriculum.reduce((acc, u) => acc + u.lessons.length, 0);

  const handleReset = () => {
    resetProgress();
    toast({ title: "تمت إعادة التعيين", description: "بدأت رحلة جديدة من جديد." });
  };

  return (
    <div className="physics-gradient min-h-screen flex flex-col">
      {/* الترويسة */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Atom className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm sm:text-base text-primary leading-tight truncate">منصة الفيزياء التفاعلية</h1>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">الصف التاسع — الفصل الثاني</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-secondary-foreground" />
              <span className="font-semibold text-foreground">{studentName}</span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive h-8 gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">إعادة</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>إعادة تعيين التقدّم؟</AlertDialogTitle>
                  <AlertDialogDescription>
                    سيتم حذف اسمك وجميع الدروس المكتملة وإجابات الاختبارات. لا يمكن التراجع عن هذا الإجراء.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
                    نعم، أعد التعيين
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* بطاقة التقدم العامة */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden border-border/60 shadow-sm">
            <div className="relative p-5 sm:p-7">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-primary via-secondary to-primary opacity-80" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-secondary-foreground" />
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      أهلًا {studentName}! 👋
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تابِع تقدّمك في رحلة تعلّم الفيزياء. أكمل الدروس لتزيد نسبة إنجازك.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
                      {totalPercent}%
                    </div>
                    <div className="text-[11px] text-muted-foreground">نسبة الإنجاز</div>
                  </div>
                  <Separator orientation="vertical" className="h-14 hidden sm:block" />
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground tabular-nums">
                      {completedCount}/{totalLessons}
                    </div>
                    <div className="text-[11px] text-muted-foreground">دروس مكتملة</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">شريط تقدّم المنهج</span>
                  <span className="font-semibold text-primary">{totalPercent}%</span>
                </div>
                <Progress value={totalPercent} className="h-3" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* قائمة الوحدات */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              وحدات المنهج
            </h3>
            <Badge variant="secondary" className="text-xs">وحدتان · ٥ دروس</Badge>
          </div>

          {curriculum.map((unit, idx) => {
            const isExpanded = expandedUnitId === unit.id;
            const progress = getUnitProgress(unit.id);
            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
              >
                <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
                  {/* رأس الوحدة */}
                  <button
                    onClick={() => toggleUnit(unit.id)}
                    className="w-full p-4 sm:p-5 flex items-center gap-4 text-right hover:bg-muted/40 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-primary-foreground"
                      style={{ background: `hsl(${unit.color} 70% 45%)` }}
                    >
                      {unitIcons[unit.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          الوحدة {unit.number}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-foreground">{unit.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{unit.intro}</p>
                      {/* شريط تقدم الوحدة */}
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={progress.percent} className="h-1.5 flex-1" />
                        <span className="text-[10px] font-semibold text-muted-foreground tabular-nums shrink-0">
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "-rotate-90" : ""}`}
                    />
                  </button>

                  {/* الدروس */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-border/50 bg-muted/20"
                      >
                        <div className="p-3 sm:p-4 space-y-2">
                          {unit.lessons.map((lesson, lIdx) => {
                            const done = isLessonCompleted(lesson.id);
                            return (
                              <motion.button
                                key={lesson.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: lIdx * 0.05 }}
                                onClick={() => openLesson(lesson.id)}
                                className="w-full group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-sm transition-all text-right"
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${done ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                  {done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold text-muted-foreground">الدرس {lesson.order}</span>
                                    {done && (
                                      <Badge variant="default" className="text-[9px] h-4 px-1.5 py-0 bg-primary/90">
                                        مكتمل
                                      </Badge>
                                    )}
                                  </div>
                                  <h5 className="font-semibold text-sm text-foreground truncate mt-0.5">{lesson.title}</h5>
                                  <p className="text-[11px] text-muted-foreground truncate">{lesson.englishTitle}</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground shrink-0">
                                  <span className="hidden sm:inline">{lesson.quiz.length} أسئلة</span>
                                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" />
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* روابط سريعة لرموز أقسام الدرس */}
        <Card className="border-border/60 shadow-sm">
          <div className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              ماذا يتضمن كل درس؟
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { icon: <Target className="w-4 h-4" />, label: "الأهداف" },
                { icon: <GraduationCap className="w-4 h-4" />, label: "المفاهيم والثوابت" },
                { icon: <Calculator className="w-4 h-4" />, label: "القوانين" },
                { icon: <BookOpen className="w-4 h-4" />, label: "أمثلة محلولة" },
                { icon: <Beaker className="w-4 h-4" />, label: "تجربة تخيلية" },
                { icon: <AlertTriangle className="w-4 h-4" />, label: "أخطاء مفاهيمية" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/30 border border-border/40 text-center">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-foreground leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>

      {/* تذييل ثابت */}
      <footer className="mt-auto border-t border-border/40 bg-card/50 backdrop-blur px-4 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          منصة الفيزياء التفاعلية · تقدّمك محفوظ تلقائيًا في متصفحك
        </p>
      </footer>
    </div>
  );
}
