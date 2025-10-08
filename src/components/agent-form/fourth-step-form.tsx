"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface FourthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'processo_vendas' | 'fluxograma_vendas' | 'canais_venda' | 'objecoes_vendas'>;

export function FourthStepForm({ onSave, onNext, formData }: FourthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      processo_vendas: true,
      fluxograma_vendas: true,
      canais_venda: true,
      objecoes_vendas: true,
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


  const textareaStyle = { color: "#FFFFFF", padding: "0.75rem", minHeight: "120px", width: "100%", borderRadius: "8px", overflow: "auto" };

  return (
    <div style={{ backgroundColor: "#000000", borderRadius: "0.5rem", padding: "1.5rem", border: "none", maxWidth: "100%" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", background: "linear-gradient(to right, #ffffff, #888888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Estratégia de Vendas
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Forneça informações sobre seu processo e estratégia de vendas.</p>
      </div>
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="processo_vendas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Processo de vendas atual <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="processo_vendas" placeholder='Ex: "1. O lead chega via anúncio no Instagram. 2. O agente de IA faz a qualificação inicial via WhatsApp. 3. Se qualificado, o agente agenda uma demonstração. 4. Nosso vendedor faz a demonstração e envia a proposta."' {...register("processo_vendas")} style={textareaStyle} className="scrollbar" />
          {errors.processo_vendas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.processo_vendas.message}</p>}
        </div>

        <div>
          <label htmlFor="fluxograma_vendas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Fluxograma do processo de vendas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="fluxograma_vendas" placeholder='Ex: "Novo Lead → Contato Inicial (IA) → Qualificado? (Sim/Não) → Agendamento (IA) → Demonstração (Vendedor) → Proposta → Fechamento."' {...register("fluxograma_vendas")} style={textareaStyle} className="scrollbar" />
          {errors.fluxograma_vendas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.fluxograma_vendas.message}</p>}
        </div>

        <div>
          <label htmlFor="canais_venda" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Canais de venda utilizados <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="canais_venda" placeholder='Ex: "Principalmente Meta Ads (Instagram/Facebook) para geração de leads. Também utilizamos Google Ads para palavras-chave específicas e mantemos um blog com conteúdo orgânico."' {...register("canais_venda")} style={textareaStyle} className="scrollbar" />
          {errors.canais_venda && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.canais_venda.message}</p>}
        </div>

        <div>
          <label htmlFor="objecoes_vendas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Principais objeções enfrentadas nas vendas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="objecoes_vendas" placeholder='Ex: "1. "O preço está muito alto": contornar mostrando o ROI. 2. "Preciso pensar/falar com meu sócio": agendar um follow-up. 3. "Já uso uma ferramenta parecida": destacar nossos diferenciais."' {...register("objecoes_vendas")} style={textareaStyle} className="scrollbar" />
          {errors.objecoes_vendas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.objecoes_vendas.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}
