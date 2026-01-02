"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@/lib/gsap-config";

interface ScrollSection {
  title: string;
  subtitle?: string;
}

interface ScrollSectionsProps {
  sections: ReadonlyArray<ScrollSection>;
  className?: string;
}

export default function ScrollSections({ sections, className = "" }: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  const { gsap, ScrollTrigger } = useGSAP();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (sectionsRef.current.length !== sections.length) return;
    if (sectionsRef.current.some((section) => !section)) return;

    const container = containerRef.current;
    const sectionElements = sectionsRef.current.slice();
    if (sectionElements.length < 3) return;
    if (sectionElements.some((section) => !section)) return;
    const resolvedSections = sectionElements as HTMLDivElement[];
    const scrollDistance = Math.max(1, resolvedSections.length - 1) * 100;

    // Adicionar will-change para otimização de hardware
    resolvedSections.forEach(section => {
      section.style.willChange = 'transform, opacity';
    });

    // Criar timeline principal com configurações otimizadas
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: `+=${scrollDistance}%`, // Reduzido de 400% para 200% - menos cálculos
        scrub: 0.5, // Reduzido de 1 para 0.5 - mais responsivo
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1, // Otimização de refresh
        markers: false,
      }
    });

    // Configurar estado inicial - substituindo blur por alternativas mais leves
    resolvedSections.forEach((section, index) => {
      if (index === 0) {
        gsap.set(section, { 
          opacity: 1, 
          scale: 1, 
          rotationX: 0,
          z: 0,
          force3D: true // Forçar aceleração de hardware
        });
      } else {
        gsap.set(section, { 
          opacity: 0, 
          scale: 0.85, 
          rotationX: 15, // Substitui blur por perspectiva 3D
          z: -100,
          force3D: true
        });
      }
    });

    // Preparar palavras de todas as seções
    const allSectionWords = resolvedSections.map(section => 
      section.querySelectorAll('.word')
    );

    // Configurar estado inicial das palavras - sem blur
    allSectionWords.forEach((words, index) => {
      if (index === 0) {
        gsap.set(words, { 
          opacity: 0, 
          y: 30, 
          scale: 0.9,
          rotationX: 10,
          force3D: true
        });
      } else {
        gsap.set(words, { 
          opacity: 0, 
          y: 30, 
          scale: 0.9,
          rotationX: 10,
          force3D: true
        });
      }
    });

    // Adicionar animações ao timeline - otimizadas sem blur
    tl.addLabel("start")
      // Seção 1: Animar palavras aparecendo
      .to(allSectionWords[0], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 2.5, // Reduzido de 3 para 2.5
        stagger: 0.1, // Reduzido de 0.15 para 0.1
        ease: "power2.out",
        force3D: true
      })
      .addLabel("section1-complete")
      
      // Pausa entre seções reduzida
      .to({}, { duration: 0.3 })
      
      // Transição para seção 2 - sem blur
      .to(resolvedSections[0], {
        opacity: 0,
        scale: 0.9,
        rotationX: -15, // Substitui blur por rotação 3D
        z: -50,
        duration: 1.2, // Reduzido de 1.5 para 1.2
        ease: "power2.inOut",
        force3D: true
      })
      .to(resolvedSections[1], {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        z: 0,
        duration: 1.2,
        ease: "power2.inOut",
        force3D: true
      }, "<0.2") // Reduzido overlap
      .addLabel("section2-start")

      // Seção 2: Animar palavras
      .to(allSectionWords[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 2.5,
        stagger: 0.1,
        ease: "power2.out",
        force3D: true
      })
      .addLabel("section2-complete")
      
      // Pausa entre seções reduzida
      .to({}, { duration: 0.3 })
      
      // Transição para seção 3 - sem blur
      .to(resolvedSections[1], {
        opacity: 0,
        scale: 0.9,
        rotationX: -15,
        z: -50,
        duration: 1.2,
        ease: "power2.inOut",
        force3D: true
      })
      .to(resolvedSections[2], {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        z: 0,
        duration: 1.2,
        ease: "power2.inOut",
        force3D: true
      }, "<0.2")
      .addLabel("section3-start")

      // Seção 3: Animar palavras
      .to(allSectionWords[2], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 2.5,
        stagger: 0.1,
        ease: "power2.out",
        force3D: true
      })
      .addLabel("end");

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    // Cleanup
    return () => {
      cancelAnimationFrame(refreshId);
      tl.scrollTrigger?.kill();
      tl.kill();
      resolvedSections.forEach(section => {
        section.style.willChange = "";
      });
    };
  }, [sections, gsap, ScrollTrigger]);

  // Função para dividir texto em palavras
  const splitTextIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={`word-${word}-${index}`} className="word inline-block">
        {word}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: '#0A0A0A', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0 }}
    >
      {sections.map((section, index) => (
        <div
          key={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}-${index}`}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 ${
            index === 0 ? 'pt-0' : ''
          } ${
            index === 2 ? 'pb-0' : ''
          }`}
        >
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="mx-auto max-w-2xl lg:max-w-4xl text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.1] tracking-tight text-center text-white mb-4 w-full">
              <div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2">
                {splitTextIntoWords(section.title)}
              </div>
            </h2>
            {section.subtitle && (
              <p className="mx-auto max-w-2xl md:text-balance text-sm/6 md:text-base/7 font-medium tracking-tight text-white/70 text-center w-full">
                <div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2">
                  {splitTextIntoWords(section.subtitle)}
                </div>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
