"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

interface SecondStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  metasQuantitativas: z.string().min(5, { message: "Metas quantitativas são obrigatórias" }),
  metasQualitativas: z.string().min(5, { message: "Metas qualitativas são obrigatórias" }),
  responsabilidadesPrincipais: z.string().min(5, { message: "Responsabilidades principais são obrigatórias" }),
});

type FormValues = z.infer<typeof formSchema>;

export function SecondStepForm({ onNext, formData = {} }: SecondStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metasQuantitativas: formData.metasQuantitativas || "",
      metasQualitativas: formData.metasQualitativas || "",
      responsabilidadesPrincipais: formData.responsabilidadesPrincipais || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext(data);
  };

  const textareaStyle = {
    color: "#FFFFFF", 
    padding: "0.75rem",
    minHeight: "120px",
    width: "100%",
    maxWidth: "100%",
    borderRadius: "8px",
    overflow: "auto"
  };

  return (
    <div 
      style={{ 
        backgroundColor: "#000000", 
        borderRadius: "0.5rem", 
        padding: "1.5rem", 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
        border: "none",
        maxWidth: "100%",
        overflow: "hidden"
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          marginBottom: "0.5rem",
          color: "#ffffff"
        }}>
          Objetivos e Funções
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Defina as metas e responsabilidades do seu agente de IA.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
          <div>
            <label htmlFor="metasQuantitativas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Metas Quantitativas <span style={{ color: "#FF4D4F" }}>*</span>
            </label>
            <Textarea
              id="metasQuantitativas"
              placeholder="Ex: Converter 30% das conversas em agendamentos, Manter nota de satisfação acima de 4.5/5..."
              {...register("metasQuantitativas")}
              aria-invalid={errors.metasQuantitativas ? "true" : "false"}
              style={textareaStyle}
              className="scrollbar"
            />
            {errors.metasQuantitativas && (
              <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.metasQuantitativas.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="metasQualitativas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Metas Qualitativas <span style={{ color: "#FF4D4F" }}>*</span>
            </label>
            <Textarea
              id="metasQualitativas"
              placeholder="Ex: Construir relacionamento de confiança com leads..."
              {...register("metasQualitativas")}
              aria-invalid={errors.metasQualitativas ? "true" : "false"}
              style={textareaStyle}
              className="scrollbar"
            />
            {errors.metasQualitativas && (
              <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.metasQualitativas.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="responsabilidadesPrincipais" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Responsabilidades Principais <span style={{ color: "#FF4D4F" }}>*</span>
            </label>
            <Textarea
              id="responsabilidadesPrincipais"
              placeholder="Ex: Qualificar leads através de 5 perguntas-chave..."
              {...register("responsabilidadesPrincipais")}
              aria-invalid={errors.responsabilidadesPrincipais ? "true" : "false"}
              style={textareaStyle}
              className="scrollbar"
            />
            {errors.responsabilidadesPrincipais && (
              <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.responsabilidadesPrincipais.message}</p>
            )}
          </div>
        </div>

        <div style={{ paddingTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" style={{ display: "none" }}>
            Próximo
          </button>
        </div>
      </form>
    </div>
  );
}