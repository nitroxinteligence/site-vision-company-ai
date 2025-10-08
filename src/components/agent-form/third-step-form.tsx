"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface ThirdStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'nome_produto' | 'descricao_detalhada_produto' | 'caracteristicas_e_beneficios_produto' | 'diferenciais_competitivos_produto' | 'publico_alvo_produto'>;

export function ThirdStepForm({ onSave, onNext, formData }: ThirdStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      nome_produto: true,
      descricao_detalhada_produto: true,
      caracteristicas_e_beneficios_produto: true,
      diferenciais_competitivos_produto: true,
      publico_alvo_produto: true,
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
          <Input id="nome_produto" placeholder='Ex: "Plano de Assessoria Jurídica Digital para Startups"' {...register("nome_produto")} style={inputStyle} />
          {errors.nome_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.nome_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="descricao_detalhada_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Descrição detalhada <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="descricao_detalhada_produto" placeholder='Ex: "Oferecemos um serviço de assessoria jurídica contínua, cobrindo desde a constituição da empresa até a elaboração de contratos e questões de propriedade intelectual, tudo gerenciado por uma plataforma online."' {...register("descricao_detalhada_produto")} style={textareaStyle} className="scrollbar" />
          {errors.descricao_detalhada_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.descricao_detalhada_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="caracteristicas_e_beneficios_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Principais características e benefícios <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="caracteristicas_e_beneficios_produto" placeholder='Ex: "Características: Acesso a advogados especializados via chat, biblioteca de documentos legais, análise de contratos por IA. Benefícios: Redução de custos, agilidade na resolução de questões legais e segurança jurídica para o negócio."' {...register("caracteristicas_e_beneficios_produto")} style={textareaStyle} className="scrollbar" />
          {errors.caracteristicas_e_beneficios_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.caracteristicas_e_beneficios_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="diferenciais_competitivos_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Diferenciais competitivos <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="diferenciais_competitivos_produto" placeholder='Ex: "Somos o único serviço que combina advogados reais com uma plataforma de IA para análise de documentos, oferecendo um serviço mais rápido e acessível que escritórios tradicionais."' {...register("diferenciais_competitivos_produto")} style={textareaStyle} className="scrollbar" />
          {errors.diferenciais_competitivos_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.diferenciais_competitivos_produto.message}</p>}
        </div>

        <div>
          <label htmlFor="publico_alvo_produto" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Público-alvo <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="publico_alvo_produto" placeholder='Ex: "Startups de tecnologia em estágio inicial (seed ou anjo) que buscam assessoria jurídica acessível e não possuem um departamento jurídico interno."' {...register("publico_alvo_produto")} style={textareaStyle} className="scrollbar" />
          {errors.publico_alvo_produto && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.publico_alvo_produto.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}