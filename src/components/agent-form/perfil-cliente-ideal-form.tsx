"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { FormCard, textareaStyle, fieldLabelStyle, errorMessageStyle, hiddenButtonStyle } from "./form-styles";
import { useDebouncedCallback } from "use-debounce";

interface PerfilClienteIdealFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: Record<string, any>;
}

const formSchema = z.object({
  perfil_cliente_ideal: z.string().min(5, { message: "Por favor, descreva o perfil do cliente ideal" }),
  caracteristicas_cliente_ideal: z.string().min(5, { message: "Por favor, forneça as características principais do cliente ideal" }),
  criterios_qualificacao_lead: z.string().min(5, { message: "Por favor, defina os critérios de qualificação de leads" }),
  criterios_desqualificacao_lead: z.string().min(5, { message: "Por favor, defina os critérios de desqualificação de leads" }),
});

type FormValues = z.infer<typeof formSchema>;

export function PerfilClienteIdealForm({ onSave, onNext, submissionId, formData = {} }: PerfilClienteIdealFormProps) {
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

  return (
    <FormCard title="Perfil do Cliente Ideal" description="Defina claramente o perfil do cliente ideal para seu produto ou serviço.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="perfil_cliente_ideal" style={fieldLabelStyle}>Descreva seu cliente ideal <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="perfil_cliente_ideal" placeholder="Ex: Empresas de pequeno e médio porte..." {...register("perfil_cliente_ideal")} style={textareaStyle} />
          {errors.perfil_cliente_ideal && <p style={errorMessageStyle}>{errors.perfil_cliente_ideal.message}</p>}
        </div>

        <div>
          <label htmlFor="caracteristicas_cliente_ideal" style={fieldLabelStyle}>Características principais do cliente ideal <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="caracteristicas_cliente_ideal" placeholder="Ex: Decisores que valorizam inovação..." {...register("caracteristicas_cliente_ideal")} style={textareaStyle} />
          {errors.caracteristicas_cliente_ideal && <p style={errorMessageStyle}>{errors.caracteristicas_cliente_ideal.message}</p>}
        </div>

        <div>
          <label htmlFor="criterios_qualificacao_lead" style={fieldLabelStyle}>Critérios para qualificação de leads <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="criterios_qualificacao_lead" placeholder="Ex: Orçamento disponível para investir..." {...register("criterios_qualificacao_lead")} style={textareaStyle} />
          {errors.criterios_qualificacao_lead && <p style={errorMessageStyle}>{errors.criterios_qualificacao_lead.message}</p>}
        </div>

        <div>
          <label htmlFor="criterios_desqualificacao_lead" style={fieldLabelStyle}>Critérios para desqualificação de leads <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="criterios_desqualificacao_lead" placeholder="Ex: Orçamento incompatível..." {...register("criterios_desqualificacao_lead")} style={textareaStyle} />
          {errors.criterios_desqualificacao_lead && <p style={errorMessageStyle}>{errors.criterios_desqualificacao_lead.message}</p>}
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}
