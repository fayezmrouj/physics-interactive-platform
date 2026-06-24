import type { Metadata } from "next";
import { Tajawal, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة الفيزياء التفاعلية",
  description: "منصة تعليمية تفاعلية لفيزياء الصف التاسع - الفصل الدراسي الثاني",
  keywords: ["الفيزياء", "الصف التاسع", "موائع", "انكسار الضوء", "عدسات", "تعلم تفاعلي"],
  authors: [{ name: "منصة الفيزياء التفاعلية" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.variable} ${cairo.variable} font-tajawal antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
