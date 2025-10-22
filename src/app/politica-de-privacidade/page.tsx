'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PoliticaPrivacidade() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Botão Voltar */}
        <button
          onClick={() => router.push('/')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          VOLTAR
        </button>

      {/* Conteúdo da Política */}
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="space-y-8">
          {/* Título Principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Política de Privacidade
            </h1>
            <p className="text-gray-300 text-lg">
              Vision Company AI
            </p>
          </div>

          {/* Introdução */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              Introdução
            </h2>
            <p className="text-gray-300 leading-relaxed">
              A sua privacidade é importante para nós. É política do Vision Company AI respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://visioncompany.ai" className="text-white hover:text-gray-300 underline">Vision Company AI</a>, e outros sites que possuímos e operamos.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
          </section>

          {/* Coleta e Uso de Dados */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              Coleta e Uso de Dados
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
          </section>

          {/* Sites Externos */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              Sites Externos
            </h2>
            <p className="text-gray-300 leading-relaxed">
              O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas <a href="https://politicaprivacidade.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 underline">políticas de privacidade</a>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </p>
            <p className="text-gray-300 leading-relaxed">
              O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
            </p>
          </section>

          {/* Google AdSense e Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              Google AdSense e Cookies
            </h2>
            <div className="space-y-3">
              <p className="text-gray-300 leading-relaxed">
                O serviço Google AdSense que usamos para veicular publicidade utiliza cookies para oferecer anúncios mais relevantes e limitar a frequência de exibição.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Os cookies de publicidade comportamental foram projetados para garantir anúncios relevantes, rastreando anonimamente seus interesses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Vários parceiros anunciam em nosso nome e os cookies de rastreamento nos permitem creditá-los adequadamente.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Compromisso do Usuário */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              Compromisso do Usuário
            </h2>
            <p className="text-gray-300 leading-relaxed">
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Vision Company AI oferece no site e com caráter enunciativo, mas não limitativo:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-white font-semibold mt-1">A)</span>
                <span>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-semibold mt-1">B)</span>
                <span>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-semibold mt-1">C)</span>
                <span>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Vision Company AI, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas que sejam capazes de causar danos.</span>
              </li>
            </ul>
          </section>

          {/* Informações Adicionais */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-b border-white/30 pb-2">
              Informações Adicionais
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </p>
          </section>

          {/* Data de Vigência */}
          <section className="border-t border-gray-700 pt-6 mt-12">
            <p className="text-gray-400 text-center">
              Esta política é efetiva a partir de <span className="text-white font-semibold">21 de Outubro de 2025</span>
            </p>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}
