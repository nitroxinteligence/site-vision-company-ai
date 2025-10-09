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
			style={{ backgroundColor: "#141414" }}
		>
			{/* WebGL Shader Background */}
			<div className="absolute inset-0 z-0">
				<WebGLShader />
			</div>

			<div className="relative z-10 flex h-svh w-full items-center justify-center px-6 pb-10 md:pb-20">
				<div className="text-center">
					{/* Fallback content visible immediately */}
					{!isLoaded && (
						<>
							<div>
								<h1 className="mx-auto max-w-2xl lg:max-w-6xl text-[clamp(3rem,7vw,5rem)] md:text-[clamp(2.75rem,7vw,5rem)] font-bold md:font-medium leading-[0.95] tracking-tight">
									Sua empresa na Era da IA
								</h1>
							</div>
							<div className="mx-auto mt-4 max-w-2xl md:max-w-2xl text-balance text-base/6 md:text-lg/7 font-medium tracking-tight text-white/70">
								Somos quem tira o peso das suas costas: <br />
								reduz custo, automatiza processos e gera vendas, <br />
								enquanto você curte liberdade com quem ama.
							</div>
							<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
								<div className="border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 text-sm rounded-lg font-medium tracking-wide text-white backdrop-blur-sm">
									Quero uma consultoria
								</div>
								<div className="px-4 py-2 text-sm font-medium tracking-wide text-white/90">
									Conheça nossas soluções
								</div>
							</div>
						</>
					)}

					{/* GSAP animated content */}
					<div className={!isLoaded ? "opacity-0 absolute" : ""}>
						<h1
							ref={h1Ref}
							className="mx-auto max-w-2xl lg:max-w-6xl text-[clamp(3rem,7vw,5rem)] md:text-[clamp(2.75rem,7vw,5rem)] font-bold md:font-medium leading-[0.95] tracking-tight"
						>
							Sua empresa na Era da IA

						</h1>
					</div>

					<p
						ref={pRef}
						className={`mx-auto mt-4 max-w-2xl md:max-w-2xl text-balance text-base/6 md:text-lg/7 font-medium tracking-tight text-white/70 ${
							!isLoaded ? "opacity-0 absolute" : ""
						}`}
					>
						Somos quem tira o peso das suas costas: <br />
						reduz custo, automatiza processos 
						e gera vendas, enquanto você curte
						liberdade com quem ama.
					</p>

					<div
						ref={ctaRef}
						className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 ${
							!isLoaded ? "opacity-0 absolute" : ""
						}`}
					>
						<button
							type="button"
							onClick={() => window.open('https://wa.me/5581992690667', '_blank')}
							className="group relative overflow-hidden border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:from-white/30 hover:to-white/20 transition-all duration-300"
						>
							Quero uma consultoria
						</button>

						<button
							type="button"
							onClick={() => {
								const solucoesSection = document.getElementById("solucoes");
								if (solucoesSection) {
									solucoesSection.scrollIntoView({ behavior: "smooth" });
								}
							}}
							className="group relative px-4 py-2 text-sm font-medium tracking-wide text-white/90 transition-[filter,color] duration-500 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-white cursor-pointer"
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