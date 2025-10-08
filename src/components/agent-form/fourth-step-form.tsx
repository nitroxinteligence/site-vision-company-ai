"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";

interface FourthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: Record<string, any>;
}

const formSchema = z.object({
  processo_vendas: z.string().min(5, { message: "Processo de vendas é obrigatório" }),
  fluxograma_vendas: z.string().min(5, { message: "Fluxograma do processo é obrigatório" }),
  canais_venda: z.string().min(5, { message: "Canais de venda são obrigatórios" }),
  objecoes_vendas: z.string().min(5, { message: "Objeções de vendas são obrigatórias" }),
});

type FormValues = z.infer<typeof formSchema>;

export function FourthStepForm({ onSave, onNext, submissionId, formData = {} }: FourthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (data: FormValues) => {
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
          <Textarea id="processo_vendas" placeholder="Ex: 1. Lead gerado por anúncios..." {...register("processo_vendas")} style={textareaStyle} className="scrollbar" />
          {errors.processo_vendas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.processo_vendas.message}</p>}
        </div>

        <div>
          <label htmlFor="fluxograma_vendas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Fluxograma do processo de vendas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="fluxograma_vendas" placeholder="Ex: Lead → Qualificação Inicial..." {...register("fluxograma_vendas")} style={textareaStyle} className="scrollbar" />
          {errors.fluxograma_vendas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.fluxograma_vendas.message}</p>}
        </div>

        <div>
          <label htmlFor="canais_venda" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Canais de venda utilizados <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="canais_venda" placeholder="Ex: Google Ads, Facebook/Instagram Ads..." {...register("canais_venda")} style={textareaStyle} className="scrollbar" />
          {errors.canais_venda && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.canais_venda.message}</p>}
        </div>

        <div>
          <label htmlFor="objecoes_vendas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Principais objeções enfrentadas nas vendas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="objecoes_vendas" placeholder="Ex: O valor dos honorários está alto..." {...register("objecoes_vendas")} style={textareaStyle} className="scrollbar" />
          {errors.objecoes_vendas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.objecoes_vendas.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}