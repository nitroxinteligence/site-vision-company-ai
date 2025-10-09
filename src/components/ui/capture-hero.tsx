"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import { WebGLShader } from "./web-gl-shader";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/modal-provider";

gsap.registerPlugin(SplitText);

export default function CaptureHero() {
	const rootRef = useRef<HTMLDivElement>(null);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	const h2Ref = useRef<HTMLHeadingElement>(null); // Ref for the new h2
	const pRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const videoPlaceholderRef = useRef<HTMLDivElement>(null); // Ref for video placeholder
	const [isLoaded, setIsLoaded] = useState(false);
	const { openModal } = useModal();

	useGSAP(
		() => {
			const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

			const h1Split = new SplitText(h1Ref.current, { type: "lines" });
			const h2Split = new SplitText(h2Ref.current, { type: "lines" }); // Split for h2
			const pSplit = new SplitText(pRef.current, { type: "lines" });

			// Mostrar conteúdo imediatamente para evitar flash
			setIsLoaded(true);

			gsap.set(h1Split.lines, {
				opacity: 0,
				y: 24,
				filter: "blur(8px)",
			});
			gsap.set(h2Split.lines, { // Initial state for h2
				opacity: 0,
				y: 20,
				filter: "blur(7px)",
			});
			gsap.set(pSplit.lines, {
				opacity: 0,
				y: 16,
				filter: "blur(6px)",
			});
			if (videoPlaceholderRef.current) gsap.set(videoPlaceholderRef.current, { opacity: 0, y: 16 });
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
					h2Split.lines, // Animate h2
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
				.to(videoPlaceholderRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
				.to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");

			return () => {
				h1Split.revert();
				h2Split.revert();
				pSplit.revert();
			};
		},
		{ scope: rootRef },
	);

	return (
			<div
				ref={rootRef}
				className="relative min-h-svh w-full overflow-hidden text-white pt-20 md:pt-28 pb-16 md:pb-20"
				style={{ backgroundColor: '#141414' }}
			>
				{/* WebGL Shader Background */}
				<div className="absolute inset-0 z-0">
					<WebGLShader />
				</div>

				<div className="relative z-10 flex min-h-full w-full items-center justify-center px-4 sm:px-6">
					<div className="text-center">
						{/* Fallback content visible immediately */}
						{!isLoaded && (
							<>
								<h1 className="mx-auto max-w-4xl lg:max-w-7xl text-[clamp(2.25rem,6vw,4rem)] font-bold md:font-medium leading-[1] tracking-tight text-balance">
									De zero a R$ 70.610/mês <br className="md:hidden" />em 12 meses.
								</h1>
								<h2 className="mx-auto mt-3 max-w-3xl text-[clamp(1.25rem,4vw,1.75rem)] font-medium leading-[1.1] tracking-tight text-white/80 text-balance">
									A 1ª franquia de agência de IA do mundo.
								</h2>
								<div className="mx-auto mt-6 max-w-3xl text-balance text-lg/7 font-medium tracking-tight text-white/80">
									Alta margem. Zero equipe fixa. Operação global.
								</div>
								
								{/* Placeholder para vídeo */}
								<div className="mx-auto mt-8 max-w-2xl aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm flex items-center justify-center group cursor-pointer hover:border-white/30 hover:bg-white/15 transition-all duration-500">
									<div className="flex flex-col items-center justify-center space-y-3">
										<div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
											<svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8 5v14l11-7z"/>
											</svg>
										</div>
										<div className="text-white/70 text-lg font-medium group-hover:text-white/90 transition-colors duration-300">
											Vídeo de Apresentação
										</div>
										<div className="text-white/50 text-sm">
											Clique para assistir
										</div>
									</div>
								</div>
								
								<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
									<Button 
										size="lg"
										onClick={openModal}
										className="border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-6 py-3 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-[border-color,background-color,box-shadow] duration-500"
									>
										Quero fazer negócio com a Vision AI
									</Button>
								</div>
							</>
						)}
						
						{/* GSAP animated content */}
						<div className={!isLoaded ? 'opacity-0 absolute' : ''}>
							<h1
								ref={h1Ref}
								className="mx-auto max-w-4xl lg:max-w-7xl text-[clamp(2.25rem,6vw,4rem)] font-bold md:font-medium leading-[1] tracking-tight text-balance"
							>
								De zero a R$ 70.610/mês <br className="md:hidden" />em 12 meses.
							</h1>
							<h2
								ref={h2Ref}
								className="mx-auto mt-3 max-w-3xl text-[clamp(1.25rem,4vw,1.75rem)] font-medium leading-[1.1] tracking-tight text-white/80 text-balance"
							>
								A 1ª franquia de agência de IA do mundo.
							</h2>
						</div>
						
						<p
							ref={pRef}
							className={`mx-auto mt-6 max-w-3xl text-balance text-lg/7 font-medium tracking-tight text-white/80 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
						>
							Alta margem. Zero equipe fixa. Operação global.
						</p>

						{/* Placeholder para vídeo - versão animada */}
						<div 
							ref={videoPlaceholderRef}
							className={`mx-auto mt-8 max-w-2xl aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm flex items-center justify-center group cursor-pointer hover:border-white/30 hover:bg-white/15 transition-all duration-500 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
							onClick={openModal}
						>
							<div className="flex flex-col items-center justify-center space-y-3">
								<div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
									<svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z"/>
									</svg>
								</div>
								<div className="text-white/70 text-lg font-medium group-hover:text-white/90 transition-colors duration-300">
									Vídeo de Apresentação
								</div>
								<div className="text-white/50 text-sm">
									Clique para assistir
								</div>
							</div>
						</div>

						<div
							ref={ctaRef}
							className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 ${!isLoaded ? 'opacity-0 absolute' : ''}`}
						>
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

				{/* Sombra suave na parte inferior */}
				<div 
					className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
					style={{
						background: 'linear-gradient(to top, rgba(10, 10, 10, 0.6), rgba(10, 10, 10, 0.2), transparent)'
					}}
				></div>
			</div>
		);
}
