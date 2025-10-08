"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

export default function AnimatedAboutSection() {
	const rootRef = useRef<HTMLDivElement>(null);
	const h2Ref = useRef<HTMLHeadingElement>(null);
	const pRef = useRef<HTMLParagraphElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useGSAP(
		() => {
			const h2Split = new SplitText(h2Ref.current, { type: "lines" });
			const pSplit = new SplitText(pRef.current, { type: "lines" });

			// Mostrar conteúdo imediatamente para evitar flash
			setIsLoaded(true);

			gsap.set(h2Split.lines, {
				opacity: 0,
				y: 24,
				filter: "blur(8px)",
			});
			gsap.set(pSplit.lines, {
				opacity: 0,
				y: 16,
				filter: "blur(6px)",
			});
			gsap.set(cardRef.current, { 
				opacity: 0, 
				y: 32,
				scale: 0.95,
				filter: "blur(4px)"
			});

			const tl = gsap.timeline({ 
				defaults: { ease: "power2.out" },
				scrollTrigger: {
					trigger: rootRef.current,
					start: "top 80%",
					end: "bottom 20%",
					toggleActions: "play none none reverse"
				}
			});

			tl.to(
					h2Split.lines,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.8,
						stagger: 0.1,
					},
					0.2,
				)
				.to(
					pSplit.lines,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.6,
						stagger: 0.08,
					},
					"-=0.3",
				)
				.to(cardRef.current, { 
					opacity: 1, 
					y: 0, 
					scale: 1,
					filter: "blur(0px)",
					duration: 0.8 
				}, "-=0.4");

			return () => {
				h2Split.revert();
				pSplit.revert();
			};
		},
		{ scope: rootRef },
	);

	return (
		<section 
			ref={rootRef}
			className="relative w-full text-white pt-0 pb-40" 
			style={{ backgroundColor: '#0a0a0a' }}
		>
			<div className="container mx-auto px-6">
				{/* Fallback content visible immediately */}
				{!isLoaded && (
					<>
						<div className="flex items-center justify-center mb-12">
							<div className="title-section text-white text-center">
								Empresários ajudando<br /> empresários a crescer com IA
							</div>
						</div>
						
						<div className="flex justify-center mb-16">
							<div 
								className="max-w-6xl w-full p-2 rounded-3xl border"
								style={{ 
									backgroundColor: 'transparent',
									borderColor: '#141414'
								}}
							>
								<div 
									className="w-full p-12 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer min-h-80"
									style={{ 
										backgroundColor: '#141414',
										borderColor: '#323232',
										boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
									}}
								>
									<div className="text-center max-w-2xl mx-auto">
										<p className="text-description text-white/70 font-medium leading-7 mb-4 text-balance">
											Vision AI nasceu para resolver o maior dilema do dono de negócio:
										</p>
										<p className="text-white font-medium leading-8 mb-6 text-pretty" style={{ fontSize: '24px' }}>
											Crescer sem se tornar refém do próprio trabalho.
										</p>
										<p className="text-description text-white/70 font-medium leading-7 wrap-break-word text-pretty">
											Combinamos experiência prática de mais de 10 anos escalando empresas reais com a tecnologia de IA mais avançada do mercado, desenvolvida sob medida para cada negócio. Nosso time é especialista em transformar processos complexos em operações leves, lucrativas e escaláveis.
										</p>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{/* GSAP animated content */}
				<div className="flex items-center justify-center mb-12">
					<h2 
						ref={h2Ref}
						className={`title-section text-white text-center ${!isLoaded ? 'opacity-0 absolute' : ''}`}
					>
						Empresários ajudando<br />empresários a crescer com IA
					</h2>
				</div>
				
				<div className="flex justify-center mb-16">
					<div 
						className="max-w-6xl w-full p-2 rounded-3xl border"
						style={{ 
							backgroundColor: 'transparent',
							borderColor: '#141414'
						}}
					>
						<div 
							ref={cardRef}
							className={`w-full p-12 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer min-h-80 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
							style={{ 
								backgroundColor: '#141414',
								borderColor: '#323232',
								boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
							}}
						>
							<div 
								ref={pRef}
								className={`text-center max-w-2xl mx-auto ${!isLoaded ? 'opacity-0 absolute' : ''}`}
							>
								<p className="text-description text-white/70 font-medium leading-7 mb-4 text-balance">
									Vision AI nasceu para resolver o maior dilema do dono de negócio:
								</p>
								<p className="text-white font-semibold leading-8 mb-6 text-pretty" style={{ fontSize: '24px' }}>
									Crescer sem se tornar refém do próprio trabalho.
								</p>
								<p className="text-description text-white/70 font-medium leading-7 wrap-break-word text-pretty">
									Combinamos experiência prática de mais de 10 anos escalando empresas reais com a tecnologia de IA mais avançada do mercado, desenvolvida sob medida para cada negócio. Nosso time é especialista em transformar processos complexos em operações leves, lucrativas e escaláveis.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}