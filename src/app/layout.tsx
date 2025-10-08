import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ConditionalNavbar } from "@/components/ui/conditional-navbar";
// Teste de scroll em desenvolvimento
import "@/lib/scroll-test";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vision AI - Sua empresa na Era da IA",
  description: "Soluções avançadas de IA para análise de imagens e visão computacional. Transforme dados visuais em insights estratégicos para seu negócio.",
  keywords: "visão computacional, inteligência artificial, análise de imagens, IA, machine learning, computer vision",
  authors: [{ name: "Vision AI Team" }],
  openGraph: {
    title: "Vision AI - Sua empresa na Era da IA",
    description: "Soluções avançadas de IA para análise de imagens e visão computacional.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision AI - Sua empresa na Era da IA",
    description: "Soluções avançadas de IA para análise de imagens e visão computacional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <SmoothScrollProvider>
          <ConditionalNavbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
