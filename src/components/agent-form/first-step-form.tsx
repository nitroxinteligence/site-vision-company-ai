"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface FirstStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'nome_agente' | 'descricao_agente' | 'personalidade_agente' | 'instrucoes_agente' | 'regras_agente' | 'tom_de_voz_agente' | 'comportamentos_agente' | 'habilidades_agente' | 'foco_agente' | 'procedimentos_agente' | 'limites_agente' | 'estilo_linguagem_agente' | 'objetivos_agente' | 'saudacao_agente' | 'politica_perguntas_nao_respondidas' | 'publico_alvo_agente'>;

export function FirstStepForm({ onSave, onNext, formData }: FirstStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      nome_agente: true,
      descricao_agente: true,
      personalidade_agente: true,
      instrucoes_agente: true,
      regras_agente: true,
      tom_de_voz_agente: true,
      comportamentos_agente: true,
      habilidades_agente: true,
      foco_agente: true,
      procedimentos_agente: true,
      limites_agente: true,
      estilo_linguagem_agente: true,
      objetivos_agente: true,
      saudacao_agente: true,
      politica_perguntas_nao_respondidas: true,
      publico_alvo_agente: true,
    })),
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const debouncedSave = useDebouncedCallback((data: Partial<FormValues>) => { onSave(data); }, 1500);

  useEffect(() => {
    const subscription = watch((value) => { debouncedSave(value); });
    return () => subscription.unsubscribe();
  }, [watch, debouncedSave]);

  const onSubmit = (data: StepValues) => {
    onSave(data);
    onNext();
  };


  const inputStyle = { color: "#FFFFFF", padding: "0.75rem", minHeight: "2.75rem", width: "100%", borderRadius: "8px" };
  const textareaStyle = { color: "#FFFFFF", padding: "0.75rem", minHeight: "100px", width: "100%", borderRadius: "8px", overflow: "auto" };

  return (
    <div style={{ backgroundColor: "#000000", borderRadius: "0.5rem", padding: "1.5rem", border: "none", maxWidth: "100%" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", background: "linear-gradient(to right, #ffffff, #888888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Dados do Agente de I.A Personalizado
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Preencha os campos abaixo para configurar seu Agente.</p>
      </div>

      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="nome_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Nome <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Input id="nome_agente" placeholder='Ex: "Beatriz", assistente virtual da Vision.ai' {...register("nome_agente")} style={inputStyle} />
          {errors.nome_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.nome_agente.message}</p>}
        </div>
        
        <div>
          <label htmlFor="descricao_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Descrição <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Input id="descricao_agente" placeholder='Ex: "Sou a Beatriz, uma agente de I.A. da Vision.ai, especialista em qualificar leads para nossos serviços de desenvolvimento de software."' {...register("descricao_agente")} style={inputStyle} />
          {errors.descricao_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.descricao_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="personalidade_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Qual personalidade você deseja para o Agente de IA? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="personalidade_agente" placeholder='Ex: "Uma personalidade amigável, prestativa e um pouco formal, transmitindo confiança e profissionalismo."' {...register("personalidade_agente")} style={textareaStyle} />
          {errors.personalidade_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.personalidade_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="instrucoes_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Quais instruções você quer dar para o Agente de IA? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="instrucoes_agente" placeholder='Ex: "Sua principal função é fazer a primeira abordagem ao lead, qualificá-lo com base em nossas diretrizes e, se qualificado, agendar uma reunião com um de nossos especialistas."' {...register("instrucoes_agente")} style={textareaStyle} />
          {errors.instrucoes_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.instrucoes_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Quais regras você quer inserir? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_agente" placeholder='Ex: "Nunca prometa funcionalidades ou prazos que não foram previamente aprovados. Sempre siga o script de qualificação à risca."' {...register("regras_agente")} style={textareaStyle} />
          {errors.regras_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.regras_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="tom_de_voz_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Qual deve ser o tom de voz do Agente de IA? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Input id="tom_de_voz_agente" placeholder='Ex: "Utilize um tom sempre cordial e profissional, evitando gírias ou linguagem excessivamente informal."' {...register("tom_de_voz_agente")} style={inputStyle} />
          {errors.tom_de_voz_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.tom_de_voz_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="comportamentos_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Quais comportamentos o Agente de IA deve adotar ou evitar? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="comportamentos_agente" placeholder='Ex: "Adotar: Ser proativo em tirar dúvidas. Evitar: Fazer perguntas muito pessoais ou que fujam do escopo profissional."' {...register("comportamentos_agente")} style={textareaStyle} />
          {errors.comportamentos_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.comportamentos_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="habilidades_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Quais habilidades o Agente de IA deve demonstrar? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="habilidades_agente" placeholder='Ex: "Deve demonstrar conhecimento profundo sobre nossos serviços de IA, ser capaz de responder às principais dúvidas sobre preços e integrações."' {...register("habilidades_agente")} style={textareaStyle} />
          {errors.habilidades_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.habilidades_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="foco_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Há algum foco específico que o Agente de IA deve manter? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="foco_agente" placeholder='Ex: "O foco principal é entender as necessidades do cliente e identificar se nossa solução é a ideal para ele, garantindo um agendamento de reunião qualificado."' {...register("foco_agente")} style={textareaStyle} />
          {errors.foco_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.foco_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="procedimentos_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Existem procedimentos específicos que o Agente de IA deve seguir? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="procedimentos_agente" placeholder='Ex: "Se o cliente expressar insatisfação com o preço, reforce os benefícios e o valor agregado antes de oferecer a possibilidade de falar com um especialista para discutir condições."' {...register("procedimentos_agente")} style={textareaStyle} />
          {errors.procedimentos_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.procedimentos_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="limites_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Quais limites o Agente de IA não deve ultrapassar? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="limites_agente" placeholder='Ex: "Não deve, em hipótese alguma, fornecer informações de contato de outros clientes ou detalhes internos da empresa."' {...register("limites_agente")} style={textareaStyle} />
          {errors.limites_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.limites_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="estilo_linguagem_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Há algum estilo de linguagem que o Agente de IA deve usar? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="estilo_linguagem_agente" placeholder='Ex: "Utilizar frases curtas e claras, sempre em português do Brasil. Evite termos muito técnicos, a menos que o cliente demonstre familiaridade com o assunto."' {...register("estilo_linguagem_agente")} style={textareaStyle} />
          {errors.estilo_linguagem_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.estilo_linguagem_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="objetivos_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Quais são os objetivos principais que o Agente de IA deve alcançar? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="objetivos_agente" placeholder='Ex: "O objetivo principal é qualificar 10 leads por dia e agendar pelo menos 5 reuniões qualificadas na semana."' {...register("objetivos_agente")} style={textareaStyle} />
          {errors.objetivos_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.objetivos_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="saudacao_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>O Agente de IA deve usar alguma saudação específica? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="saudacao_agente" placeholder='Ex: "Começar a conversa com: Olá! Meu nome é [Nome do Agente], sou especialista da Vision.ai. Como posso ajudar?"' {...register("saudacao_agente")} style={textareaStyle} />
          {errors.saudacao_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.saudacao_agente.message}</p>}
        </div>

        <div>
          <label htmlFor="politica_perguntas_nao_respondidas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Como o Agente de IA deve lidar com perguntas que não sabe responder? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="politica_perguntas_nao_respondidas" placeholder='Ex: "Se não souber a resposta, diga: Essa é uma ótima pergunta! Não tenho essa informação no momento, mas vou verificar com nossa equipe de especialistas e retorno para você."' {...register("politica_perguntas_nao_respondidas")} style={textareaStyle} />
          {errors.politica_perguntas_nao_respondidas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.politica_perguntas_nao_respondidas.message}</p>}
        </div>

        <div>
          <label htmlFor="publico_alvo_agente" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Há algum público-alvo específico que o Agente de IA deve considerar? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="publico_alvo_agente" placeholder='Ex: "O agente deve adaptar sua comunicação para diretores de tecnologia (CTOs) e gerentes de produto em startups de tecnologia com mais de 50 funcionários."' {...register("publico_alvo_agente")} style={textareaStyle} />
          {errors.publico_alvo_agente && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.publico_alvo_agente.message}</p>}
        </div>
        
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}