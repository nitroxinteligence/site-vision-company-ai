"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Users, Cog, CreditCard, TrendingUp } from "lucide-react";
import { useModal } from "@/components/providers/modal-provider";
import { useTranslations } from "@/components/providers/language-provider";

// Registrar plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Componente separado para cada item de benefício
interface BenefitItemProps {
  benefit: string;
  videoUrl: string;
  videoLabel: string;
  videoFallback: string;
}

function BenefitItem({ benefit, videoUrl, videoLabel, videoFallback }: BenefitItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="benefit-item flex flex-col p-10 rounded-2xl border h-full min-h-[400px] relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
      style={{
        backgroundColor: '#141414',
        borderColor: '#323232',
        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Container para vídeo */}
      <div 
        className="w-full h-80 rounded-lg mb-6 overflow-hidden border relative"
        style={{
          backgroundColor: '#202020',
          borderColor: '#3D3D3D'
        }}
        aria-label={`${videoLabel} ${benefit}`}
      >
        <video 
           ref={videoRef}
           className="w-full h-full object-cover"
           style={{ filter: 'grayscale(100%)' }}
           autoPlay
           muted
           loop
           playsInline
           preload="metadata"
         >
           <source src={videoUrl} type="video/mp4" />
           {videoFallback}
         </video>
      </div>
      
      {/* Área de Texto */}
      <div className="text-center flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-white mb-4 font-medium text-2xl">
            {benefit}
          </h4>
        </div>
      </div>
    </div>
  );
}

// Hook personalizado para uma única etapa
function useStepTracking() {
  const { ref, inView } = useInView({
    threshold: 0.6,
    rootMargin: '-20% 0px -20% 0px',
  });

  return { ref, isActive: inView };
}

