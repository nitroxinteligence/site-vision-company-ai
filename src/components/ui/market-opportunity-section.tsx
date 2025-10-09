"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/modal-provider";

gsap.registerPlugin(ScrollTrigger);

export default function MarketOpportunitySection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const visionAITextRef = useRef<HTMLParagraphElement>(null);
  const bulletPointsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  
  // Refs para os vídeos
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Funções para controlar os vídeos com clique
  const handleVideo1Click = () => {
    if (video1Ref.current) {
      if (video1Ref.current.paused) {
        video1Ref.current.play();
      } else {
        video1Ref.current.pause();
      }
    }
  };

  const handleVideo2Click = () => {
    if (video2Ref.current) {
      if (video2Ref.current.paused) {
        video2Ref.current.play();
      } else {
        video2Ref.current.pause();
      }
    }
  };

  useGSAP(
    () => {
      const bulletPoints = bulletPointsRef.current ? Array.from(bulletPointsRef.current.children) : [];

      // Divisão do texto em linhas para animação
      const h2Split = new SplitText(h2Ref.current, { type: "lines" });
      const introTextSplit = new SplitText(introTextRef.current, { type: "lines" });
      const visionAITextSplit = new SplitText(visionAITextRef.current, { type: "lines" });

      // Mostrar conteúdo imediatamente para evitar flash
      setIsLoaded(true);

      // Estados iniciais dos elementos (invisíveis e deslocados)
      gsap.set(badgeRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.98,
        rotationX: 5,
      });

      gsap.set(h2Split.lines, {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      });

      gsap.set(introTextSplit.lines, {
        opacity: 0,
        y: 16,
        filter: "blur(6px)",
      });

      gsap.set(visionAITextSplit.lines, {
        opacity: 0,
        y: 16,
        filter: "blur(6px)",
      });

      if (bulletPoints.length) {
        gsap.set(bulletPoints, { 
          opacity: 0, 
          y: 24,
          scale: 0.96,
          rotationX: 8,
        });
      }

      gsap.set(ctaRef.current, { 
        opacity: 0, 
        y: 20,
        scale: 0.98,
      });

      // Timeline principal das animações com ScrollTrigger
      const tl = gsap.timeline({ 
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Sequência de animações
      tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.6,
        }, 0.2)
        .to(h2Split.lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
        }, 0.4)
        .to(introTextSplit.lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
        }, "-=0.3")
        .to(visionAITextSplit.lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
        }, "-=0.2")
        .to(bulletPoints, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
        }, "-=0.2")
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
        }, "-=0.2");

      return () => {
        h2Split.revert();
        introTextSplit.revert();
        visionAITextSplit.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section 
      ref={rootRef}
      className="relative w-full text-white py-20 overflow-hidden" 
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Radial glow effect */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div 
            ref={badgeRef}
            className={`inline-flex items-center px-4 py-2 text-feature uppercase border ${!isLoaded ? 'opacity-0' : ''}`}
            style={{ 
              backgroundColor: '#0c0c0c',
              borderColor: '#323232',
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, #ffffff, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            OPORTUNIDADE DE MERCADO
          </div>
        </div>

        {/* Título Principal */}
        <div className="flex items-center justify-center mb-12">
          <h2 
            ref={h2Ref}
            className={`title-section text-white text-center text-balance ${!isLoaded ? 'opacity-0' : ''}`}
          >
            Por que empreender <br className="hidden md:block" />com IA agora?
          </h2>
        </div>

        {/* Texto Introdutório */}
        <div className="flex justify-center mb-12">
          <p 
            ref={introTextRef}
            className={`text-description text-white/70 text-center max-w-4xl mx-auto font-medium leading-relaxed text-balance ${!isLoaded ? 'opacity-0' : ''}`}
          >
            O mercado de Inteligência Artificial deve movimentar mais de US$ 1,8 trilhão até 2030. Grande fatia desse mercado será SUA! Quem entra cedo, colhe os maiores frutos.
          </p>
        </div>

        {/* Seção Vision AI */}
        <div className="flex justify-center mb-16">
          <div 
            className="max-w-5xl w-full p-2 rounded-3xl border"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: '#141414'
            }}
          >
            <div 
              className="w-full p-6 sm:p-8 md:p-12 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="text-center max-w-3xl mx-auto">
                <p 
                  ref={visionAITextRef}
                  className={`text-description text-white/70 font-medium leading-relaxed text-balance ${!isLoaded ? 'opacity-0' : ''}`}
                >
                  A Vision AI é a primeira franquia de agência de IA do mundo. Isso significa que você não está só abrindo um negócio: <br className="hidden md:block" />
                  Você está empreendendo em um setor que ainda está em fase inicial e tem MUITO PRA CRESCER.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bullet Points - Expansão do Mercado */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-white font-semibold text-center mb-12 text-[clamp(1.25rem,4vw,1.5rem)]">
            Um mercado em expansão exponencial
          </h3>
          
          <div 
            ref={bulletPointsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          >
            {/* Card 1 */}
            <div 
              className={`flex flex-col p-6 sm:p-8 md:p-12 w-full relative rounded-2xl border min-h-80 transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Caixa de vídeo */}
              <div 
                className="w-full h-48 sm:h-56 md:h-64 mb-6 rounded-lg border overflow-hidden"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D'
                }}
                onClick={handleVideo1Click}
              >
                <video 
                  ref={video1Ref}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/2-video-page-capt.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvMi12aWRlby1wYWdlLWNhcHQubXA0IiwiaWF0IjoxNzU5OTI3MDE0LCJleHAiOjIxMDY4MjMwMTR9.kgIVGsC-Yhflw4oUHLV3rzLBf-NGdEKMsYqwbTHPWYY" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>

              {/* Conteúdo do card */}
              <div className="flex-1 flex flex-col justify-center text-center">
                <p className="text-card text-white/70 font-medium leading-relaxed">
                  Isso abre espaço para milhares de agências que vão implementar soluções de IA.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className={`flex flex-col p-6 sm:p-8 md:p-12 w-full relative rounded-2xl border min-h-80 transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Caixa de vídeo */}
              <div 
                className="w-full h-48 sm:h-56 md:h-64 mb-6 rounded-lg border overflow-hidden"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D'
                }}
                onClick={handleVideo2Click}
              >
                <video 
                  ref={video2Ref}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/1-video-page-capt.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvMS12aWRlby1wYWdlLWNhcHQubXA0IiwiaWF0IjoxNzU5OTI3MDQyLCJleHAiOjIxMDY4MjMwNDJ9.dzDsTXBAqXCQ86YvGedmkaOSAgdhl6XQ-eJ5atSq4JM" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>

              {/* Conteúdo do card */}
              <div className="flex-1 flex flex-col justify-center text-center">
                <p className="text-card text-white/70 font-medium leading-relaxed">
                  Você, um franqueado VISION AI, entra com vantagem competitiva única: produto pronto, suporte e marca forte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <div ref={ctaRef} className={!isLoaded ? 'opacity-0' : ''}>
            <Button 
              size="lg"
              onClick={openModal}
              className="border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-6 py-3 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-[border-color,background-color,box-shadow] duration-500"
            >
              Quero mais detalhes
            </Button>
          </div>
        </div>
      </div>

      {/* Fallback para performance */}
      {!isLoaded && (
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-8">
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
              OPORTUNIDADE DE MERCADO
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-12">
            <h2 className="title-section text-white text-center">
              A IA está transformando<br />o mundo dos negócios
            </h2>
          </div>
          
          {/* Fallback content aqui */}
        </div>
      )}
    </section>
  );
}