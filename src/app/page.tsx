"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useProgressStore } from "@/lib/store";
import { getLessonById } from "@/lib/curriculum";
import { WelcomeView } from "@/components/physics/welcome-view";
import { DashboardView } from "@/components/physics/dashboard-view";
import { LessonView } from "@/components/physics/lesson-view";

// يكتشف الترطيب (client-only) بدون setState داخل effect وبلا وميض ترطيب
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Home() {
  const { studentName, view, currentLessonId, goToDashboard } = useProgressStore();
  const hydrated = useHydrated();

  // إذا كان الاسم محفوظًا (طالب عائد) والعرض الحالي هو الترحيب، انتقل للوحة التحكم تلقائيًا
  useEffect(() => {
    if (hydrated && studentName && view === "welcome") {
      goToDashboard();
    }
  }, [hydrated, studentName, view, goToDashboard]);

  // التمرير لأعلى عند تغيّر العرض
  useEffect(() => {
    if (hydrated) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [view, currentLessonId, hydrated]);

  if (!hydrated) {
    // شاشة تحميل بسيطة أثناء الترطيب
    return (
      <div className="physics-gradient min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  // العرض الترحيبي
  if (!studentName || view === "welcome") {
    return <WelcomeView />;
  }

  // عرض الدرس
  if (view === "lesson" && currentLessonId) {
    const lesson = getLessonById(currentLessonId);
    if (lesson) {
      return <LessonView lesson={lesson} />;
    }
    // إذا لم يُعثر على الدرس، عُد للوحة التحكم
    goToDashboard();
  }

  // لوحة التحكم (الافتراضي)
  return <DashboardView />;
}
