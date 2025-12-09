"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import { WebGLShader } from "./web-gl-shader";

gsap.registerPlugin(SplitText);

export default function InfiniteHero() {
	const rootRef = useRef<HTMLDivElement>(null);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	const h2Ref = useRef<HTMLHeadingElement>(null); // New ref for h2
	const pRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useGSAP(
		() => {
			const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

			const h1Split = new SplitText(h1Ref.current, { type: "lines" });
			const h2Split = new SplitText(h2Ref.current, { type: "lines" }); // Split text for h2
			const pSplit = new SplitText(pRef.current, { type: "lines" });

			// Mostrar conteúdo imediatamente para evitar flash
			setIsLoaded(true);

			gsap.set(h1Split.lines, {
				opacity: 0,
				y: 24,
				filter: "blur(8px)",
			});
			gsap.set(h2Split.lines, {
				// Set initial state for h2
				opacity: 0,
				y: 20,
				filter: "blur(7px)",
			});
			gsap.set(pSplit.lines, {
				opacity: 0,
				y: 16,
				filter: "blur(6px)",
			});
			if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
			tl.to(
				h1Split.lines,
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 0.8,
					stagger: 0.1,
				},
				0.3,
			)
				.to(
					// Animate h2
					h2Split.lines,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.7,
						stagger: 0.09,
					},
					"-=0.6",
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
					"-=0.4",
				)
				.to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.2");

			return () => {
				h1Split.revert();
				h2Split.revert(); // Revert h2 split
				pSplit.revert();
			};
		},
		{ scope: rootRef },
	);

	return (
		<div
			ref={rootRef}
			className="relative h-svh w-full overflow-hidden text-white"
			style={{ backgroundColor: "#0A0A0A" }}
		>
			{/* WebGL Shader Background */}
			<div className="absolute inset-0 z-0">
				<WebGLShader />
			</div>

			<div
				className="relative z-10 flex h-full items-start justify-center text-center px-6 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-36"
				style={{ opacity: isLoaded ? 1 : 0 }}
			>
				<div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-4xl lg:max-w-5xl">
					<h1
						ref={h1Ref}
						className="text-balance px-2 sm:px-4"
						style={{
							fontSize: 'clamp(2.5rem, 7vw + 1rem, 6rem)',
							fontWeight: 500,
							lineHeight: 1.1,
							letterSpacing: '-0.025em',
							marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
						}}
					>
						Sua empresa na Era da IA
					</h1>

					<p
						ref={pRef}
						className="mx-auto mt-6 sm:mt-8 px-4 sm:px-6 max-w-[95%] sm:max-w-2xl text-balance text-white/70"
						style={{
							fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)',
							lineHeight: 1.6
						}}
					>
						Somos quem tira o peso das suas costas: reduz custo, automatiza processos e gera vendas, enquanto você curte liberdade com quem ama.
					</p>

					<div
						ref={ctaRef}
						className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
					>
						<button
							type="button"
							onClick={() => window.open('https://wa.me/5581998132001?text=Olá! Vim pelo Site da VISION AI e gostaria de saber mais sobre as soluções.', '_blank')}
							className="group relative overflow-hidden bg-white py-4 sm:py-5 text-sm sm:text-base rounded-lg font-medium tracking-wide text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] w-full sm:w-[320px] sm:hover:w-[360px] max-w-[360px] flex items-center justify-center"
						>
							<span className="transition-all duration-300 group-hover:mr-6">Quero uma consultoria</span>
							<div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</div>
						</button>

						<button
							type="button"
							onClick={() => {
								const solucoesSection = document.getElementById("solucoes");
								if (solucoesSection) {
									solucoesSection.scrollIntoView({ behavior: "smooth" });
								}
							}}
							className="group relative px-6 py-3 sm:px-4 sm:py-2 text-sm sm:text-base font-medium tracking-wide text-white/90 transition-[filter,color] duration-500 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-white cursor-pointer w-full sm:w-auto max-w-[360px]"
						>
							Conheça nossas soluções
						</button>
					</div>
				</div>
			</div>

			{/* Sombra suave na parte inferior */}
			<div
				className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
				style={{
					background:
						"linear-gradient(to top, rgba(10, 10, 10, 0.6), rgba(10, 10, 10, 0.2), transparent)",
				}}
			></div>
		</div>
	);
}