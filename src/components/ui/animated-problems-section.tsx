"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Users, TrendingUp, Clock, BarChart3 } from 'lucide-react';

export default function AnimatedProblemsSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];

      // Divisão do texto em linhas para animação
      const h2Split = new SplitText(h2Ref.current, { type: "lines" });

      // Mostrar conteúdo imediatamente para evitar flash
      setIsLoaded(true);

      // Estados iniciais OTIMIZADOS (sem blur para melhor performance)
      gsap.set(badgeRef.current, {
        opacity: 0,
        y: 20, // Reduzido de 24
        scale: 0.98, // Alternativa ao blur
        rotationX: 5, // Alternativa ao blur
      });

      gsap.set(h2Split.lines, {
        opacity: 0,
        y: 20, // Reduzido de 24
        scale: 0.98, // Alternativa ao blur
        rotationX: 5, // Alternativa ao blur
      });

      if (cards.length) {
        gsap.set(cards, { 
          opacity: 0, 
          y: 24, // Reduzido de 32
          scale: 0.96, // Mais sutil que 0.95
          rotationX: 8, // Alternativa ao blur
        });
      }

      // Timeline principal das animações com ScrollTrigger
      const tl = gsap.timeline({ 
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animações OTIMIZADAS (sem blur)
      tl.to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1, // Retorna ao normal
            rotationX: 0, // Retorna ao normal
            duration: 0.6,
          },
          0.2, // Delay inicial
        )
        // Animação do título (H2)
        .to(
          h2Split.lines,
          {
            opacity: 1,
            y: 0,
            scale: 1, // Retorna ao normal
            rotationX: 0, // Retorna ao normal
            duration: 0.8,
            stagger: 0.08, // Reduzido de 0.1 para melhor performance
          },
          "-=0.3", // Sobrepõe com a animação anterior
        )
        // Animação dos cards
        .to(
          cards, 
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotationX: 0, // Retorna ao normal
            duration: 0.8, 
            stagger: 0.08 // Reduzido de 0.1 para melhor performance
          }, 
          "-=0.4"
        );

      // Cleanup
      return () => {
        h2Split.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section 
      ref={rootRef}
      className="relative w-full text-white pt-0 pb-40" 
      style={{ 
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid #323232'
      }}
    >
      {/* Radial glow na parte inferior */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 15%, transparent 100%)',
          width: '60%',
          height: '90%',
          zIndex: 0
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Badge acima do título */}
        <div className="flex justify-center mb-6">
          <div 
            ref={badgeRef}
            className="inline-flex items-center px-4 py-2 text-feature uppercase border"
            style={{ 
              backgroundColor: '#0c0c0c',
              borderColor: '#323232',
              borderRadius: '6px',
              background: 'linear-gradient(to bottom, #ffffff, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            A SUA REALIDADE
          </div>
        </div>
        
        {/* Título centralizado verticalmente na seção */}
        <div className="flex items-center justify-center mb-16">
          <h2 ref={h2Ref} className="title-section text-white text-center">
            Por que a maioria <br />dos empresários travam?
          </h2>
        </div>
        
        {/* Grid de cards com ícones */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-8xl mx-auto"
        >
          {/* Card 1: Equipes sobrecarregadas */}
          <div 
            className="flex flex-col items-center justify-between p-10 rounded-2xl border h-96 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
            style={{ 
              backgroundColor: '#141414',
              borderColor: '#323232',
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
            }}
          >
            <div 
              className="p-4 border"
              style={{
                backgroundColor: '#202020',
                borderColor: '#3D3D3D',
                borderRadius: '5px'
              }}
            >
              <Users size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white mb-4" style={{ fontSize: '24px' }}>
                Equipes sobrecarregadas
              </h3>
              <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                Funcionários fazendo tarefas repetitivas que poderiam ser automatizadas
              </p>
            </div>
          </div>

          {/* Card 2: Custos crescentes */}
          <div 
            className="flex flex-col items-center justify-between p-10 rounded-2xl border h-96 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
            style={{ 
              backgroundColor: '#141414',
              borderColor: '#323232',
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
            }}
          >
            <div 
              className="p-4 border"
              style={{
                backgroundColor: '#202020',
                borderColor: '#3D3D3D',
                borderRadius: '5px'
              }}
            >
              <TrendingUp size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white mb-4" style={{ fontSize: '24px' }}>
                Crescimento <br />limitado
              </h3>
              <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                Receita estagnada porque não consegue escalar sem aumentar custos
              </p>
            </div>
          </div>

          {/* Card 3: Falta de tempo */}
          <div 
            className="flex flex-col items-center justify-between p-10 rounded-2xl border h-96 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
            style={{ 
              backgroundColor: '#141414',
              borderColor: '#323232',
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
            }}
          >
            <div 
              className="p-4 border"
              style={{
                backgroundColor: '#202020',
                borderColor: '#3D3D3D',
                borderRadius: '5px'
              }}
            >
              <Clock size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white mb-4" style={{ fontSize: '24px' }}>
                Tempo <br />desperdiçado
              </h3>
              <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                Horas perdidas em processos manuais que deveriam ser instantâneos
              </p>
            </div>
          </div>

          {/* Card 4: Dificuldade em escalar */}
          <div 
            className="flex flex-col items-center justify-between p-10 rounded-2xl border h-96 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
            style={{ 
              backgroundColor: '#141414',
              borderColor: '#323232',
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
            }}
          >
            <div 
              className="p-4 border"
              style={{
                backgroundColor: '#202020',
                borderColor: '#3D3D3D',
                borderRadius: '5px'
              }}
            >
              <BarChart3 size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white mb-4" style={{ fontSize: '24px' }}>
                Dados <br />desorganizados
              </h3>
              <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                Informações espalhadas que impedem decisões rápidas e precisas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback para performance */}
      {!isLoaded && (
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 text-feature uppercase border"
                 style={{ 
                   backgroundColor: '#0c0c0c',
                   borderColor: '#323232',
                   borderRadius: '2px',
                   background: 'linear-gradient(to bottom, #ffffff, #000000)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   backgroundClip: 'text'
                 }}>
              A SUA REALIDADE
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-16">
            <h2 className="title-section text-white text-center">
              Por que a maioria <br />dos empresários travam?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-8xl mx-auto">
            {/* Cards de fallback aqui */}
          </div>
        </div>
      )}
    </section>
  );
}