"use client";
import {
  useInView,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "@/components/providers/language-provider";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineItemProps {
  item: TimelineEntry;
}

const TimelineItem = ({ item }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, {
    margin: "-50% 0px -50% 0px"
  });

  return (
    <div
      ref={itemRef}
      className="relative flex justify-start pt-10 md:pt-40 md:gap-10 border-l-2 border-neutral-700 ml-8"
    >
      {/* Círculo - centralizado sobre a borda esquerda usando offset negativo */}
      <div
        className="absolute -left-[9px] top-10 md:top-40 h-4 w-4 rounded-full flex items-center justify-center z-40"
      >
        <div
          className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
            isInView
              ? 'bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]'
              : 'bg-neutral-800 border-neutral-700'
          }`}
          style={{
            boxShadow: isInView ? '0 0 0 4px #0A0A0A' : '0 0 0 4px #0A0A0A'
          }}
        />
      </div>

      {/* Título desktop - sticky */}
      <div className="sticky flex flex-col md:flex-row z-30 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full pl-8 md:pl-8">
        <h3
          className={`hidden md:block title-timeline transition-colors duration-300 -mt-2 ${
            isInView ? 'text-white' : 'text-neutral-500'
          }`}
        >
          {item.title}
        </h3>
      </div>

      {/* Conteúdo */}
      <div className="relative pl-12 pr-4 md:pl-4 w-full">
        <h3
          className={`md:hidden block title-timeline mb-4 text-left transition-colors duration-300 ${
            isInView ? 'text-white' : 'text-neutral-500'
          }`}
        >
          {item.title}
        </h3>
        {item.content}
      </div>
    </div>
  );
};

export const Timeline = ({ data }: { data: ReadonlyArray<TimelineEntry> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const copy = useTranslations();

  // Animações GSAP para título e texto
  useGSAP(
    () => {
      if (!h2Ref.current || !pRef.current) return;

      // Pequeno delay para garantir que os elementos estejam prontos
      const timer = setTimeout(() => {
        // Divisão do texto em linhas para animação
        const h2Split = new SplitText(h2Ref.current, { type: "lines" });
        const pSplit = new SplitText(pRef.current, { type: "lines" });

        // Mostrar conteúdo imediatamente para evitar flash
        setIsLoaded(true);

      // Estados iniciais dos elementos (invisíveis e deslocados)
      gsap.set(h2Split.lines, {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      });

      gsap.set(pSplit.lines, {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });

      // Timeline principal das animações com ScrollTrigger
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
          markers: false, // Remover em produção
        },
      });

      // Animação do título (H2)
      tl.to(
        h2Split.lines,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
        },
        0.3
      )
        // Animação do parágrafo (P)
        .to(
          pSplit.lines,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.3"
        );

      // Cleanup function
        return () => {
          h2Split?.revert();
          pSplit?.revert();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, 100); // 100ms delay

      return () => {
        clearTimeout(timer);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      className="w-full font-sans md:px-10 relative"
      style={{ backgroundColor: '#0A0A0A' }}
      ref={containerRef}
    >
      <div className="max-w-5xl mx-auto pt-30 pb-4 px-4 md:px-8 lg:px-10">
        <h2 
          ref={h2Ref} 
          className="title-section text-white mb-2 max-w-4xl mx-auto text-center"
          style={{ opacity: isLoaded ? undefined : 1 }}
        >
          {copy.home.timeline.heading}
        </h2>
        <p 
          ref={pRef} 
          className="text-description text-neutral-300 max-w-2xl mx-auto text-center"
          style={{ opacity: isLoaded ? undefined : 1 }}
        >
          {copy.home.timeline.subheading}
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-4">
        {data.map((item, index) => (
          <TimelineItem key={`timeline-${item.title}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};
