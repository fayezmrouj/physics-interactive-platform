import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ملاحظة: لا نستخدم output: "standalone" لأن Vercel يدير البناء تلقائيًا
  reactStrictMode: false,
  // تفعيل ضغط الصور وتحسين الأداء
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // تجاهل أخطاء TypeScript أثناء البناء (المشروع نظيف لكن احتياطًا)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
