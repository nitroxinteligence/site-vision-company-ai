"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";

interface ThirdStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: Record<string, any>;
}

const formSchema = z.object({
  nome_produto: z.string().min(5, { message: "Nome do produto/serviço é obrigatório" }),
  descricao_detalhada_produto: z.string().min(10, { message: "Descrição detalhada é obrigatória" }),
  caracteristicas_e_beneficios_produto: z.string().min(10, { message: "Características e benefícios são obrigatórios" }),
  diferenciais_competitivos_produto: z.string().min(10, { message: "Diferenciais competitivos são obrigatórios" }),
  publico_alvo_produto: z.string().min(5, { message: "Público-alvo é obrigatório" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ThirdStepForm({ onSave, onNext, submissionId, formData = {} }: ThirdStepFormProps) {
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

  const inputStyle = { color: "#FFFFFF", padding: "0.75rem", minHeight: "2.75rem", width: "100%", borderRadius: "8px" };
  const textareaStyle = { color: "#FFFFFF", padding: "0.75rem", minHeight: "120px", width: "100%", borderRadius: "8px", overflow: "auto" };

  return (
    <div style={{ backgroundColor: "#000000", borderRadius: "0.5rem", padding: "1.5rem", border: "none", maxWidth: "100%" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", background: "linear-gradient(to right, #ffffff, #888888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Detalhes do Produto/Serviço Principal
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Forneça informações sobre o produto ou serviço que o agente irá representar.</p>
      </div>
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="nome_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Nome do produto/serviço <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Input id="nome_produto" placeholder="Ex: Serviços jurídicos especializados..." {...register("nome_produto")} style={inputStyle} />
          {errors.nome_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.nome_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="descricao_detalhada_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Descrição detalhada <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="descricao_detalhada_produto" placeholder="Ex: Prestamos assessoria jurídica completa..." {...register("descricao_detalhada_produto")} style={textareaStyle} className="scrollbar" />
          {errors.descricao_detalhada_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.descricao_detalhada_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="caracteristicas_e_beneficios_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Principais características e benefícios <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="caracteristicas_e_beneficios_produto" placeholder="Ex: Atendimento 100% online..." {...register("caracteristicas_e_beneficios_produto")} style={textareaStyle} className="scrollbar" />
          {errors.caracteristicas_e_beneficios_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.caracteristicas_e_beneficios_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="diferenciais_competitivos_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Diferenciais competitivos <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="diferenciais_competitivos_produto" placeholder="Ex: Atendimento personalizado 24/7..." {...register("diferenciais_competitivos_produto")} style={textareaStyle} className="scrollbar" />
          {errors.diferenciais_competitivos_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.diferenciais_competitivos_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="publico_alvo_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Público-alvo <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="publico_alvo_produto" placeholder="Ex: Trabalhadores com direitos violados..." {...register("publico_alvo_produto")} style={textareaStyle} className="scrollbar" />
          {errors.publico_alvo_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.publico_alvo_produto.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}
