"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
      className="text-white py-20" 
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="container mx-auto px-6">
        <div 
          className="border rounded-2xl p-16 md:p-20 mx-2 md:mx-4 max-w-8xl mx-auto min-h-96"
          style={{ borderColor: '#161616' }}
        >
          {/* Fallback content visible immediately */}
          {!isLoaded && (
            <>
              <h2 className="title-section text-white text-center mb-16">
                {title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
            className={`title-section text-white text-center mb-16 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
          >
            {title}
          </h2>
          
          <div 
            ref={cardsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
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