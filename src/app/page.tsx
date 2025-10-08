import InfiniteHero from "@/components/ui/infinite-hero";
import ScrollSections from "@/components/ui/scroll-sections";
import { MinimalistTextEffect } from "@/components/ui/reveal-text";
import AnimatedAboutSection from "@/components/ui/animated-about-section";
import AnimatedProblemsSection from "@/components/ui/animated-problems-section";
import AnimatedAgentsSection from "@/components/ui/animated-agents-section";
import { Timeline } from "@/components/ui/timeline";
import { AgentFeatures } from "@/components/ui/agent-features";
import { AnimatedDifferentialSection } from "@/components/ui/animated-differential-section";
import { AnimatedAIWorkSection } from "@/components/ui/animated-ai-work-section";
import { ProfileCard } from "@/components/ui/profile-card";
import FAQAccordion from "@/components/ui/faq-accordion";
import ContactSection from "@/components/ui/contact-section";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ContactModal } from "@/components/ui/contact-modal";

export default function Home() {
  const scrollSections = [
    {
      title: "O problema não é você.",
    },
    {
      title: "É o modelo de gestão ultrapassado.",
    },
    {
      title: "E é aqui que a Vision AI entra.",
    }
  ];

  return (
    <ModalProvider>
      <main>
      <InfiniteHero />
      
      {/* Componente MinimalistTextEffect acima da seção 2 */}
      <section className="relative w-full text-white pt-0 pb-0" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="container mx-auto px-6 h-48 md:h-96">
          <MinimalistTextEffect text="VISION AI" duration={0.4} />
        </div>
      </section>
      
      {/* SEÇÃO 2. SOBRE */}
      <div id="sobre">
        <AnimatedAboutSection />
      </div>

      {/* SEÇÃO 3. POR QUE A MAIORIA DOS EMPRESÁRIOS TRAVA */}
      <AnimatedProblemsSection />

      {/* Scroll Sections with Fixed Effect */}
      <ScrollSections sections={scrollSections} />

      {/* SEÇÃO 4. A NOVA FORMA DE CRESCER */}
      <div id="solucoes">
        <AnimatedAgentsSection />
      </div>

      {/* Timeline Section */}
      <section className="relative w-full text-white min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        {/* Radial glow na lateral direita */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at right center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 15%, transparent 40%)',
            width: '50%',
            height: '100%',
            zIndex: 0
          }}
        />
        
        <Timeline data={[
          {
            title: "Agente de SDR",
            content: (
              <AgentFeatures 
                description="Concierge digital que qualifica e agenda em minutos."
                features={[
                  "Disponível 24/7",
                  "Capacidade ilimitada", 
                  "Qualificação inteligente",
                  "Follow-ups que convertem",
                  "Gestão no CRM"
                ]}
                layout="single"
                imageUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/1-1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvMS0xLnBuZyIsImlhdCI6MTc1OTg4NzcwMiwiZXhwIjoyMDc1MjQ3NzAyfQ.bEGwTlp2n7Ae0KX03ETInXIpYQOO20otSbqtB5ZZMn0"
              />
            ),
          },
          {
            title: "Agente de CS",
            content: (
              <AgentFeatures 
                description="Suporte que supera expectativas e reduz churn."
                features={[
                  "Base de conhecimento viva",
                  "Respostas a áudio em tempo real",
                  "Conteúdo personalizado",
                  "Alertas de risco",
                  "Playbooks por persona"
                ]}
                layout="single"
                imageUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/2-2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvMi0yLnBuZyIsImlhdCI6MTc1OTg4NzgxMiwiZXhwIjoyMTA2NzgzODEyfQ.juIXttU0hNT1jgfNTRf2FS2Z5S3GHE_coqpqAt7iqaw"
              />
            ),
          },
          {
            title: "Agente Closer",
            content: (
              <AgentFeatures 
                description="Vendedor incansável que transforma interesse em receita."
                features={[
                  "Propostas sob medida",
                  "Urgência e lembretes",
                  "Integração com gateway",
                  "Upsell e cross-sell",
                  "Relatórios de conversão"
                ]}
                layout="single"
                imageUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/3-3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvMy0zLnBuZyIsImlhdCI6MTc1OTg4NzgyMiwiZXhwIjoyMTA2NzgzODIyfQ.tQUo3PyU3HNXytaFvNkVKDWLeEUT8fm_MVPsXfNOzNQ"
              />
            ),
          },
          {
            title: "Agente Financeiro",
            content: (
              <AgentFeatures 
                description="Seu CFO digital que cuida de números enquanto você foca em crescer."
                features={[
                  "Controle automático de fluxo de caixa",
                  "Projeções de faturamento e lucro em tempo real",
                  "Alertas de inadimplência e cobranças inteligentes",
                  "Relatórios financeiros claros e acionáveis",
                  "Integração com ERP, banco e CRM"
                ]}
                layout="single"
                imageUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/4-4.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvNC00LnBuZyIsImlhdCI6MTc1OTg4NzgzMiwiZXhwIjoyMTA2NzgzODMyfQ.yRlNc6aecfJBeZFH4XQbKgdmsh6HNp5Wjm_NX7T5vgA"
              />
            ),
          },
          {
            title: "Agente de Gestão de Dados",
            content: (
              <AgentFeatures 
                description="O cérebro que transforma dados em decisões estratégicas."
                features={[
                  "Consolidação de múltiplas fontes em um só painel",
                  "Relatórios de performance em tempo real",
                  "Alertas de tendências e riscos no negócio",
                  "Visualização inteligente para decisões rápidas",
                  "Insights preditivos com IA para planejamento de escala"
                ]}
                layout="single"
                imageUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/5-5.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvNS01LnBuZyIsImlhdCI6MTc1OTg4Nzg0MCwiZXhwIjoyMTA2NzgzODQwfQ.4MbHjrbfBVv3qc5zRDyxVDC9MqUJ_Qv9X6GrPwDFoTw"
              />
            ),
          },
        ]} />
      </section>

      {/* SEÇÃO 6. POR QUE VISION AI É DIFERENTE */}
      <div id="diferenciais">
        <AnimatedDifferentialSection 
        title="Por que Vision AI é diferente"
        differentials={[
          {
            title: "Time com pele em jogo",
            description: "Empreendedores que já escalaram empresas reais.",
            videoUrl: "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/video-time-com-pele-em-jogo.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvdmlkZW8tdGltZS1jb20tcGVsZS1lbS1qb2dvLm1wNCIsImlhdCI6MTc1OTg3NjIzOCwiZXhwIjoyMDc1MjM2MjM4fQ.YBfokQnUbEinTtODWc8CODfX1bV3OruPgC1PkvNY9k4"
          },
          {
            title: "Tecnologia proprietária",
            description: "Construída e testada em múltiplos setores.",
            videoUrl: "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/video-tecnologia-proprietaria-2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvdmlkZW8tdGVjbm9sb2dpYS1wcm9wcmlldGFyaWEtMi5tcDQiLCJpYXQiOjE3NTk4NzY0ODgsImV4cCI6MjA3NTIzNjQ4OH0.hTtzFtqfUixy0mhfcKhNoV-G-ItZvmQx9Ur4kSIoc1k"
          },
          {
            title: "Implementação assistida",
            description: "Você não precisa de equipe técnica.",
            videoUrl: "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/video-mplementacao-assistida.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvdmlkZW8tbXBsZW1lbnRhY2FvLWFzc2lzdGlkYS5tcDQiLCJpYXQiOjE3NTk4NzY0NTIsImV4cCI6MjA3NTIzNjQ1Mn0.CginDw2BzRnNOAxV24YKjv5SW98mU6MXnlEIkZy4T1s"
          },
          {
            title: "Foco em liberdade",
            description: "Mais lucro, menos trabalho, mais tempo com quem ama.",
            videoUrl: "https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/video-foco-em-liberdade.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvdmlkZW8tZm9jby1lbS1saWJlcmRhZGUubXA0IiwiaWF0IjoxNzU5ODc2MjE0LCJleHAiOjIwNzUyMzYyMTR9.RrZitcJDLYk2odkHdJNjR8q4YBT4hDfapTwXPV9nXQ0"
          }
        ]}
      />
      </div>

      {/* SEÇÃO 7. O QUE ACONTECE QUANDO IA TRABALHA NO SEU LUGAR */}
      <div id="resultados">
        <AnimatedAIWorkSection 
        title="O que acontece quando IA trabalha no seu lugar"
        statistics={[
          {
            statistic: "-40%",
            description: "em custos de operação"
          },
          {
            statistic: "+70%",
            description: "na taxa de resposta em até 30 dias"
          },
          {
            statistic: "+32%",
            description: "em receita média por cliente"
          },
          {
            statistic: "Empresários mais livres",
            description: "e equipes menos sobrecarregadas"
          }
        ]}
      />
      </div>

      {/* SEÇÃO 8. SOBRE - FUNDADORES */}
      <div id="fundadores">
        <section className="relative w-full py-20" style={{ backgroundColor: '#0A0A0A' }}>
        {/* Radial glow na lateral esquerda */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at left center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 15%, transparent 40%)',
            width: '50%',
            height: '100%',
            zIndex: 0
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Badge acima do título */}
          <div className="flex items-center justify-center mb-8">
            <div 
              className="px-4 py-2 rounded-sm border text-sm font-medium"
              style={{ 
                backgroundColor: '#0c0c0c',
                borderColor: '#323232',
                borderRadius: '2px',
                background: 'linear-gradient(to right, #ffffff, #000000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              NOSSOS FUNDADORES
            </div>
          </div>
          
          {/* Título centralizado */}
          <div className="flex items-center justify-center mb-16">
            <h2 className="title-section text-white text-center">
              Por trás da Vision
            </h2>
          </div>
          
          {/* Grid de cards dos fundadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ProfileCard 
              name="Diego Castro"
              role="Founder & CEO"
              description="Especialista em IA aplicada a negócios e referência em gestão e escala com tecnologia. Fundador da PremiaPão (2.000+ unidades após Shark Tank Brasil), estudou em Stanford e gerou resultados milionários como mentor e palestrante. Hoje lidera a transformação de empresas com agentes inteligentes e a educação de empresários para uma nova era de crescimento com IA."
              imageAlt="Vídeo de Diego Castro, Founder & CEO"
              videoUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/video-diego.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvdmlkZW8tZGllZ28ubXA0IiwiaWF0IjoxNzU5ODc1MDY3LCJleHAiOjIwNzUyMzUwNjd9.0y9phSWOJCnaohxv8qxV5lnrC1o498-x7p3lay4Vq7g"
            />
            <ProfileCard 
              name="Douglas Ferro"
              role="Founder & COO"
              description="Especialista em automação com IA para negócios. Pós-graduado em Finanças e Gestão pela PUC-RS e aluno do MIT em IA Generativa. Sócio, investidor e mentor de negócios em expansão há mais de 10 anos. Transforma tecnologia em lucro, ajudando marcas a escalar com velocidade e impacto real."
              imageAlt="Vídeo de Douglas Ferro, Founder & COO"
              videoUrl="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/video-douglas.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvdmlkZW8tZG91Z2xhcy5tcDQiLCJpYXQiOjE3NTk4NzUwOTksImV4cCI6MjA3NTIzNTA5OX0.vzyEVn9ir5sQsplHSoZLWdKys20tm3p3C3s3vElgQQs"
              videoScale={2.6}
              videoTranslateY="29%"
            />
          </div>
        </div>
      </section>
      </div>

      {/* SEÇÃO 9. FAQ */}
      <div id="duvidas">
        <FAQAccordion />
      </div>

      {/* SEÇÃO 10. CONTATO */}
      <div id="contato">
        <ContactSection />
      </div>
    </main>
    <ContactModal />
    </ModalProvider>
  );
}
