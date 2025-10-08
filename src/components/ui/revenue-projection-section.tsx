"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/modal-provider";
import { DollarSign, TrendingUp, Clock, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RevenueProjectionSection() {
  const { openModal } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const bulletPointsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bulletPoints = bulletPointsRef.current ? Array.from(bulletPointsRef.current.children) : [];

      // Divisão do texto em linhas para animação
      const h2Split = new SplitText(h2Ref.current, { type: "lines" });
      const introTextSplit = new SplitText(introTextRef.current, { type: "lines" });

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
      };
    },
    { scope: rootRef },
  );

  return (
    <section 
      ref={rootRef}
      className="relative w-full text-white py-20" 
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
        <div className="flex items-center justify-center mb-12">
          <h2 
            ref={h2Ref}
            className={`title-section text-white text-center ${!isLoaded ? 'opacity-0' : ''}`}
          >
            Fature R$ 21.850,00 a partir do 3º mês com receita recorrente!
          </h2>
        </div>

        {/* Título da seção de bullet points */}
        <div className="flex justify-center mb-16">
          <h3 
            ref={introTextRef}
            className={`text-white text-center font-medium text-2xl ${!isLoaded ? 'opacity-0' : ''}`}
          >
            O que esse mercado pode te proporcionar...
          </h3>
        </div>

        {/* Bullet Points - Benefícios Financeiros e de Estilo de Vida */}
        <div className="max-w-6xl mx-auto mb-16">
          <div 
            ref={bulletPointsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
          >
            {/* Bullet Point 1 - Renda Recorrente */}
            <div 
              className={`flex flex-col items-center justify-start p-10 h-80 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
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
                <h3 className="font-medium mb-4" style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: '500' }}>
                  Renda recorrente<br /> e crescente
                </h3>
                <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                  Clientes pagam mensalidades.
                </p>
              </div>
            </div>

            {/* Bullet Point 2 - Escalabilidade */}
            <div 
              className={`flex flex-col items-center justify-start p-10 h-80 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
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
                <TrendingUp size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-4" style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: '500' }}>
                  Escalabilidade<br />sem barreiras
                </h3>
                <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                  Você pode atender empresas no Mundo inteiro, sem sair de casa.
                </p>
              </div>
            </div>

            {/* Bullet Point 3 - Liberdade de Tempo */}
            <div 
              className={`flex flex-col items-center justify-start p-10 h-80 w-full relative rounded-2xl border transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
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
                <h3 className="font-medium mb-4" style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: '500' }}>
                  Liberdade <br />de tempo
                </h3>
                <p className="font-medium leading-relaxed" style={{ fontSize: '16px', color: '#929292' }}>
                  Trabalhe de onde quiser, sem funcionários fixos.
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
              Quero ser pioneiro no mercado de IA
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
              PROJEÇÃO DE RECEITA
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-12">
            <h2 className="title-section text-white text-center">
              O que você ganha quando<br />a IA trabalha por você
            </h2>
          </div>
          
          <div className="flex justify-center mb-16">
            <p className="text-description text-white/70 text-center max-w-4xl mx-auto font-medium leading-relaxed">
              Não é só sobre tecnologia. É sobre transformar sua vida. Quando você tem sistemas inteligentes cuidando do seu negócio, você finalmente consegue o que sempre quis: mais dinheiro, menos trabalho e tempo para viver.
            </p>
          </div>
          
          {/* Fallback bullet points */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4 p-6 rounded-xl border"
                   style={{ backgroundColor: '#141414', borderColor: '#323232' }}>
                <div className="p-3 rounded-lg border"
                     style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <DollarSign size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2" style={{ fontSize: '18px' }}>
                    Renda recorrente previsível
                  </h4>
                  <p className="text-white/70 font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    Sistemas automatizados geram receita 24/7, mesmo quando você está dormindo ou viajando.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 rounded-xl border"
                   style={{ backgroundColor: '#141414', borderColor: '#323232' }}>
                <div className="p-3 rounded-lg border"
                     style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2" style={{ fontSize: '18px' }}>
                    Crescimento sem limite
                  </h4>
                  <p className="text-white/70 font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    Escale para milhões sem contratar mais funcionários ou aumentar sua carga de trabalho.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 rounded-xl border"
                   style={{ backgroundColor: '#141414', borderColor: '#323232' }}>
                <div className="p-3 rounded-lg border"
                     style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2" style={{ fontSize: '18px' }}>
                    Liberdade total de tempo
                  </h4>
                  <p className="text-white/70 font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    Trabalhe quando quiser, de onde quiser. Sua empresa funciona perfeitamente sem você.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 rounded-xl border"
                   style={{ backgroundColor: '#141414', borderColor: '#323232' }}>
                <div className="p-3 rounded-lg border"
                     style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2" style={{ fontSize: '18px' }}>
                    Sonhos finalmente realizáveis
                  </h4>
                  <p className="text-white/70 font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    Aquela viagem, aquela casa, aquele tempo com a família. Tudo se torna possível.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg"
              disabled
              className="border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-6 py-3 text-base rounded-lg font-medium tracking-wide text-white/50 backdrop-blur-sm cursor-not-allowed opacity-50"
            >
              Quero transformar minha vida com IA
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}