-- POLÍTICAS DE SEGURANÇA CORRIGIDAS PARA TABELA E STORAGE
-- Copie e execute este código no "SQL Editor" do seu projeto Supabase.
-- Isso corrigirá os erros de "violates row-level security policy" tanto para salvar
-- os dados do formulário quanto para fazer upload de arquivos.

-- ETAPA 1: Remover políticas antigas para evitar conflitos

DROP POLICY IF EXISTS "Permitir inserção pública para novos envios" ON public.form_agentes;
DROP POLICY IF EXISTS "Permitir atualização pública para envios existentes" ON public.form_agentes;

-- ETAPA 2: Criar políticas permissivas para a tabela 'form_agentes'

-- Permite que qualquer pessoa (incluindo usuários anônimos) insira uma nova linha.
CREATE POLICY "Permitir inserção anônima"
ON public.form_agentes
FOR INSERT
WITH CHECK (true);

-- Permite que qualquer pessoa (incluindo usuários anônimos) atualize qualquer linha.
CREATE POLICY "Permitir atualização anônima"
ON public.form_agentes
FOR UPDATE
USING (true)
WITH CHECK (true);

-- ETAPA 3: Criar políticas para o bucket 'form-attachments' no Storage
-- ATENÇÃO: Substitua 'form-attachments' se o nome do seu bucket for diferente.

-- Permite que qualquer pessoa veja/faça download dos arquivos (necessário para exibir no futuro, se preciso)
CREATE POLICY "Permitir acesso público de leitura aos anexos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'form-attachments' );

-- Permite que qualquer pessoa envie novos arquivos para o bucket. (ESSENCIAL PARA CORRIGIR O ERRO DE UPLOAD)
CREATE POLICY "Permitir inserção pública nos anexos"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'form-attachments' );

-- Permite que qualquer pessoa atualize/sobrescreva um arquivo.
CREATE POLICY "Permitir atualização pública nos anexos"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'form-attachments' );
