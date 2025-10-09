"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "Preciso de equipe técnica para implementar?",
    answer:
      "Não, você não precisa se preocupar com isso. Cuidamos de toda a implementação e configuração dos agentes inteligentes. Nossa equipe especializada garante que tudo funcione perfeitamente sem que você precise de conhecimento técnico.",
    meta: "Implementação",
  },
  {
    question: "A IA vai substituir meu time?",
    answer:
      "Não, nossa IA não substitui pessoas. Ela libera seu time das tarefas repetitivas e operacionais para que possam focar no que realmente gera valor: estratégia, relacionamento e crescimento do negócio.",
    meta: "Equipe",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Os primeiros resultados aparecem entre 30 e 90 dias. Isso inclui redução de custos operacionais, melhoria na taxa de resposta e aumento na eficiência dos processos. O tempo varia conforme a complexidade do seu negócio.",
    meta: "Resultados",
  },
  {
    question: "Funciona para qualquer segmento?",
    answer:
      "Sim, já aplicamos nossa tecnologia em dezenas de setores diferentes. Nossos agentes inteligentes são desenvolvidos sob medida para cada tipo de negócio, adaptando-se às particularidades do seu mercado e operação.",
    meta: "Segmentos",
  },
];

const palette = {
  surface: "text-neutral-100",
  panel: "bg-neutral-900/50",
  border: "border-white/10",
  heading: "text-white",
  muted: "text-neutral-400",
  iconRing: "border-white/20",
  iconSurface: "bg-white/5",
  icon: "text-white",
  glow: "rgba(255, 255, 255, 0.08)",
  shadow: "shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]",
};

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const setCardGlow = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--faq-x", `${x}%`);
    e.currentTarget.style.setProperty("--faq-y", `${y}%`);
  };

  const clearCardGlow = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.removeProperty("--faq-x");
    e.currentTarget.style.removeProperty("--faq-y");
  };

  return (
    <section className={`relative w-full pt-20 pb-36 transition-colors duration-700 border-b ${palette.surface}`} style={{ backgroundColor: '#0A0A0A', borderColor: '#323232' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <header className="flex flex-col gap-8 mb-16">
            <div className="space-y-4 text-center">
              <div 
                className="inline-flex items-center px-4 py-2 text-feature uppercase border mb-6"
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
                FAQ
              </div>
              <h2 className="text-heading-2 text-white text-center">
                Perguntas Frequentes
              </h2>
              <p className="text-body-lg text-white/70 text-center max-w-2xl mx-auto">
                Respostas para as principais dúvidas sobre implementação e resultados com IA.
              </p>
            </div>
          </header>

          <ul className="space-y-4">
            {faqs.map((item, index) => {
              const open = activeIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-trigger-${index}`;

              return (
                <li
                  key={`faq-${index}`}
                  className={`group relative overflow-hidden rounded-sm border backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5 ${palette.border} ${palette.panel} ${palette.shadow}`}
                  onMouseMove={setCardGlow}
                  onMouseLeave={clearCardGlow}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                      open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                    }}
                  />

                  <button
                    type="button"
                    id={buttonId}
                    aria-controls={panelId}
                    aria-expanded={open}
                    onClick={() => toggleQuestion(index)}
                    className="relative flex w-full items-start gap-6 px-8 py-7 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(255,255,255,0.35)]"
                  >
                    <span
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 ${palette.iconRing} ${palette.iconSurface}`}
                    >
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 ${
                          palette.iconRing
                        } ${open ? "animate-ping" : ""}`}
                      />
                      <svg
                        className={`relative h-5 w-5 transition-transform duration-500 ${palette.icon} ${open ? "rotate-45" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>

                    <div className="flex flex-1 flex-col gap-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <div className={`text-lg font-medium ${palette.heading}`}>
                          {item.question}
                        </div>
                        {item.meta && (
                          <span
                            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto ${palette.border} ${palette.muted}`}
                          >
                            {item.meta}
                          </span>
                        )}
                      </div>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`overflow-hidden leading-relaxed transition-[max-height] duration-500 ease-out ${
                          open ? "max-h-96" : "max-h-0"
                        } ${palette.muted}`}
                      >
                        <div className="pb-4 pt-2">{item.answer}</div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}