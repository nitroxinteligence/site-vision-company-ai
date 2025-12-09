"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
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
			className="relative w-full text-white py-16 md:py-24"
			style={{ backgroundColor: '#0a0a0a' }}
		>
			<div
				className="container mx-auto px-4 sm:px-6 md:px-8"
				style={{ opacity: isLoaded ? 1 : 0 }}
			>
				<div className="flex items-center justify-center mb-12">
					<h2
						ref={h2Ref}
						className="text-heading-2 text-center"
						style={{
							hyphens: 'none',
							WebkitHyphens: 'none',
							textWrap: 'balance',
							lineHeight: '1.3'
						} as React.CSSProperties}
					>
						Empresários ajudando empresários a crescer com IA
					</h2>
				</div>
				
				<div className="flex justify-center">
					<div 
						className="max-w-6xl w-full p-1 sm:p-2 rounded-3xl border"
						style={{ 
							backgroundColor: 'transparent',
							borderColor: '#141414'
						}}
					>
						<div
							ref={cardRef}
							className="w-full p-6 sm:p-8 md:p-12 rounded-2xl border relative min-h-[20rem]"
							style={{
								backgroundColor: '#141414',
								borderColor: '#323232',
								boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
								hyphens: 'none',
								WebkitHyphens: 'none'
							}}
						>
							<div
								ref={pRef}
								className="text-center max-w-3xl mx-auto"
							>
								<p
									className="text-body-md text-white/70 mb-4"
									style={{
										hyphens: 'none',
										WebkitHyphens: 'none',
										lineHeight: '1.6'
									}}
								>
									Vision AI nasceu para resolver o maior dilema do dono de negócio:
								</p>
								<p
									className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold mb-6"
									style={{
										lineHeight: '0.0',
										hyphens: 'none',
										WebkitHyphens: 'none',
										textWrap: 'balance',
										whiteSpace: 'normal'
									} as React.CSSProperties}
								>
									Crescer sem se tornar refém do próprio trabalho.
								</p>
								<p
									className="text-body-md text-white/70"
									style={{
										hyphens: 'none',
										WebkitHyphens: 'none',
										lineHeight: '1.6',
										textWrap: 'pretty'
									} as React.CSSProperties}
								>
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