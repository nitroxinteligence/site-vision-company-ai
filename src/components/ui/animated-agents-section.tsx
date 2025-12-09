"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

export default function AnimatedAgentsSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!badgeRef.current || !h2Ref.current || !cardRef.current || !pRef.current) return;

      // Pequeno delay para garantir que os elementos estejam prontos
      const timer = setTimeout(() => {
        // Divisão do texto em linhas para animação
        const h2Split = new SplitText(h2Ref.current, { type: "lines" });
        const pSplit = new SplitText(pRef.current, { type: "lines" });

        // Mostrar conteúdo imediatamente para evitar flash
        setIsLoaded(true);

      // Estados iniciais dos elementos (invisíveis e deslocados)
      gsap.set(badgeRef.current, {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
      });

      gsap.set(h2Split.lines, {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      });

      gsap.set(cardRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        filter: "blur(6px)",
      });

      gsap.set(pSplit.lines, {
        opacity: 0,
        y: 16,
        filter: "blur(6px)",
      });

      // Timeline principal das animações com ScrollTrigger
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
          markers: false, // Remover em produção
        },
      });

      // Animação do badge
      tl.to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
        },
        0
      )
        // Animação do título (H2)
        .to(
          h2Split.lines,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.3"
        )
        // Animação do card
        .to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
          },
          "-=0.4"
        )
        // Animação do parágrafo dentro do card
        .to(
          pSplit.lines,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.2"
        );

      // Cleanup function
        return () => {
          h2Split?.revert();
          pSplit?.revert();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, 100); // 100ms delay

      return () => {
        clearTimeout(timer);
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full text-white"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center px-4 py-2 text-feature uppercase border mb-6"
            style={{
              backgroundColor: '#0c0c0c',
              borderColor: '#323232',
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, #ffffff, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: isLoaded ? undefined : 1,
            }}
          >
            A nova forma de crescer
          </div>

          {/* Título */}
          <h2
            ref={h2Ref}
            className="title-section text-white text-center max-w-4xl mx-auto"
            style={{
              opacity: isLoaded ? undefined : 1,
              textWrap: 'balance' as const
            }}
          >
            Agentes inteligentes que trabalham por você
          </h2>
        </div>

        {/* Card com padding e margem bem estruturadas */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div
            ref={cardRef}
            className="flex flex-col items-center justify-center max-w-4xl w-full px-6 sm:px-8 md:px-10 py-6 md:py-8 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
            style={{
              backgroundColor: "#141414",
              borderColor: "#323232",
              boxShadow: "inset 30px 30px 60px rgba(255, 255, 255, 0.08)",
              opacity: isLoaded ? undefined : 1,
            }}
          >
            <p
              ref={pRef}
              className="text-description text-white/70 text-center max-w-2xl mx-auto font-medium leading-relaxed"
              style={{
                opacity: isLoaded ? undefined : 1,
                textWrap: 'balance' as const
              }}
            >
              Colocamos a inteligência artificial para assumir tarefas repetitivas, melhorar atendimento e aumentar vendas.
              <br />
              <br />
              Você reduz custos, ganha tempo e escala com qualidade sem precisar aumentar equipe.
            </p>
          </div>
        </div>
      </div>

      {/* Fallback para performance */}
      {!isLoaded && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="text-center mb-12 md:mb-16">
            <div
              className="inline-flex items-center px-4 py-2 text-feature uppercase border mb-6"
              style={{
                backgroundColor: '#0c0c0c',
                borderColor: '#323232',
                borderRadius: '2px',
                background: 'linear-gradient(to bottom, #ffffff, #000000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              A nova forma de crescer
            </div>
            <h2
              className="title-section text-white text-center max-w-4xl mx-auto"
              style={{ textWrap: 'balance' as const }}
            >
              Agentes inteligentes que trabalham por você
            </h2>
          </div>
          <div className="flex justify-center mb-12 md:mb-16">
            <div
              className="flex flex-col items-center justify-center max-w-4xl w-full px-6 sm:px-8 md:px-10 py-6 md:py-8 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
              style={{
                backgroundColor: "#141414",
                borderColor: "#323232",
                boxShadow: "inset 30px 30px 60px rgba(255, 255, 255, 0.08)",
              }}
            >
              <p
                className="text-description text-white/70 text-center max-w-2xl mx-auto font-medium leading-relaxed"
                style={{ textWrap: 'balance' as const }}
              >
                Colocamos a inteligência artificial para assumir tarefas repetitivas, melhorar atendimento e aumentar vendas.
                <br />
                <br />
                Você reduz custos, ganha tempo e escala com qualidade sem precisar aumentar equipe.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}