import { z } from 'zod';

export const formSchema = z.object({
  // First Step
  nome_agente: z.string().min(1, { message: "Nome é obrigatório" }),
  descricao_agente: z.string().min(5, { message: "Descrição é obrigatória" }),
  personalidade_agente: z.string().min(5, { message: "Personalidade é obrigatória" }),
  instrucoes_agente: z.string().min(5, { message: "Instruções são obrigatórias" }),
  regras_agente: z.string().min(5, { message: "Regras são obrigatórias" }),
  tom_de_voz_agente: z.string().min(2, { message: "Tom de voz é obrigatório" }),
  comportamentos_agente: z.string().min(5, { message: "Comportamentos são obrigatórios" }),
  habilidades_agente: z.string().min(5, { message: "Habilidades são obrigatórias" }),
  foco_agente: z.string().min(5, { message: "Foco é obrigatório" }),
  procedimentos_agente: z.string().min(5, { message: "Procedimentos são obrigatórios" }),
  limites_agente: z.string().min(5, { message: "Limites são obrigatórias" }),
  estilo_linguagem_agente: z.string().min(5, { message: "Estilo de linguagem é obrigatório" }),
  objetivos_agente: z.string().min(5, { message: "Objetivos são obrigatórios" }),
  saudacao_agente: z.string().min(5, { message: "Saudação é obrigatória" }),
  politica_perguntas_nao_respondidas: z.string().min(5, { message: "Resposta para dúvidas é obrigatória" }),
  publico_alvo_agente: z.string().min(5, { message: "Público-alvo é obrigatório" }),
  
  // Third Step
  nome_produto: z.string().min(5, { message: "Nome do produto/serviço é obrigatório" }),
  descricao_detalhada_produto: z.string().min(10, { message: "Descrição detalhada é obrigatória" }),
  caracteristicas_e_beneficios_produto: z.string().min(10, { message: "Características e benefícios são obrigatórios" }),
  diferenciais_competitivos_produto: z.string().min(10, { message: "Diferenciais competitivos são obrigatórios" }),
  publico_alvo_produto: z.string().min(5, { message: "Público-alvo é obrigatório" }),

  // Fourth Step
  processo_vendas: z.string().min(5, { message: "Processo de vendas é obrigatório" }),
  fluxograma_vendas: z.string().min(5, { message: "Fluxograma do processo é obrigatório" }),
  canais_venda: z.string().min(5, { message: "Canais de venda são obrigatórios" }),
  objecoes_vendas: z.string().min(5, { message: "Objeções de vendas são obrigatórias" }),

  // Perfil Cliente Ideal
  perfil_cliente_ideal: z.string().min(5, { message: "Por favor, descreva o perfil do cliente ideal" }),
  caracteristicas_cliente_ideal: z.string().min(5, { message: "Por favor, forneça as características principais do cliente ideal" }),
  criterios_qualificacao_lead: z.string().min(5, { message: "Por favor, defina os critérios de qualificação de leads" }),
  criterios_desqualificacao_lead: z.string().min(5, { message: "Por favor, defina os critérios de desqualificação de leads" }),

  // Fifth Step
  diferenciais_empresa: z.string().min(5, { message: "Por favor, forneça informações sobre os diferenciais" }),
  vantagens_empresa: z.string().min(5, { message: "Por favor, forneça informações sobre as vantagens" }),
  usp_empresa: z.string().min(5, { message: "Por favor, forneça informações sobre a USP" }),

  // Information Step
  casos_de_sucesso: z.string().optional(),
  script_vendas: z.string().optional(),
  arquivos_base_conhecimento: z.array(z.string()).optional(),

  // Seventh Step
  sistemas_atuais: z.string().optional(),
  campos_personalizados_relevantes: z.string().optional(),
  regras_movimentacao_etapas: z.string().optional(),

  // Eighth Step
  ferramenta_agendamento: z.string().optional(),
  disponibilidade_agendamento: z.string().optional(),
  info_necessaria_agendamento: z.string().optional(),

  // Ninth Step
  regras_operacao: z.string().min(5, { message: "Por favor, forneça informações sobre as regras de operação" }),
  regras_follow_up: z.string().min(5, { message: "Por favor, forneça informações sobre as regras de acompanhamento" }),
  regras_lembrete: z.string().min(5, { message: "Por favor, forneça informações sobre as regras de lembretes" }),
  expectativa_tempo_resposta: z.string().min(5, { message: "Por favor, forneça informações sobre o tempo de resposta" }),

  // Thirteenth Step
  links_importantes: z.string().optional(),

  // Sixteenth Step
  info_adicional_final: z.string().optional(),

  // Initial form fields
  nome_cliente: z.string().optional(),
  tipo_agente: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;