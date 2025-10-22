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
  			className="relative w-full text-black py-34 md:py-42" 
  			style={{ 
  				backgroundColor: '#ffffff',
  				borderBottom: '1px solid #e5e5e5'
  			}}
  		>
  			<div 
  				className="container mx-auto px-4 sm:px-6 relative z-10"
  				style={{ opacity: isLoaded ? 1 : 0 }}
  			>
  				{/* Badge acima do título */}
  				<div className="flex justify-center mb-8">
  					<div 
  						ref={badgeRef}
  						className="inline-flex items-center px-4 py-2 text-feature uppercase border"
  						style={{ 
  							backgroundColor: '#f8f8f8',
  							borderColor: '#d1d5db',
  							borderRadius: '6px',
  							color: '#374151'
  						}}
  					>
  						A SUA REALIDADE
  					</div>
  				</div>
  				
  				{/* Título */}
  				<div className="flex items-center justify-center mb-12 md:mb-16">
  					<h2 ref={h2Ref} className="text-heading-2 text-center text-balance">
  						Por que a maioria dos empresários travam?
  					</h2>
  				</div>
  				
  				{/* Grid de cards */}
  				<div 
  					ref={cardsRef}
  					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
  				>
  					{/* Card 1 */}
					<div 
						className="flex flex-col items-center justify-start gap-6 p-6 rounded-2xl border h-auto w-full relative"
						style={{ 
							backgroundColor: '#ffffff',
							borderColor: '#e5e5e5',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
						}}
					>
						<div 
							className="p-3 border"
							style={{
								backgroundColor: '#f8f9fa',
								borderColor: '#d1d5db',
								borderRadius: '5px'
							}}
						>
							<Users size={28} className="text-gray-700" />
						</div>
						<div className="text-center">
							<h3 className="font-medium text-black mb-2 text-balance" style={{ fontSize: '1.5rem' }}>
								Equipes sobrecarregadas
							</h3>
							<p className="text-body-sm font-medium text-gray-600">
								Funcionários fazendo tarefas repetitivas que poderiam ser automatizadas.
							</p>
						</div>
					</div>
  
  					{/* Card 2 */}
					<div 
						className="flex flex-col items-center justify-start gap-6 p-6 rounded-2xl border h-auto w-full relative"
						style={{ 
							backgroundColor: '#ffffff',
							borderColor: '#e5e5e5',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
						}}
					>
						<div 
							className="p-3 border"
							style={{
								backgroundColor: '#f8f9fa',
								borderColor: '#d1d5db',
								borderRadius: '5px'
							}}
						>
							<TrendingUp size={28} className="text-gray-700" />
						</div>
						<div className="text-center">
							<h3 className="font-medium text-black mb-2 text-balance" style={{ fontSize: '1.5rem' }}>
								Crescimento limitado
							</h3>
							<p className="text-body-sm font-medium text-gray-600">
								Receita estagnada porque não consegue escalar sem aumentar custos.
							</p>
						</div>
					</div>
  
  					{/* Card 3 */}
					<div 
						className="flex flex-col items-center justify-start gap-6 p-6 rounded-2xl border h-auto w-full relative"
						style={{ 
							backgroundColor: '#ffffff',
							borderColor: '#e5e5e5',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
						}}
					>
						<div 
							className="p-3 border"
							style={{
								backgroundColor: '#f8f9fa',
								borderColor: '#d1d5db',
								borderRadius: '5px'
							}}
						>
							<Clock size={28} className="text-gray-700" />
						</div>
						<div className="text-center">
							<h3 className="font-medium text-black mb-2 text-balance" style={{ fontSize: '1.5rem' }}>
								Tempo desperdiçado
							</h3>
							<p className="text-body-sm font-medium text-gray-600">
								Horas perdidas em processos manuais que deveriam ser instantâneos.
							</p>
						</div>
					</div>
  
  					{/* Card 4 */}
					<div 
						className="flex flex-col items-center justify-start gap-6 p-6 rounded-2xl border h-auto w-full relative"
						style={{ 
							backgroundColor: '#ffffff',
							borderColor: '#e5e5e5',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
						}}
					>
						<div 
							className="p-3 border"
							style={{
								backgroundColor: '#f8f9fa',
								borderColor: '#d1d5db',
								borderRadius: '5px'
							}}
						>
							<BarChart3 size={28} className="text-gray-700" />
						</div>
						<div className="text-center">
							<h3 className="font-medium text-black mb-2 text-balance" style={{ fontSize: '1.5rem' }}>
								Dados desorganizados
							</h3>
							<p className="text-body-sm font-medium text-gray-600">
								Informações espalhadas que impedem decisões rápidas e precisas.
							</p>
						</div>
					</div>
  				</div>
  			</div>
  		</section>
  	);
  }