"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, Target, Calculator } from 'lucide-react';
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

  // Hooks de contagem chamados no nível superior, com gatilho desativado
  const monthlyCounter = useCountUp({ end: 1950, duration: 2000, prefix: 'R$ ', separator: '.', enableScrollTrigger: false });
  const commissionCounter = useCountUp({ end: 30, duration: 1800, suffix: '%', enableScrollTrigger: false });
  const mrrCounter = useCountUp({ end: 38610, duration: 2200, prefix: 'R$ ', separator: '.', enableScrollTrigger: false });
  const revenueCounter = useCountUp({ end: 70610, duration: 2500, prefix: 'R$ ', separator: '.', enableScrollTrigger: false });

  useGSAP(
    () => {
      // Aciona manualmente os contadores quando a seção entra na tela
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        onEnter: () => {
          monthlyCounter.start();
          commissionCounter.start();
          mrrCounter.start();
          revenueCounter.start();
        },
        once: true // Garante que a animação só aconteça uma vez
      });

      const metrics = metricsRef.current ? Array.from(metricsRef.current.children) : [];
      const paybackCards = paybackRef.current ? Array.from(paybackRef.current.children) : [];

      const h2Split = new SplitText(h2Ref.current, { type: "lines" });
      setIsLoaded(true);

      gsap.set(badgeRef.current, { opacity: 0, y: 20, scale: 0.98, rotationX: 5 });
      gsap.set(h2Split.lines, { opacity: 0, y: 24, filter: "blur(8px)" });
      if (metrics.length) gsap.set(metrics, { opacity: 0, y: 24, scale: 0.96, rotationX: 8 });
      if (paybackCards.length) gsap.set(paybackCards, { opacity: 0, y: 24, scale: 0.96, rotationX: 8 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.98 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(badgeRef.current, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.6, ease: "power2.out" })
        .to(h2Split.lines, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.3")
        .to(metrics, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }, "-=0.4")
        .to(paybackCards, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }, "-=0.3")
        .to(ctaRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
    },
    { scope: rootRef }
  );

  return (
    <section 
      ref={rootRef}
      className="relative py-28 overflow-hidden border-t"
      style={{ backgroundColor: 'white', borderColor: '#e5e5e5' }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center mb-8">
          <div 
            ref={badgeRef}
            className={`inline-flex items-center px-4 py-2 text-feature uppercase border ${!isLoaded ? 'opacity-0' : ''}`}
            style={{ 
              backgroundColor: 'white',
              borderColor: '#e5e5e5',
              borderRadius: '2px',
              color: 'black'
            }}
          >
            PROJEÇÃO DE RECEITA
          </div>
        </div>

        <div className="flex items-center justify-center mb-16">
          <h2 
            ref={h2Ref}
            className={`title-responsive-xl text-black text-center ${!isLoaded ? 'opacity-0' : ''}`}
          >
            De 0 à 66 clientes <br />em 12 meses
          </h2>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div 
            ref={metricsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: '#e5e5e5',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#d1d5db',
                  borderRadius: '3px',
                }}
              >
                <DollarSign size={32} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 text-3xl text-black">
                  {monthlyCounter.value}
                </h3>
                <p className="font-medium text-gray-600">
                  Mensalidade por cliente
                </p>
              </div>
            </div>

            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: '#e5e5e5',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#d1d5db',
                  borderRadius: '3px',
                }}
              >
                <TrendingUp size={32} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 text-3xl text-black">
                  {commissionCounter.value}
                </h3>
                <p className="font-medium text-gray-600">
                  Comissão recorrente
                </p>
              </div>
            </div>

            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: '#e5e5e5',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#d1d5db',
                  borderRadius: '3px',
                }}
              >
                <Target size={32} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 text-3xl text-black">
                  {mrrCounter.value}
                </h3>
                <p className="font-medium text-gray-600">
                  MRR no mês 12
                </p>
              </div>
            </div>

            <div 
              className={`flex flex-col items-center justify-center p-8 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: '#e5e5e5',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div 
                className="p-4 border mb-4"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#d1d5db',
                  borderRadius: '3px',
                }}
              >
                <Calculator size={32} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 text-3xl text-black">
                  {revenueCounter.value}
                </h3>
                <p className="font-medium text-gray-600">
                  Faturamento mensal
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <p className="text-black/80 font-medium text-lg italic">
            Obs.: recorrência é o que constrói <br />seu futuro!
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="title-responsive-xl text-black text-center mb-12">
            Payback do investimento
          </h3>
          
          <div 
            ref={paybackRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div 
              className={`flex flex-col items-center justify-center p-10 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: '#e5e5e5',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div 
                className="p-4 border mb-6"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#d1d5db',
                  borderRadius: '3px',
                }}
              >
                <DollarSign size={32} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-2 text-2xl text-black">
                  R$ 50.000
                </h4>
                <p className="font-medium text-gray-600">
                  Investimento (promo)
                </p>
              </div>
            </div>

            <div 
              className={`flex flex-col items-center justify-center p-10 h-64 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: '#e5e5e5',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div 
                className="p-4 border mb-6"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#d1d5db',
                  borderRadius: '3px',
                }}
              >
                <Clock size={32} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-2 text-2xl text-black">
                  4 meses
                </h4>
                <p className="font-medium text-gray-600">
                  Payback com rampa progressiva
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <div ref={ctaRef}>
            <Button 
            size="lg"
            onClick={openModal}
            className="group relative w-[380px] hover:w-[420px] !bg-black hover:!bg-black text-white border border-gray-700 hover:border-gray-600 px-6 py-8 text-base rounded-lg font-medium tracking-wide shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
          >
              <span className="group-hover:mr-6 transition-all duration-500">
                Quero fazer negócio com a Vision AI
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