"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { useModal } from "@/components/providers/modal-provider";
import { useTranslations } from "@/components/providers/language-provider";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const copy = useTranslations();
  const finalCta = copy.home.cpt.finalCta;

  useGSAP(
    () => {
      // Configurações iniciais
      gsap.set([titleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      // Timeline de animação
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden border-t pt-32 pb-40 md:pt-48 md:pb-56"
      style={{ 
        backgroundColor: '#000000',
        borderTopColor: '#323232'
      }}
    >
      {/* Background Preto e Branco */}
      <AnimatedGradientBackground
        startingGap={150}
        Breathing={true}
        gradientColors={[
          "#000000",
          "#1a1a1a",
          "#333333",
          "#4a4a4a",
          "#666666",
          "#808080",
          "#ffffff"
        ]}
        gradientStops={[20, 35, 50, 65, 75, 85, 100]}
        animationSpeed={0.015}
        breathingRange={8}
        topOffset={20}
        containerClassName="opacity-30"
      />

      {/* Overlay para melhor contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Título Principal */}
        <div ref={titleRef} className="mb-16 max-w-8xl mx-auto text-center">
          <h1 className="title-responsive-xl text-white mb-4">
            {finalCta.titleLine1}
          </h1>
          <h2 className="title-responsive-xl text-white">
            {finalCta.titleLine2}
          </h2>
        </div>

        {/* CTA Final */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg"
            onClick={openModal}
            className="group relative w-[380px] hover:w-[420px] !bg-white hover:!bg-white text-black px-6 py-8 text-base rounded-lg font-medium tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 overflow-hidden"
          >
            <span className="group-hover:mr-6 transition-all duration-500">
              {finalCta.cta}
            </span>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Button>
        </div>
      </div>

    </section>
  );
}
