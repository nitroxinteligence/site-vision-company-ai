"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { DifferentialCard } from "./differential-card";

interface DifferentialData {
  title: string;
  description: string;
  videoUrl: string;
}

interface AnimatedDifferentialSectionProps {
  title: string;
  differentials: DifferentialData[];
}

export const AnimatedDifferentialSection = ({ 
  title, 
  differentials 
}: AnimatedDifferentialSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs para os elementos
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Verificar se todos os refs necessários estão presentes
      if (!titleRef.current || !cardsRef.current) return;

      // Delay inicial para garantir que os elementos estejam prontos
      const timeoutId = setTimeout(() => {
        const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];

        // Divisão do texto em linhas para animação
        const titleSplit = new SplitText(titleRef.current, { type: "lines" });

        // Mostrar conteúdo imediatamente para evitar flash
        setIsLoaded(true);

        // Estados iniciais dos elementos (invisíveis e deslocados)
        gsap.set(titleSplit.lines, {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        });
        
        if (cards.length) {
          gsap.set(cards, { 
            opacity: 0, 
            y: 40,
            filter: "blur(8px)",
            scale: 0.95
          });
        }

        // Timeline principal das animações com ScrollTrigger
        const tl = gsap.timeline({ 
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
            markers: false
          }
        });
        
        // Animação do título
        tl.to(
          titleSplit.lines,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
          },
          0.2, // Delay inicial
        )
        // Animação dos cards
        .to(
          cards, 
          { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            scale: 1,
            duration: 0.8, 
            stagger: 0.15 
          }, 
          "-=0.4" // Sobrepõe com a animação anterior
        );

        // Cleanup
        return () => {
          titleSplit.revert();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full text-white py-20 md:py-32 lg:py-40"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Radial glow de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 15%, transparent 40%)',
          zIndex: 0
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Badge acima do título */}
        <div className="flex items-center justify-center mb-8">
          <div 
            className="px-4 py-2 rounded-sm border text-sm font-medium"
            style={{ 
              backgroundColor: '#0c0c0c',
              borderColor: '#323232',
              borderRadius: '2px',
              background: 'linear-gradient(to right, #ffffff, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            NOSSOS DIFERENCIAIS
          </div>
        </div>
        
        {/* Título centralizado */}
        <div className="flex items-center justify-center mb-16">
          <h2
            ref={titleRef}
            className="title-section text-white text-center text-balance"
            style={{ opacity: isLoaded ? undefined : 1 }}
          >
            Por que Vision AI é diferente
          </h2>
        </div>
        
        {/* Grid de cards com diferenciais */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {differentials.map((differential, index) => (
            <div 
              key={`main-${index}`}
              style={{ opacity: isLoaded ? undefined : 1 }}
            >
              <DifferentialCard 
                title={differential.title}
                description={differential.description}
                videoUrl={differential.videoUrl}
              />
            </div>
          ))}
        </div>

        {/* Fallback para performance */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex items-center justify-center mb-8">
                <div 
                  className="px-4 py-2 rounded-sm border text-sm font-medium"
                  style={{ 
                    backgroundColor: '#0c0c0c',
                    borderColor: '#323232',
                    borderRadius: '2px',
                    background: 'linear-gradient(to right, #ffffff, #000000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  NOSSOS DIFERENCIAIS
                </div>
              </div>
              <div className="flex items-center justify-center mb-16">
                <h2 className="title-section text-white text-center text-balance">
                  {title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {differentials.map((differential, index) => (
                  <DifferentialCard 
                    key={`fallback-${index}`}
                    title={differential.title}
                    description={differential.description}
                    videoUrl={differential.videoUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};