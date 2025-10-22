"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="flex justify-center pt-10 md:pt-40 md:gap-10"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-8 -translate-x-1/2 md:left-3 md:translate-x-0 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <div 
            className={`h-4 w-4 rounded-full border p-2 transition-all duration-300 ${
              isInView 
                ? 'bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' 
                : 'bg-neutral-800 border-neutral-700'
            }`} 
          />
        </div>
        <h3 
          className={`hidden md:block title-timeline md:pl-20 transition-colors duration-300 ${
            isInView ? 'text-white' : 'text-neutral-500'
          }`}
        >
          {item.title}
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
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

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

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
      className="w-full font-sans md:px-10"
      style={{ backgroundColor: '#0A0A0A' }}
      ref={containerRef}
    >
      <div className="max-w-5xl mx-auto pt-30 pb-4 px-4 md:px-8 lg:px-10">
        <h2 
          ref={h2Ref} 
          className="title-section text-white mb-2 max-w-4xl mx-auto text-center"
          style={{ opacity: isLoaded ? undefined : 1 }}
        >
          Soluções Vision AI
        </h2>
        <p 
          ref={pRef} 
          className="text-description text-neutral-300 max-w-2xl mx-auto text-center"
          style={{ opacity: isLoaded ? undefined : 1 }}
        >
          Automatize, escale e personalize o relacionamento com excelência.
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-4">
        {data.map((item, index) => (
          <TimelineItem key={`timeline-${item.title}-${index}`} item={item} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-neutral-600 via-neutral-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};