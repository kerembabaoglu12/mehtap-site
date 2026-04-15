import type { Metadata } from "next";
import { Toaster } from "sonner";
import { FloatingWhatsApp } from "@/components/public/FloatingWhatsApp";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADY Grup | Danışmanlık ve Güvenlik Hizmetleri",
  description: "Danışmanlık, Güvenlik, Eğitim ve Tüm Destek Hizmetlerinde Çözüm Ortağınız.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        {children}
        <FloatingWhatsApp />
        <Toaster />
      </body>
    </html>
  );
}
