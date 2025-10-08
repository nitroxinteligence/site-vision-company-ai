-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY) PARA A TABELA form_agentes
-- Copie e execute este código no "SQL Editor" do seu projeto Supabase.
-- Isso permitirá que o formulário insira e atualize dados na tabela.

-- 1. Garante que a Row Level Security (RLS) está habilitada na sua tabela.
ALTER TABLE public.form_agentes ENABLE ROW LEVEL SECURITY;

-- 2. Cria uma política para permitir que QUALQUER pessoa (anônima) crie um novo registro.
-- Essencial para a primeira etapa do formulário funcionar.
CREATE POLICY "Permitir inserção pública para novos envios"
ON public.form_agentes
FOR INSERT
WITH CHECK (true);

-- 3. Cria uma política para permitir que QUALQUER pessoa (anônima) atualize um registro existente.
-- Essencial para que as etapas seguintes do formulário possam salvar os dados.
CREATE POLICY "Permitir atualização pública para envios existentes"
ON public.form_agentes
FOR UPDATE
USING (true)
WITH CHECK (true);
