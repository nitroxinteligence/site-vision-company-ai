import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ConditionalNavbar } from "@/components/ui/conditional-navbar";
// Teste de scroll em desenvolvimento
import "@/lib/scroll-test";
// Inicialização do GSAP
import "@/lib/gsap-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vision AI - Sua empresa na Era da IA",
  description: "Soluções avançadas de IA.",
  keywords: "inteligência artificial, agentes de IA, IA, machine learning",
  authors: [{ name: "Vision AI Team" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Vision AI - Sua empresa na Era da IA",
    description: "Soluções avançadas de IA.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision AI - Sua empresa na Era da IA",
    description: "Soluções avançadas de IA.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5DC5JW25');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DC5JW25"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <SmoothScrollProvider>
          <ConditionalNavbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
