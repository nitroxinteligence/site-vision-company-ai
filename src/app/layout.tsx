import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ConditionalNavbar } from "@/components/ui/conditional-navbar";
import { generateStructuredData } from "@/lib/structured-data";
import { LanguageProvider } from "@/components/providers/language-provider";
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
  metadataBase: new URL('https://visioncompany.ai'),
  title: {
    default: "Vision AI | Agentes de IA para Empresas - Automatize e Escale",
    template: "%s | Vision AI",
  },
  description: "Agentes de IA personalizados para automatizar processos, reduzir custos operacionais e escalar seu negócio. Consultoria gratuita para empresas que querem crescer com inteligência artificial.",
  keywords: [
    "IA para empresas",
    "Automação com IA",
    "Agentes de IA",
    "inteligência artificial empresarial",
    "automação de processos",
    "agentes inteligentes",
    "IA corporativa",
    "machine learning",
    "chatbot empresarial",
    "automação comercial",
  ],
  authors: [{ name: "Vision AI", url: "https://visioncompany.ai" }],
  creator: "Vision AI",
  publisher: "Vision AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "https://visioncompany.ai",
    siteName: "Vision AI",
    title: "Vision AI | Agentes de IA para Empresas - Automatize e Escale",
    description: "Agentes de IA personalizados para automatizar processos, reduzir custos operacionais e escalar seu negócio. Consultoria gratuita.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vision AI - Agentes de IA para Empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision AI | Agentes de IA para Empresas",
    description: "Automatize processos e escale seu negócio com agentes de IA personalizados.",
    images: ["/og-image.png"],
    creator: "@visioncompanyai",
  },
  alternates: {
    canonical: "https://visioncompany.ai",
    languages: {
      "pt-BR": "https://visioncompany.ai",
      "en": "https://visioncompany.ai/en",
    },
  },
  category: "technology",
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

        {/* JSON-LD Structured Data */}
        {generateStructuredData().map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
        
        <LanguageProvider>
          <SmoothScrollProvider>
            <ConditionalNavbar />
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
