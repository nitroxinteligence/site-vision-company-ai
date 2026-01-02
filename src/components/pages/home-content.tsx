"use client";

import InfiniteHero from "@/components/ui/infinite-hero";
import ScrollSections from "@/components/ui/scroll-sections";
import { MinimalistTextEffect } from "@/components/ui/reveal-text";
import AnimatedAboutSection from "@/components/ui/animated-about-section";
import AnimatedProblemsSection from "@/components/ui/animated-problems-section";
import AnimatedAgentsSection from "@/components/ui/animated-agents-section";
import { Timeline } from "@/components/ui/timeline";
import { AgentFeatures } from "@/components/ui/agent-features";
import { AnimatedDifferentialSection } from "@/components/ui/animated-differential-section";
import { AnimatedAIWorkSection } from "@/components/ui/animated-ai-work-section";
import { ProfileCard } from "@/components/ui/profile-card";
import FAQAccordion from "@/components/ui/faq-accordion";
import ContactSection from "@/components/ui/contact-section";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ContactModal } from "@/components/ui/contact-modal";
import { useLanguage, useTranslations } from "@/components/providers/language-provider";

export default function HomeContent() {
  const { locale } = useLanguage();
  const copy = useTranslations();

  return (
    <ModalProvider>
      <main className="overflow-x-clip">
        <InfiniteHero />

        {/* Componente MinimalistTextEffect acima da seção 2 */}
        <section
          className="relative w-full text-white pt-0 pb-0"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          <div className="container mx-auto px-6 h-48 md:h-96">
            <MinimalistTextEffect text="VISION AI" duration={0.4} />
          </div>
        </section>

        {/* SEÇÃO 2. SOBRE */}
        <div id="sobre">
          <AnimatedAboutSection />
        </div>

        {/* SEÇÃO 3. POR QUE A MAIORIA DOS EMPRESÁRIOS TRAVA */}
        <AnimatedProblemsSection />

        {/* Scroll Sections with Fixed Effect */}
        <ScrollSections
          key={`scroll-sections-${locale}`}
          sections={copy.home.scrollSections.map((section) => ({ ...section }))}
        />

        {/* SEÇÃO 4. A NOVA FORMA DE CRESCER */}
        <div id="solucoes">
          <AnimatedAgentsSection />
        </div>

        {/* Timeline Section */}
        <section
          className="relative w-full text-white min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#0A0A0A", overflow: "visible" }}
        >
          <Timeline
            data={copy.home.timeline.items.map((item) => ({
              title: item.title,
              content: (
                <AgentFeatures
                  description={item.description}
                  features={item.features}
                  layout="single"
                  imageUrl={item.imageUrl}
                />
              ),
            }))}
          />
        </section>

        {/* SEÇÃO 6. POR QUE VISION AI É DIFERENTE */}
        <div id="diferenciais">
          <AnimatedDifferentialSection
            title={copy.home.differentials.title}
            differentials={copy.home.differentials.items.map((item) => ({ ...item }))}
          />
        </div>

        {/* SEÇÃO 7. O QUE ACONTECE QUANDO IA TRABALHA NO SEU LUGAR */}
        <div id="resultados">
          <AnimatedAIWorkSection
            title={copy.home.aiWork.title}
            statistics={copy.home.aiWork.statistics.map((stat) => ({ ...stat }))}
          />
        </div>

        {/* SEÇÃO 8. SOBRE - FUNDADORES */}
        <div id="fundadores">
          <section
            className="relative w-full pt-32 pb-20"
            style={{ backgroundColor: "#0A0A0A", overflow: "visible" }}
          >
            {/* Radial glow na lateral esquerda */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at left center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 15%, transparent 40%)",
                width: "50%",
                height: "100%",
                zIndex: 0,
              }}
            />

            <div className="container mx-auto px-6 relative z-10">
              {/* Badge acima do título */}
              <div className="flex items-center justify-center mb-8">
                <div
                  className="px-4 py-2 rounded-sm border text-sm font-medium"
                  style={{
                    backgroundColor: "#0c0c0c",
                    borderColor: "#323232",
                    borderRadius: "2px",
                    background: "linear-gradient(to right, #ffffff, #000000)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {copy.home.founders.badge}
                </div>
              </div>

              {/* Título centralizado */}
              <div className="flex items-center justify-center mb-16">
                <h2 className="title-section text-white text-center">
                  {copy.home.founders.title}
                </h2>
              </div>

              {/* Grid de cards dos fundadores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {copy.home.founders.profiles.map((profile) => (
                  <ProfileCard key={profile.name} {...{ ...profile }} />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* SEÇÃO 9. FAQ */}
        <div id="duvidas">
          <FAQAccordion />
        </div>

        {/* SEÇÃO 10. CONTATO */}
        <div id="contato">
          <ContactSection />
        </div>
      </main>
      <ContactModal />
    </ModalProvider>
  );
}
