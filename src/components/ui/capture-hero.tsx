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
				className="relative min-h-svh w-full overflow-hidden text-white pt-24 pb-16 md:pt-32 md:pb-20"
				style={{ backgroundColor: '#0A0A0A' }}
			>
				{/* WebGL Shader Background */}
				<div className="absolute inset-0 z-0">
					<WebGLShader />
				</div>

				<div 
					className="relative z-10 flex h-full items-center justify-center text-center px-4 sm:px-6"
					style={{ opacity: isLoaded ? 1 : 0 }}
				>
					<div>
						<h1
							ref={h1Ref}
							className="text-heading-1 text-balance"
						>
							De zero a R$ 70.610/mês <br className="md:hidden" />em 12 meses.
						</h1>
						<h2
							ref={h2Ref}
							className="text-heading-3 mx-auto mt-4 max-w-3xl text-white/80 text-balance"
						>
							A 1ª franquia de agência de IA do mundo.
						</h2>
						
						<p
							ref={pRef}
							className="text-body-lg mx-auto mt-6 max-w-3xl text-balance text-white/80"
						>
							Alta margem. Zero equipe fixa. Operação global.
						</p>

						{/* Vídeo do YouTube */}
						<div
							ref={videoPlaceholderRef}
							className="mx-auto mt-8 max-w-4xl aspect-video rounded-xl border border-white/20 overflow-hidden"
						>
							<iframe
								width="100%"
								height="100%"
								src="https://www.youtube.com/embed/_G_qWXk1ntU?controls=1&rel=0"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>

						<div
							ref={ctaRef}
							className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
						>
							<Button 
								size="lg"
								onClick={openModal}
								className="group relative w-[320px] hover:w-[370px] !bg-white hover:!bg-white text-black px-6 py-3 text-base rounded-lg font-medium tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 overflow-hidden"
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
