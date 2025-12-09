export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vision AI',
  url: 'https://visioncompany.ai',
  logo: 'https://visioncompany.ai/logo.png',
  description: 'Agentes de IA personalizados para automatizar processos, reduzir custos e escalar operações empresariais.',
  foundingDate: '2024',
  areaServed: 'Global',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: 'https://visioncompany.ai',
    availableLanguage: ['Portuguese', 'English'],
  },
  sameAs: [
    'https://www.instagram.com/visioncompany.ai',
    'https://www.linkedin.com/company/visioncompanyai',
  ],
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Automação com Inteligência Artificial',
  provider: {
    '@type': 'Organization',
    name: 'Vision AI',
    url: 'https://visioncompany.ai',
  },
  areaServed: 'Global',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://visioncompany.ai',
    availableLanguage: ['Portuguese', 'English'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Agentes de IA',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Agente SDR',
          description: 'Agente inteligente para prospecção e qualificação de leads automatizada.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Agente de Customer Success',
          description: 'Agente inteligente para atendimento e suporte ao cliente 24/7.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Agente Closer',
          description: 'Agente inteligente para fechamento de vendas e negociação.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Agente Financeiro',
          description: 'Agente inteligente para automação de processos financeiros e cobranças.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Agente de Dados',
          description: 'Agente inteligente para análise e processamento de dados empresariais.',
        },
      },
    ],
  },
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Preciso de equipe técnica para implementar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não, você não precisa se preocupar com isso. Cuidamos de toda a implementação e configuração dos agentes inteligentes. Nossa equipe especializada garante que tudo funcione perfeitamente sem que você precise de conhecimento técnico.',
      },
    },
    {
      '@type': 'Question',
      name: 'A IA vai substituir meu time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não, nossa IA não substitui pessoas. Ela libera seu time das tarefas repetitivas e operacionais para que possam focar no que realmente gera valor: estratégia, relacionamento e crescimento do negócio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para ver resultados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Os primeiros resultados aparecem entre 30 e 90 dias. Isso inclui redução de custos operacionais, melhoria na taxa de resposta e aumento na eficiência dos processos. O tempo varia conforme a complexidade do seu negócio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Funciona para qualquer segmento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, já aplicamos nossa tecnologia em dezenas de setores diferentes. Nossos agentes inteligentes são desenvolvidos sob medida para cada tipo de negócio, adaptando-se às particularidades do seu mercado e operação.',
      },
    },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vision AI',
  url: 'https://visioncompany.ai',
  description: 'Agentes de IA para empresas. Automatize processos, reduza custos operacionais e escale seu negócio com inteligência artificial personalizada.',
  inLanguage: ['pt-BR', 'en'],
  publisher: {
    '@type': 'Organization',
    name: 'Vision AI',
    url: 'https://visioncompany.ai',
  },
}

export function generateStructuredData() {
  return [organizationSchema, serviceSchema, faqSchema, websiteSchema]
}
