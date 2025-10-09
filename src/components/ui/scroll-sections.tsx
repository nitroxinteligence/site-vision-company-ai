"use client";

import React, { useEffect, useRef } from "react";
import { useGSAP } from "@/lib/gsap-config";

interface ScrollSectionsProps {
  sections: {
    title: string;
    subtitle?: string;
  }[];
  className?: string;
}

export default function ScrollSections({ sections, className = "" }: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const { gsap, ScrollTrigger } = useGSAP();

  useEffect(() => {
    if (!containerRef.current || sectionsRef.current.length === 0) return;

    const container = containerRef.current;
    const sectionElements = sectionsRef.current.filter(Boolean);

    if (sectionElements.length === 0) return;

    // Adicionar will-change para otimização de hardware
    sectionElements.forEach(section => {
      section.style.willChange = 'transform, opacity';
    });

    // Criar timeline principal com configurações otimizadas
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        markers: false,
      }
    });

    // Configurar estado inicial - substituindo blur por alternativas mais leves
    sectionElements.forEach((section, index) => {
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
    const allSectionWords = sectionElements.map(section => 
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
      .to(sectionElements[0], {
        opacity: 0,
        scale: 0.9,
        rotationX: -15, // Substitui blur por rotação 3D
        z: -50,
        duration: 1.2, // Reduzido de 1.5 para 1.2
        ease: "power2.inOut",
        force3D: true
      })
      .to(sectionElements[1], {
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
      .to(sectionElements[1], {
        opacity: 0,
        scale: 0.9,
        rotationX: -15,
        z: -50,
        duration: 1.2,
        ease: "power2.inOut",
        force3D: true
      })
      .to(sectionElements[2], {
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

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sections, gsap, ScrollTrigger]);

  // Função para dividir texto em palavras
  const splitTextIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block mr-2">
        {word}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-auto py-40 flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: '#0A0A0A', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0 }}
    >
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 ${
            index === 0 ? 'pt-0' : ''
          } ${
            index === 2 ? 'pb-0' : ''
          }`}
        >
          <h2 className="mx-auto max-w-2xl lg:max-w-4xl text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[0.95] tracking-tight text-center text-white mb-4">
            {splitTextIntoWords(section.title)}
          </h2>
          {section.subtitle && (
            <p className="mx-auto max-w-2xl md:text-balance text-sm/6 md:text-base/7 font-medium tracking-tight text-white/70 text-center">
              {splitTextIntoWords(section.subtitle)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}