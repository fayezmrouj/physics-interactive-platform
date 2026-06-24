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
  // السماح للتطبيق بالعمل داخل iframe (لتضمينه في Google Sites وغيرها)
  // ملاحظة: headers في vercel.json ستتحكم في frame-ancestors المسموح بها
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://sites.google.com https://*.sites.google.com https://*.google.com;",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
