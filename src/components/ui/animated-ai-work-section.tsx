"use client";

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { StatisticCard } from './statistic-card';

interface StatisticData {
  statistic: string;
  description: string;
}

interface AnimatedAIWorkSectionProps {
  title: string;
  statistics: StatisticData[];
}

export function AnimatedAIWorkSection({ title, statistics }: AnimatedAIWorkSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useGSAP(
    () => {
      // Delay inicial para garantir que os elementos estejam prontos
      const timeoutId = setTimeout(() => {
        if (!titleRef.current || !cardsRef.current) return;

        // Configurar SplitText para o título
        const titleSplit = new SplitText(titleRef.current, {
          type: "lines",
          linesClass: "split-line"
        });

        // Estados iniciais
        gsap.set(titleSplit.lines, {
          opacity: 0,
          y: 50,
          filter: "blur(10px)"
        });

        gsap.set(cardsRef.current.children, {
          opacity: 0,
          y: 60,
          filter: "blur(8px)",
          scale: 0.9
        });

        // Timeline principal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false
          }
        });

        // Animação do título (linha por linha)
        tl.to(titleSplit.lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out"
        });

        // Animação dos cards de estatísticas
        tl.to(cardsRef.current.children, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.6");

        setIsLoaded(true);

        // Cleanup
        return () => {
          titleSplit.revert();
        };
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="text-black py-16 sm:py-24 md:py-38"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          className="border rounded-2xl p-6 sm:p-10 md:p-16 w-full"
          style={{ borderColor: '#e5e5e5' }}
        >
          {/* Fallback content visible immediately */}
          {!isLoaded && (
            <>
              <h2 className="title-section text-black text-center mb-10 sm:mb-14 md:mb-16 px-2 sm:px-4">
                {title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                {statistics.map((stat, index) => (
                  <StatisticCard 
                    key={`fallback-${index}`}
                    statistic={stat.statistic}
                    description={stat.description}
                  />
                ))}
              </div>
            </>
          )}

          {/* Animated content */}
          <h2
            ref={titleRef}
            className={`title-section text-black text-center mb-10 sm:mb-14 md:mb-16 px-2 sm:px-4 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
          >
            {title}
          </h2>

          <div
            ref={cardsRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
          >
            {statistics.map((stat, index) => (
              <StatisticCard 
                key={`animated-${index}`}
                statistic={stat.statistic}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}