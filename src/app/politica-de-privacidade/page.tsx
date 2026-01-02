'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "@/components/providers/language-provider";

// Metadata movida para layout.tsx ou como generateMetadata em arquivo separado
// pois este componente é 'use client'

export default function PoliticaPrivacidade() {
  const router = useRouter();
  const copy = useTranslations();
  const privacy = copy.home.privacy;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Botão Voltar */}
        <button
          onClick={() => router.push('/')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {privacy.back}
        </button>

      {/* Conteúdo da Política */}
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="space-y-8">
          {/* Título Principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {privacy.title}
            </h1>
            <p className="text-gray-300 text-lg">
              {privacy.subtitle}
            </p>
          </div>

          {/* Introdução */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              {privacy.intro.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {privacy.intro.paragraph1.before}
              <a
                href="https://visioncompany.ai"
                className="text-white hover:text-gray-300 underline"
              >
                {privacy.links.siteLabel}
              </a>
              {privacy.intro.paragraph1.after}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {privacy.intro.paragraph2}
            </p>
          </section>

          {/* Coleta e Uso de Dados */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              {privacy.data.title}
            </h2>
            {privacy.data.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Sites Externos */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              {privacy.external.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {privacy.external.paragraph1.before}
              <a
                href="https://politicaprivacidade.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 underline"
              >
                {privacy.links.privacyPolicies}
              </a>
              {privacy.external.paragraph1.after}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {privacy.external.paragraph2}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {privacy.external.paragraph3}
            </p>
          </section>

          {/* Google AdSense e Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              {privacy.adsense.title}
            </h2>
            <div className="space-y-3">
              {privacy.adsense.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <ul className="space-y-2 text-gray-300">
                {privacy.adsense.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Compromisso do Usuário */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              {privacy.commitment.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {privacy.commitment.intro}
            </p>
            <ul className="space-y-3 text-gray-300">
              {privacy.commitment.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="text-white font-semibold mt-1">{item.label}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Informações Adicionais */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              {privacy.additional.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {privacy.additional.paragraph}
            </p>
          </section>

          {/* Data de Vigência */}
          <section className="border-t border-gray-700 pt-6 mt-12">
            <p className="text-gray-400 text-center">
              {privacy.effective.text}{" "}
              <span className="text-white font-semibold">{privacy.effective.date}</span>
            </p>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}
