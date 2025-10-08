'use client';

import React, { useEffect, useRef, useMemo, ReactNode, RefObject, useState } from "react";
import { useGSAP } from "@/lib/gsap-config";

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = false, // DESABILITADO - usar alternativas de performance
  baseOpacity = 0.1,
  baseRotation = 2, // Reduzido para melhor performance
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { gsap, ScrollTrigger } = useGSAP();

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) {
        return <span key={index}>{word}</span>;
      }
      return (
        <span className="inline-block scroll-reveal-word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    // Só executar no cliente após hidratação
    if (!isClient || typeof window === 'undefined') return;
    
    const el = containerRef.current;
    if (!el) return;

    // Aguardar um frame para garantir que o DOM está pronto
    const timeoutId = setTimeout(() => {
      // Limpar triggers anteriores
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];

      const scroller =
        scrollContainerRef && scrollContainerRef.current
          ? scrollContainerRef.current
          : window;

      const wordElements = el.querySelectorAll<HTMLElement>(".scroll-reveal-word");
      
      // Verificar se encontrou elementos
      if (wordElements.length === 0) {
        return; // Removido console.warn para produção
      }

      // Adicionar will-change para otimização
      el.style.willChange = 'transform';
      wordElements.forEach(word => {
        word.style.willChange = 'transform, opacity';
      });

      try {
        // Animação de rotação otimizada
        const rotationTrigger = ScrollTrigger.create({
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: 0.5, // Mais responsivo que 1
          refreshPriority: -1,
          animation: gsap.fromTo(
            el, 
            { 
              transformOrigin: "0% 50%", 
              rotate: baseRotation,
              force3D: true 
            }, 
            { 
              ease: "none", 
              rotate: 0,
              force3D: true 
            }
          )
        });
        triggersRef.current.push(rotationTrigger);

        // OTIMIZADO: ScrollTrigger.batch com alternativas ao blur
         ScrollTrigger.batch(wordElements, {
           onEnter: (elements) => {
             gsap.fromTo(elements, 
               { 
                 opacity: baseOpacity,
                 y: 15, // Reduzido de 20
                 scale: 0.98, // Mais sutil que 0.95
                 rotationX: 8, // Reduzido de 15 - alternativa ao blur
                 force3D: true,
                 transformOrigin: "center center"
               }, 
               { 
                 opacity: 1,
                 y: 0,
                 scale: 1,
                 rotationX: 0,
                 duration: 0.8, // Reduzido de 1.2 para melhor responsividade
                 stagger: 0.02, // Reduzido para melhor performance
                 ease: "power2.out",
                 force3D: true,
                 onComplete: () => {
                    // Remover will-change após animação para liberar recursos
                    elements.forEach(el => {
                      (el as HTMLElement).style.willChange = 'auto';
                    });
                  }
               }
             );
           },
           start: "top bottom-=15%", // Mais conservador
           end: wordAnimationEnd
         });

        // REMOVIDO: Animação de blur (substituída por rotationX acima)

        // Refresh otimizado
        ScrollTrigger.refresh();
        
      } catch {
        // Removido console.error para produção
      }
    }, 50); // Reduzido de 100ms para 50ms

    return () => {
      clearTimeout(timeoutId);
      // Cleanup otimizado
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      
      // Remover will-change
      if (el) {
        el.style.willChange = 'auto';
        const words = el.querySelectorAll('.scroll-reveal-word');
        words.forEach(word => {
          (word as HTMLElement).style.willChange = 'auto';
        });
      }
    };
  }, [
    isClient,
    children,
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    gsap,
    ScrollTrigger,
    containerRef,
  ]);

  // Renderização condicional para evitar problemas de hidratação
  if (!isClient) {
    return (
      <h2 className={`my-5 ${containerClassName}`}>
        <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-medium ${textClassName}`}>
          {children}
        </p>
      </h2>
    );
  }

  return (
    <h2 
      ref={containerRef} 
      className={`my-5 ${containerClassName}`}
      style={{ contain: 'layout style' }} // Otimização CSS
    >
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-medium ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
};