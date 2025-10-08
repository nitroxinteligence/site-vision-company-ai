-- Tabela para armazenar todos os dados do formulário de briefing do agente de IA.
-- Copie e execute este código no "SQL Editor" do seu projeto Supabase para criar a tabela.

CREATE TABLE public.form_submissions (
    -- Colunas de Metadados
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),

    -- Etapa Inicial (de agent-form/page.tsx)
    nome_cliente text,
    tipo_agente text,

    -- Etapa 1: Dados do Agente (first-step-form.tsx)
    nome_agente text,
    descricao_agente text,
    personalidade_agente text,
    instrucoes_agente text,
    regras_agente text,
    tom_de_voz_agente text,
    comportamentos_agente text,
    habilidades_agente text,
    foco_agente text,
    procedimentos_agente text,
    limites_agente text,
    estilo_linguagem_agente text,
    objetivos_agente text,
    saudacao_agente text,
    politica_perguntas_nao_respondidas text,
    publico_alvo_agente text,

    -- Etapa 3: Detalhes do Produto/Serviço (third-step-form.tsx)
    nome_produto text,
    descricao_detalhada_produto text,
    caracteristicas_e_beneficios_produto text,
    diferenciais_competitivos_produto text,
    publico_alvo_produto text,

    -- Etapa 4: Estratégia de Vendas (fourth-step-form.tsx)
    processo_vendas text,
    fluxograma_vendas text,
    canais_venda text,
    objecoes_vendas text,

    -- Etapa 5: Perfil do Cliente Ideal (perfil-cliente-ideal-form.tsx)
    perfil_cliente_ideal text,
    caracteristicas_cliente_ideal text,
    criterios_qualificacao_lead text,
    criterios_desqualificacao_lead text,

    -- Etapa 6 (no fluxo): Diferenciais Competitivos (fifth-step-form.tsx)
    diferenciais_empresa text,
    vantagens_empresa text,
    usp_empresa text, -- Proposta de Valor Única

    -- Etapa 7 (no fluxo): Informações Adicionais (information-step-form.tsx)
    casos_de_sucesso text,
    script_vendas text,
    arquivos_base_conhecimento text[], -- Array para armazenar os caminhos dos arquivos no Storage

    -- Etapa 8 (no fluxo): Integração com Sistemas (seventh-step-form.tsx)
    sistemas_atuais text,
    campos_personalizados_relevantes text,
    regras_movimentacao_etapas text,

    -- Etapa 9 (no fluxo): Integração com Calendários (eighth-step-form.tsx)
    ferramenta_agendamento text,
    disponibilidade_agendamento text,
    info_necessaria_agendamento text,

    -- Etapa 10 (no fluxo): Comunicação (ninth-step-form.tsx)
    regras_operacao text,
    regras_follow_up text,
    regras_lembrete text,
    expectativa_tempo_resposta text,

    -- Etapa 11 (no fluxo): Acessos e Links (thirteenth-step-form.tsx)
    links_importantes text,

    -- Etapa 12 (no fluxo): Informações Finais (sixteenth-step-form.tsx)
    info_adicional_final text
);

-- Adiciona comentários para explicar o propósito da tabela e colunas importantes.
COMMENT ON TABLE public.form_submissions IS 'Armazena todas as informações coletadas do formulário de briefing para a criação de agentes de IA.';
COMMENT ON COLUMN public.form_submissions.arquivos_base_conhecimento IS 'Array de strings contendo os caminhos para os arquivos enviados no Supabase Storage.';

-- NOTA: As colunas de etapas removidas (como API Key, Políticas, etc.) foram omitidas desta tabela conforme a análise do fluxo atual do formulário.
