"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Target, GraduationCap, Calculator, BookOpen, Beaker,
  AlertTriangle, Lightbulb, CheckCircle2, Circle, ChevronLeft, ChevronDown,
  CheckCheck, Eye, EyeOff, Sparkles, Award, FlaskConical, Ruler, Quote,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useProgressStore } from "@/lib/store";
import type { Lesson } from "@/lib/curriculum";
import { FormulaDisplay, MathText } from "./formula-display";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  const {
    backToDashboard, completeLesson, uncompleteLesson, isLessonCompleted,
    quizAnswers, setQuizAnswer, revealedSolutions, toggleSolution,
  } = useProgressStore();
  const { toast } = useToast();
  const done = isLessonCompleted(lesson.id);

  const handleToggleComplete = () => {
    if (done) {
      uncompleteLesson(lesson.id);
      toast({ title: "تم إلغاء الإكمال", description: `الدرس: ${lesson.title}` });
    } else {
      completeLesson(lesson.id);
      toast({
        title: "أحسنت! 🎉",
        description: `أكملت الدرس: ${lesson.title}. تقدّمت خطوة للأمام!`,
      });
    }
  };

  return (
    <div className="physics-gradient min-h-screen flex flex-col">
      {/* الترويسة */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={backToDashboard}
            className="gap-1.5 text-muted-foreground hover:text-foreground h-9"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">لوحة التحكم</span>
          </Button>
          <div className="flex-1 min-w-0 text-center">
            <div className="text-[10px] text-muted-foreground">الدرس {lesson.order}</div>
            <h1 className="font-bold text-sm sm:text-base text-foreground truncate">{lesson.title}</h1>
          </div>
          <div className="w-[88px] sm:w-[120px] flex justify-end">
            {done && (
              <Badge variant="default" className="bg-primary/90 gap-1">
                <CheckCircle2 className="w-3 h-3" />
                مكتمل
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* بطاقة عنوان الدرس */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden border-border/60 shadow-sm">
            <div className="p-5 sm:p-7 bg-gradient-to-bl from-primary/5 via-card to-secondary/5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px]">الدرس {lesson.order}</Badge>
                <Badge variant="secondary" className="text-[10px] font-normal">{lesson.englishTitle}</Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">{lesson.title}</h2>
              <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-primary/5 border border-primary/15">
                <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <span className="font-bold text-primary">الفكرة الرئيسة: </span>
                  {lesson.mainIdea}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 1. الأهداف */}
        <Section icon={<Target className="w-4 h-4" />} title="الأهداف التعليمية" accent="primary">
          <ul className="space-y-2.5">
            {lesson.objectives.map((obj, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2.5 text-sm leading-relaxed"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{obj}</span>
              </motion.li>
            ))}
          </ul>
        </Section>

        {/* 2. المفاهيم والثوابت */}
        <Section icon={<GraduationCap className="w-4 h-4" />} title="المفاهيم والثوابت الفيزيائية" accent="secondary">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.concepts.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-card p-3.5 hover:border-secondary/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-bold text-sm text-foreground">{c.name}</h4>
                  {c.symbol !== "—" && c.symbol && (
                    <span className="math-expr text-base font-bold text-primary px-2 py-0.5 rounded bg-primary/8">
                      {c.symbol}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{c.definition}</p>
                <div className="flex flex-wrap gap-2">
                  {c.unit && (
                    <Badge variant="outline" className="text-[10px] font-math gap-1">
                      <Ruler className="w-2.5 h-2.5" />
                      الوحدة: <MathText>{c.unit}</MathText>
                    </Badge>
                  )}
                  {c.value && (
                    <Badge className="text-[10px] gap-1 bg-secondary text-secondary-foreground">
                      <Sparkles className="w-2.5 h-2.5" />
                      <MathText className="text-secondary-foreground">{c.value}</MathText>
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. القوانين الرياضية */}
        <Section icon={<Calculator className="w-4 h-4" />} title="القوانين الرياضية" accent="primary">
          <div className="space-y-4">
            {lesson.formulas.map((f, i) => (
              <div key={i} className="rounded-xl border border-border/60 overflow-hidden">
                <div className="px-4 py-2 bg-muted/40 border-b border-border/50 flex items-center gap-2">
                  <Calculator className="w-3.5 h-3.5 text-primary" />
                  <h4 className="text-xs font-bold text-foreground">{f.name}</h4>
                </div>
                <div className="p-4">
                  <FormulaDisplay expression={f.expression} />
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {f.symbols.map((s, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs bg-muted/30 rounded-lg px-2.5 py-1.5">
                        <span className="math-expr font-bold text-primary min-w-[24px] text-center">{s.symbol}</span>
                        <span className="text-muted-foreground">←</span>
                        <span className="text-foreground/90 flex-1">{s.meaning}</span>
                        {s.unit && s.unit !== "—" && (
                          <span className="math-expr text-[10px] text-muted-foreground">({s.unit})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. أمثلة محلولة */}
        <Section icon={<BookOpen className="w-4 h-4" />} title="أمثلة محلولة خطوة بخطوة" accent="secondary">
          <div className="space-y-3">
            {lesson.examples.map((ex, i) => (
              <SolvedExampleCard key={i} example={ex} index={i + 1} />
            ))}
          </div>
        </Section>

        {/* 5. التجربة المخبرية التخيلية */}
        <Section icon={<Beaker className="w-4 h-4" />} title="التجربة المخبرية التخيلية" accent="primary">
          <ExperimentCard experiment={lesson.experiment} />
        </Section>

        {/* 6. أخطاء مفاهيمية شائعة */}
        {lesson.misconceptions.length > 0 && (
          <Section icon={<AlertTriangle className="w-4 h-4" />} title="أخطاء مفاهيمية شائعة" accent="destructive">
            <div className="space-y-3">
              {lesson.misconceptions.map((m, i) => (
                <div key={i} className="misconception-box rounded-xl p-4 border border-destructive/20">
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold">✗</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-destructive">الفكرة الخاطئة</span>
                      <p className="text-sm text-foreground/90 leading-relaxed mt-0.5">{m.wrong}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-primary">الصواب</span>
                      <p className="text-sm text-foreground/90 leading-relaxed mt-0.5">{m.correct}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-destructive/15">
                    <Lightbulb className="w-4 h-4 text-secondary-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      <span className="font-bold text-secondary-foreground">لماذا؟ </span>
                      {m.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 7. تطبيقات عملية */}
        {lesson.applications.length > 0 && (
          <Section icon={<Lightbulb className="w-4 h-4" />} title="تطبيقات عملية في حياتنا" accent="secondary">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lesson.applications.map((app, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary/8 border border-secondary/20">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed">{app}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 8. أسئلة سريعة (كويز) */}
        <Section icon={<Award className="w-4 h-4" />} title="أسئلة سريعة (كويز)" accent="primary">
          <div className="space-y-3">
            {lesson.quiz.map((q, i) => {
              const selected = quizAnswers[q.id];
              const revealed = revealedSolutions.includes(q.id);
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctIndex;
              return (
                <QuizCard
                  key={q.id}
                  question={q}
                  index={i + 1}
                  selected={selected}
                  revealed={revealed}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSelect={(idx) => setQuizAnswer(q.id, idx)}
                  onToggleSolution={() => toggleSolution(q.id)}
                />
              );
            })}
          </div>
        </Section>

        {/* زر إكمال الدرس */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-2"
        >
          <Card className={cn(
            "border-2 transition-colors overflow-hidden",
            done ? "border-primary/40 bg-primary/5" : "border-border/60"
          )}>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {done ? <CheckCheck className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-foreground">
                  {done ? "أتممت هذا الدرس بنجاح!" : "هل أنهيت هذا الدرس؟"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {done
                    ? "يمكنك مراجعة الدرس متى شئت، أو إلغاء الإكمال لإعادة احتسابه."
                    : "اضغط على الزر لإكمال الدرس وتحديث شريط تقدّمك العام في المنهج."}
                </p>
              </div>
              <Button
                onClick={handleToggleComplete}
                size="lg"
                variant={done ? "outline" : "default"}
                className="w-full sm:w-auto gap-2 shrink-0"
              >
                <CheckCircle2 className="w-5 h-5" />
                {done ? "إلغاء الإكمال" : "إكمال الدرس"}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* تنقل سفلي */}
        <div className="flex items-center justify-between gap-3 pt-2 pb-4">
          <Button variant="ghost" onClick={backToDashboard} className="gap-1.5">
            <ArrowRight className="w-4 h-4" />
            عودة للوحة التحكم
          </Button>
        </div>
      </main>

      <footer className="mt-auto border-t border-border/40 bg-card/50 backdrop-blur px-4 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          منصة الفيزياء التفاعلية · الدرس {lesson.order}: {lesson.title}
        </p>
      </footer>
    </div>
  );
}

/* =================== مكوّنات مساعدة =================== */

function Section({
  icon, title, accent, children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: "primary" | "secondary" | "destructive";
  children: React.ReactNode;
}) {
  const accentColors = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/15 text-secondary-foreground border-secondary/25",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", accentColors[accent])}>
              {icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">{title}</h3>
          </div>
          {children}
        </div>
      </Card>
    </motion.section>
  );
}

function SolvedExampleCard({
  example, index,
}: {
  example: Lesson["examples"][0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 1);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-border/60 overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-center gap-3 text-right hover:bg-muted/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary-foreground flex items-center justify-center shrink-0 font-bold text-sm">
              {index}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-muted-foreground">مثال محلول</span>
              <h4 className="font-bold text-sm text-foreground truncate">{example.title}</h4>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-lg bg-muted/30 p-3 border-r-2 border-muted-foreground/40">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground mb-1">
                  <Quote className="w-3 h-3" />
                  المعطيات
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">{example.given}</p>
              </div>
              <div className="rounded-lg bg-primary/5 p-3 border-r-2 border-primary/40">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mb-1">
                  <Target className="w-3 h-3" />
                  المطلوب
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">{example.required}</p>
              </div>
            </div>
            <div className="rounded-lg bg-card p-3 border border-border/50">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground mb-2">
                <Calculator className="w-3 h-3 text-primary" />
                خطوات الحل
              </div>
              <ol className="space-y-1.5">
                {example.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90 flex-1">
                      {/^[0-9A-Za-z]/.test(step) ? (
                        <MathText className="text-foreground/90">{step}</MathText>
                      ) : (
                        step
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-lg bg-primary/8 p-3 border-r-2 border-primary flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-primary">الإجابة النهائية</span>
                <p className="text-xs text-foreground/90 leading-relaxed mt-0.5">{example.answer}</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function ExperimentCard({ experiment }: { experiment: Lesson["experiment"] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/15">
        <FlaskConical className="w-5 h-5 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-foreground">{experiment.title}</h4>
          <p className="text-[11px] text-primary font-medium mt-0.5">🎯 المفهوم المرسي: {experiment.concept}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* المواد */}
        <div className="rounded-xl border border-border/60 p-3.5 bg-card">
          <h5 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
            <Beaker className="w-3.5 h-3.5 text-secondary-foreground" />
            المواد والأدوات
          </h5>
          <ul className="space-y-1.5">
            {experiment.materials.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/60 mt-1.5 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* التحليل */}
        <div className="rounded-xl border border-border/60 p-3.5 bg-card">
          <h5 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
            التحليل والاستنتاج
          </h5>
          <ul className="space-y-1.5">
            {experiment.analysis.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed">
                <ChevronLeft className="w-3 h-3 text-primary mt-1 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* الخطوات */}
      <div className="rounded-xl border border-border/60 p-3.5 bg-card">
        <h5 className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
          <Ruler className="w-3.5 h-3.5 text-primary" />
          خطوات العمل
        </h5>
        <ol className="space-y-2.5">
          {experiment.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-xs text-foreground/90 leading-relaxed flex-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function QuizCard({
  question, index, selected, revealed, isAnswered, isCorrect, onSelect, onToggleSolution,
}: {
  question: Lesson["quiz"][0];
  index: number;
  selected?: number;
  revealed: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onToggleSolution: () => void;
}) {
  return (
    <Card className="border-border/60 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-2.5 mb-3">
          <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
            {index}
          </span>
          <p className="text-sm text-foreground font-medium leading-relaxed flex-1">{question.question}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            const isRightAnswer = i === question.correctIndex;
            const showState = revealed && isRightAnswer;
            const showWrong = revealed && isSelected && !isRightAnswer;
            return (
              <button
                key={i}
                onClick={() => !revealed && onSelect(i)}
                disabled={revealed}
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-lg border text-right text-xs transition-all",
                  !revealed && "hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
                  !isSelected && !showState && "border-border/50 bg-card",
                  isSelected && !revealed && "border-primary bg-primary/8",
                  showState && "border-primary bg-primary/10 font-semibold",
                  showWrong && "border-destructive bg-destructive/8"
                )}
              >
                <span className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-bold transition-colors",
                  showState ? "border-primary bg-primary text-primary-foreground"
                    : showWrong ? "border-destructive bg-destructive text-destructive-foreground"
                    : isSelected ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}>
                  {showState ? "✓" : showWrong ? "✗" : String.fromCharCode(1571 + (i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 3 : 5))}
                </span>
                <span className={cn("flex-1 leading-relaxed", showState && "text-foreground", showWrong && "text-destructive")}>
                  {/^[0-9]/.test(opt) ? <MathText>{opt}</MathText> : opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* أزرار الإجراءات */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/40">
          <div className="flex items-center gap-2">
            {isAnswered && !revealed && (
              <Badge variant="outline" className="text-[10px] gap-1">
                <Circle className="w-2 h-2" /> تم الاختيار
              </Badge>
            )}
            {revealed && (
              <Badge variant={isCorrect ? "default" : "destructive"} className="text-[10px] gap-1">
                {isCorrect ? <><CheckCircle2 className="w-3 h-3" /> إجابة صحيحة</> : <><AlertTriangle className="w-3 h-3" /> إجابة خاطئة</>}
              </Badge>
            )}
          </div>
          <Button
            size="sm"
            variant={revealed ? "outline" : "secondary"}
            onClick={onToggleSolution}
            className="h-8 gap-1.5 text-xs"
          >
            {revealed ? <><EyeOff className="w-3.5 h-3.5" /> إخفاء الحل</> : <><Eye className="w-3.5 h-3.5" /> إظهار الحل النموذجي</>}
          </Button>
        </div>

        {/* الحل النموذجي */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 rounded-lg bg-muted/40 p-3 border-r-2 border-primary"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mb-1.5">
              <Calculator className="w-3 h-3" />
              الحل النموذجي
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              {/^[0-9A-Za-z]/.test(question.solution) ? (
                <MathText className="text-foreground/90">{question.solution}</MathText>
              ) : (
                question.solution
              )}
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
