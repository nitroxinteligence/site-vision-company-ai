-- DESABILITA TEMPORARIAMENTE A ROW LEVEL SECURITY (RLS)
-- Copie e execute este código no "SQL Editor" do seu projeto Supabase.
-- Isso é para fins de diagnóstico. Se o formulário funcionar após isso,
-- saberemos que o problema está 100% nas políticas de RLS.

ALTER TABLE public.form_agentes DISABLE ROW LEVEL SECURITY;
