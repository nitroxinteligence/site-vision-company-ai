"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { useModal } from "@/components/providers/modal-provider";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

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
        <h2 
          ref={titleRef}
          className="title-section text-white mb-16 max-w-8xl mx-auto text-center"
        >
          Esse valor de investimento pode aumentar a qualquer momento.<br />Aplique agora!
        </h2>

        {/* CTA Final */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg"
            onClick={openModal}
            className="border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-6 py-3 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-[border-color,background-color,box-shadow] duration-500"
          >
            Quero saber mais
          </Button>
        </div>
      </div>

    </section>
  );
}