"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { curriculum, getAllLessons, getTotalLessonsCount } from "@/lib/curriculum";

export type View = "welcome" | "dashboard" | "lesson";

interface ProgressState {
  // بيانات الطالب
  studentName: string | null;
  // الدروس المكتملة (معرفات الدروس)
  completedLessons: string[];
  // الدرس الحالي المعروض
  currentLessonId: string | null;
  // الوحدة الموسّعة حاليًا في لوحة التحكم
  expandedUnitId: string | null;
  // إجابات الكويز المخزّنة (معرف السؤال -> الفهرس المختار)
  quizAnswers: Record<string, number>;
  // الأسئلة التي أظهر الطالب حلولها
  revealedSolutions: string[];
  // العرض الحالي
  view: View;

  // Actions
  setStudentName: (name: string) => void;
  startJourney: () => void;
  goToDashboard: () => void;
  openLesson: (lessonId: string) => void;
  backToDashboard: () => void;
  toggleUnit: (unitId: string) => void;
  completeLesson: (lessonId: string) => void;
  uncompleteLesson: (lessonId: string) => void;
  setQuizAnswer: (questionId: string, optionIndex: number) => void;
  toggleSolution: (questionId: string) => void;
  resetProgress: () => void;

  // Getters
  isLessonCompleted: (lessonId: string) => boolean;
  getProgressPercent: () => number;
  getUnitProgress: (unitId: string) => { completed: number; total: number; percent: number };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      studentName: null,
      completedLessons: [],
      currentLessonId: null,
      expandedUnitId: null,
      quizAnswers: {},
      revealedSolutions: [],
      view: "welcome",

      setStudentName: (name) => set({ studentName: name.trim() }),

      startJourney: () => {
        const name = get().studentName;
        if (name && name.trim().length > 0) {
          set({ view: "dashboard" });
        }
      },

      goToDashboard: () => set({ view: "dashboard", currentLessonId: null }),

      openLesson: (lessonId) => set({ currentLessonId: lessonId, view: "lesson" }),

      backToDashboard: () => set({ view: "dashboard", currentLessonId: null }),

      toggleUnit: (unitId) =>
        set((state) => ({
          expandedUnitId: state.expandedUnitId === unitId ? null : unitId,
        })),

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),

      uncompleteLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.filter((id) => id !== lessonId),
        })),

      setQuizAnswer: (questionId, optionIndex) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [questionId]: optionIndex },
        })),

      toggleSolution: (questionId) =>
        set((state) => ({
          revealedSolutions: state.revealedSolutions.includes(questionId)
            ? state.revealedSolutions.filter((id) => id !== questionId)
            : [...state.revealedSolutions, questionId],
        })),

      resetProgress: () =>
        set({
          studentName: null,
          completedLessons: [],
          currentLessonId: null,
          expandedUnitId: null,
          quizAnswers: {},
          revealedSolutions: [],
          view: "welcome",
        }),

      isLessonCompleted: (lessonId) => get().completedLessons.includes(lessonId),

      getProgressPercent: () => {
        const total = getTotalLessonsCount();
        const done = get().completedLessons.length;
        return total === 0 ? 0 : Math.round((done / total) * 100);
      },

      getUnitProgress: (unitId) => {
        const unit = curriculum.find((u) => u.id === unitId);
        if (!unit) return { completed: 0, total: 0, percent: 0 };
        const total = unit.lessons.length;
        const completed = unit.lessons.filter((l) =>
          get().completedLessons.includes(l.id)
        ).length;
        return {
          completed,
          total,
          percent: total === 0 ? 0 : Math.round((completed / total) * 100),
        };
      },
    }),
    {
      name: "physics-platform-storage",
      // لا نخزّن العرض الحالي (view) لنبدأ دائمًا من الترحيب أو اللوحة حسب وجود الاسم
      partialize: (state) => ({
        studentName: state.studentName,
        completedLessons: state.completedLessons,
        quizAnswers: state.quizAnswers,
        revealedSolutions: state.revealedSolutions,
      }),
    }
  )
);
