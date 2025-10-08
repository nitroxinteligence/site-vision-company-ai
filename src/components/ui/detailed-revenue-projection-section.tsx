"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, Target, Calculator, ArrowRight } from 'lucide-react';
import { useCountUp } from "@/hooks/useCountUp";
import { useModal } from "@/components/providers/modal-provider";

gsap.registerPlugin(ScrollTrigger);

export default function DetailedRevenueProjectionSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const paybackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  
  // Refs específicos para os elementos de contagem
  const monthlyRef = useRef<HTMLHeadingElement>(null);
  const commissionRef = useRef<HTMLHeadingElement>(null);
  const mrrRef = useRef<HTMLHeadingElement>(null);
  const revenueRef = useRef<HTMLHeadingElement>(null);

  // Hooks de contagem para os números dos cards
  const monthlyValue = useCountUp({ 
    end: 1950, 
    duration: 2000, 
    prefix: 'R$ ', 
    separator: '.',
    threshold: 0.3,
    enableScrollTrigger: true,
    scrollTriggerElement: rootRef
  });
  
  const commissionValue = useCountUp({ 
    end: 30, 
    duration: 1800, 
    suffix: '%',
    threshold: 0.3,
    enableScrollTrigger: true,
    scrollTriggerElement: rootRef
  });
  
  const mrrValue = useCountUp({ 
    end: 38610, 
    duration: 2200, 
    prefix: 'R$ ', 
    separator: '.',
    threshold: 0.3,
    enableScrollTrigger: true,
    scrollTriggerElement: rootRef
  });
  
  const revenueValue = useCountUp({ 
    end: 70610, 
    duration: 2500, 
    prefix: 'R$ ', 
    separator: '.',
    threshold: 0.3,
    enableScrollTrigger: true,
    scrollTriggerElement: rootRef
  });

  useGSAP(
    () => {
      const metrics = metricsRef.current ? Array.from(metricsRef.current.children) : [];
      const paybackCards = paybackRef.current ? Array.from(paybackRef.current.children) : [];

      // Divisão do texto em linhas para animação
      const h2Split = new SplitText(h2Ref.current, { type: "lines" });

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

      if (metrics.length) {
        gsap.set(metrics, { 
          opacity: 0, 
          y: 24,
          scale: 0.96,
          rotationX: 8,
        });
      }

      if (paybackCards.length) {
        gsap.set(paybackCards, { 
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



      // Timeline de animação
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Sequência de animações
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(h2Split.lines, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3")
      .to(metrics, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.4")
      .to(paybackCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.2")

    },
    { scope: rootRef }
  );



  return (
    <section 
      ref={rootRef}
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: '#0c0c0c' }}
    >
      {/* Radial glow de fundo */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
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
            PROJEÇÃO DE RECEITA
          </div>
        </div>

        {/* Título Principal */}
        <div className="flex items-center justify-center mb-16">
          <h2 
            ref={h2Ref}
            className={`title-section text-white text-center ${!isLoaded ? 'opacity-0' : ''}`}
          >
            De 0 à 66 clientes em 12 meses
          </h2>
        </div>

        {/* Métricas de Receita */}
        <div className="max-w-6xl mx-auto mb-16">
          <div 
            ref={metricsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Mensalidade */}
            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  borderRadius: '3px',
                }}
              >
                <DollarSign size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h3 ref={monthlyRef} className="font-bold mb-2 text-3xl text-white">
                  {monthlyValue.value}
                </h3>
                <p className="font-medium text-white/70">
                  Mensalidade por cliente
                </p>
              </div>
            </div>

            {/* Comissão */}
            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  borderRadius: '3px',
                }}
              >
                <TrendingUp size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h3 ref={commissionRef} className="font-bold mb-2 text-3xl text-white">
                  {commissionValue.value}
                </h3>
                <p className="font-medium text-white/70">
                  Comissão recorrente
                </p>
              </div>
            </div>

            {/* MRR */}
            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  borderRadius: '3px',
                }}
              >
                <Target size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h3 ref={mrrRef} className="font-bold mb-2 text-3xl text-white">
                  {mrrValue.value}
                </h3>
                <p className="font-medium text-white/70">
                  MRR no mês 12
                </p>
              </div>
            </div>

            {/* Faturamento Total */}
            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  borderRadius: '3px',
                }}
              >
                <Calculator size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h3 ref={revenueRef} className="font-bold mb-2 text-3xl text-white">
                  {revenueValue.value}
                </h3>
                <p className="font-medium text-white/70">
                  Faturamento mensal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Observação sobre recorrência */}
        <div className="text-center mb-16">
          <p className="text-white/80 font-medium text-lg italic">
            Obs.: recorrência é o que constrói seu futuro!
          </p>
        </div>

        {/* Payback & ROI */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-white text-center font-semibold text-3xl mb-12">
            Payback & ROI
          </h3>
          
          <div 
            ref={paybackRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Investimento */}
            <div 
              className={`flex flex-col items-center justify-center p-10 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              <div 
                className="p-4 border mb-6"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  borderRadius: '3px',
                }}
              >
                <DollarSign size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-2 text-2xl text-white">
                  R$ 50.000
                </h4>
                <p className="font-medium text-white/70">
                  Investimento (promo)
                </p>
              </div>
            </div>

            {/* Payback */}
            <div 
              className={`flex flex-col items-center justify-center p-10 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              }}
            >
              <div 
                className="p-4 border mb-6"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  borderRadius: '3px',
                }}
              >
                <Clock size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-2 text-2xl text-white">
                  4 meses
                </h4>
                <p className="font-medium text-white/70">
                  Payback com rampa progressiva
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <div ref={ctaRef}>
            <Button
              size="lg"
              onClick={openModal}
              className="border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-6 py-3 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-[border-color,background-color,box-shadow] duration-500"
            >
              Quero fazer negócio com a Vision AI
            </Button>
          </div>
        </div>


      </div>
    </section>
  );
}