export default function ComoFuncionaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { openModal } = useModal();
  const copy = useTranslations();
  const howItWorks = copy.home.cpt.howItWorks;
  const videoLabel = howItWorks.benefitVideoLabel;
  const videoFallback = copy.common.videoFallback;
  
  // Criar refs para cada etapa
  const step1 = useStepTracking();
  const step2 = useStepTracking();
  const step3 = useStepTracking();
  const step4 = useStepTracking();
  
  const stepRefs = [step1, step2, step3, step4];
  const timelineIcons = [
    <Users key="users" className="w-6 h-6" />,
    <Cog key="cog" className="w-6 h-6" />,
    <CreditCard key="credit" className="w-6 h-6" />,
    <TrendingUp key="trend" className="w-6 h-6" />,
  ];
  const timelineSteps: TimelineStep[] = howItWorks.steps.map((step, index) => ({
    id: index + 1,
    title: step.title,
    description: step.description,
    icon: timelineIcons[index],
  }));
  const benefits = howItWorks.benefits;

  useGSAP(
    () => {
      const timer = setTimeout(() => {
        if (!titleRef.current || !subtitleRef.current || !timelineRef.current || !benefitsRef.current || !ctaRef.current) return;

        // Inicializar SplitText
        const titleSplit = new SplitText(titleRef.current, { type: "lines" });
        const subtitleSplit = new SplitText(subtitleRef.current, { type: "lines" });

        // Mostrar conteúdo
        setIsLoaded(true);

        // Estados iniciais
        gsap.set(titleSplit.lines, {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        });

        gsap.set(subtitleSplit.lines, {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        });

        gsap.set(".timeline-step", {
          opacity: 0,
          x: -50,
          filter: "blur(8px)",
        });

        gsap.set(".timeline-line", {
          scaleY: 0,
          transformOrigin: "top center",
        });

        gsap.set(".benefit-item", {
          opacity: 0,
          y: 20,
          filter: "blur(5px)",
        });

        gsap.set(ctaRef.current, {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        });

        // Timeline principal
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Animação do título
        tl.to(titleSplit.lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
        })
        // Animação do subtítulo
        .to(subtitleSplit.lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
        }, "-=0.3")
        // Animação da linha da timeline
        .to(".timeline-line", {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
        }, "-=0.2")
        // Animação dos steps da timeline
        .to(".timeline-step", {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.2,
        }, "-=0.8")
        // Animação dos benefícios
        .to(".benefit-item", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.1,
        }, "-=0.4")
        // Animação do CTA
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
        }, "-=0.2");

        // Cleanup
        return () => {
          titleSplit?.revert();
          subtitleSplit?.revert();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full py-20 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >

      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="title-responsive-xl text-white text-center mb-6"
            style={{ opacity: isLoaded ? undefined : 1 }}
          >
            {howItWorks.title}
          </h2>
          <p
            ref={subtitleRef}
            className="text-body-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ opacity: isLoaded ? undefined : 1 }}
          >
            {howItWorks.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mb-20 md:mb-32">
          {/* Linha vertical com gradient branco para preto */}
          <div 
            className="absolute left-6 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 timeline-line"
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #000000)',
            }}
          ></div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {timelineSteps.map((step, index) => {
              const stepRef = stepRefs[index];
              return (
                <div
                  key={step.id}
                  ref={stepRef.ref}
                  className={`timeline-step relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-16`}
                >
                  {/* Círculo do step - menor e com estados ativo/inativo */}
                  <div 
                    className={`absolute left-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base z-10 transition-all duration-300 border-2 ${
                      stepRef.isActive 
                        ? 'bg-white text-black border-white' 
                        : 'text-white border-[#404040]'
                    }`}
                    style={{
                      backgroundColor: stepRef.isActive ? '#ffffff' : '#262626',
                      boxShadow: stepRef.isActive 
                        ? '0 0 20px #ffffff, 0 0 40px rgba(255, 255, 255, 0.5)' 
                        : 'none',
                    }}
                  >
                    {step.id}
                  </div>

                  {/* Conteúdo */}
                  <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  {/* Container Externo com Borda */}
                  <div
                    className="w-full p-2 rounded-3xl border"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: '#141414',
                    }}
                  >
                    {/* Card Principal */}
                    <div
                      className="w-full p-12 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer min-h-80"
                      style={{
                        backgroundColor: '#141414',
                        borderColor: '#323232',
                        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {/* Ícone */}
                      <div
                        className="p-4 border mb-6 inline-flex"
                        style={{
                          backgroundColor: '#202020',
                          borderColor: '#3D3D3D',
                          borderRadius: '3px',
                        }}
                      >
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>

                      {/* Título */}
                      <h3 className="text-2xl font-medium text-white mb-4">
                        {step.title}
                      </h3>

                      {/* Descrição */}
                      <p className="text-base font-medium leading-relaxed text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                  {/* Espaçador para desktop */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              );
            })}
          </div>
          </div>
        </div>

        {/* O que Você Recebe */}
        <div ref={benefitsRef} className="relative text-center mb-16">
          
          <div className="relative z-10">
            <h3 className="title-responsive-xl text-white text-center mb-12">
              {howItWorks.benefitsTitle}
            </h3>

          <div className="grid grid-cols-1 gap-8 mb-12 max-w-sm md:max-w-2xl mx-auto">
            {benefits.map((benefit, index) => {
              const videoUrls = [
                "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/4-4-video-page-capt.mp4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvNC00LXZpZGVvLXBhZ2UtY2FwdC5tcDQubXA0IiwiaWF0IjoxNzU5OTI4NzEzLCJleHAiOjIxMDY4MjQ3MTN9.wBOT4TzvdHLkx-nyUnwcfiS7ZfOnO4hu0wAvPs3sHNE",
                "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/3-3-video-page-capt.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvMy0zLXZpZGVvLXBhZ2UtY2FwdC5tcDQiLCJpYXQiOjE3NTk5Mjg3MzQsImV4cCI6MjEwNjgyNDczNH0.T5X6h08GotxiNGJ4FjTvl9YADYQbk98l4usQiuGOGqE",
                "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/5-5-video-page-capt.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvNS01LXZpZGVvLXBhZ2UtY2FwdC5tcDQiLCJpYXQiOjE3NTk5MjkxMzEsImV4cCI6MjEwNjgyNTEzMX0.cCle9krnKUJFl8EevoTWP_20B0_rHfwaePcG6rZtS3k"
              ];

              return (
                <BenefitItem 
                  key={index}
                  benefit={benefit}
                  videoUrl={videoUrls[index]}
                  videoLabel={videoLabel}
                  videoFallback={videoFallback}
                />
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <div ref={ctaRef}>
            <Button 
            size="lg"
            onClick={openModal}
            className="group relative w-[380px] hover:w-[420px] !bg-white hover:!bg-white text-black px-6 py-8 text-base rounded-lg font-medium tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 overflow-hidden"
          >
              <span className="group-hover:mr-6 transition-all duration-500">
                {howItWorks.cta}
              </span>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
