"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ContactModal } from "@/components/ui/contact-modal";
import CaptureHero from "@/components/ui/capture-hero";
import MarketOpportunitySection from "@/components/ui/market-opportunity-section";
import AiStatisticsSection from "@/components/ui/ai-statistics-section";
import RevenueProjectionSection from "@/components/ui/revenue-projection-section";
import CptScrollReveal from "@/components/ui/cpt-scroll-reveal";
import ComoFuncionaSection from "@/components/ui/como-funciona-section";
import DetailedRevenueProjectionSection from "@/components/ui/detailed-revenue-projection-section";
import FinalCtaSection from "@/components/ui/final-cta-section";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function CptContent() {
  const { locale } = useLanguage();

  return (
    <div key={locale}>
      <ModalProvider>
        <div className="fixed right-6 top-6 z-50">
          <LanguageSwitcher />
        </div>
        <main>
          <CaptureHero />

          {/* SESSÃO 2: Oportunidade de Mercado */}
          <MarketOpportunitySection />

          {/* SESSÃO 2.5: Estatísticas de IA */}
          <AiStatisticsSection />

          {/* SESSÃO 3: Projeção de Receita */}
          <RevenueProjectionSection />

          {/* SEÇÃO DE SCROLL REVEAL */}
          <CptScrollReveal />

          {/* SESSÃO 4: Como Funciona */}
          <ComoFuncionaSection />

          {/* SESSÃO 5: Projeção Detalhada de Receita */}
          <DetailedRevenueProjectionSection />

          {/* SESSÃO 6: CTA Final com Background Animado */}
          <FinalCtaSection />
        </main>
        <ContactModal />
      </ModalProvider>
    </div>
  );
}
