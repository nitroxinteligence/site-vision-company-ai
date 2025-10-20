import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5DC5JW25"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5DC5JW25');`}
        </Script>
        {/* End Google Tag Manager */}
        <SmoothScrollProvider>
          <ConditionalNavbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
