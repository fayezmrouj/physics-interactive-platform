"use client";

import { cn } from "@/lib/utils";

/**
 * مكوّن لعرض الصيغة الرياضية الفيزيائية بشكل معزول وواضح.
 * يدعم رموز يونيكود الفيزيائية الشائعة (ρ θ ν ° ≤ ≥ × ² ³ ⁻ ⁵ ⁸).
 */
interface FormulaDisplayProps {
  expression: string;
  name?: string;
  className?: string;
}

export function FormulaDisplay({ expression, name, className }: FormulaDisplayProps) {
  return (
    <div className={cn("formula-box rounded-xl px-5 py-4 my-2", className)}>
      {name && (
        <div className="text-xs text-muted-foreground mb-2 text-center" dir="rtl">
          {name}
        </div>
      )}
      <div className="math-expr text-xl md:text-2xl font-semibold text-primary tracking-wide">
        {expression}
      </div>
    </div>
  );
}

/**
 * نص رياضي سطري (inline) يحافظ على اتجاه LTR للأرقام والرموز.
 */
export function MathText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("math-expr text-[0.95em] font-medium text-foreground", className)}>
      {children}
    </span>
  );
}
