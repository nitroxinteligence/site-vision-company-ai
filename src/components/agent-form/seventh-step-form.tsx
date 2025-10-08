"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";

interface SeventhStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: Record<string, any>;
}

const formSchema = z.object({
  sistemas_atuais: z.string().min(1, { message: "Sistema utilizado atualmente é obrigatório" }),
  campos_personalizados_relevantes: z.string().min(5, { message: "Campos personalizados são obrigatórios" }),
  regras_movimentacao_etapas: z.string().min(5, { message: "Regras de movimentação são obrigatórias" }),
});

type FormValues = z.infer<typeof formSchema>;

export function SeventhStepForm({ onSave, onNext, formData = {} }: SeventhStepFormProps) {
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
          Integração com Sistemas Externos
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Informe sobre os sistemas que você utiliza e como deseja que a integração funcione.</p>
      </div>
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="sistemas_atuais" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Sistema utilizado atualmente <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="sistemas_atuais" placeholder="Ex: Projuris para gestão jurídica e Exact Sales para CRM" {...register("sistemas_atuais")} style={{ ...textareaStyle, minHeight: "150px" }} className="scrollbar" />
          {errors.sistemas_atuais && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.sistemas_atuais.message}</p>}
        </div>

        <div>
          <label htmlFor="campos_personalizados_relevantes" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Campos personalizados relevantes <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="campos_personalizados_relevantes" placeholder="Ex: Tipo de ação, Valor estimado da causa..." {...register("campos_personalizados_relevantes")} style={textareaStyle} className="scrollbar" />
          {errors.campos_personalizados_relevantes && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.campos_personalizados_relevantes.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_movimentacao_etapas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Regras de movimentação entre etapas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_movimentacao_etapas" placeholder="Ex: Lead → Qualificado: após verificação inicial..." {...register("regras_movimentacao_etapas")} style={textareaStyle} className="scrollbar" />
          {errors.regras_movimentacao_etapas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.regras_movimentacao_etapas.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}
