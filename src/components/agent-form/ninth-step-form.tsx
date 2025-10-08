"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { FormCard, textareaStyle, fieldLabelStyle, errorMessageStyle, hiddenButtonStyle } from "./form-styles";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface NinthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}

export function NinthStepForm({ onSave, onNext, formData }: NinthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema.pick({
      regras_operacao: true,
      regras_follow_up: true,
      regras_lembrete: true,
      expectativa_tempo_resposta: true,
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

  const onSubmit = (data: FormValues) => {
    onSave(data);
    onNext();
  };

  return (
    <FormCard title="Comunicação" description="Configure as regras de comunicação e operação do seu agente IA.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="regras_operacao" style={fieldLabelStyle}>Como o agente deve operar em cada etapa? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_operacao" placeholder="Ex: Na etapa de qualificação, o agente deve..." {...register("regras_operacao")} style={textareaStyle} />
          {errors.regras_operacao && <p style={errorMessageStyle}>{errors.regras_operacao.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_follow_up" style={fieldLabelStyle}>Quais regras o agente deve seguir para fazer follow-up? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_follow_up" placeholder="Ex: Após 24h sem resposta, enviar uma mensagem..." {...register("regras_follow_up")} style={textareaStyle} />
          {errors.regras_follow_up && <p style={errorMessageStyle}>{errors.regras_follow_up.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_lembrete" style={fieldLabelStyle}>Como o agente deve enviar lembretes? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_lembrete" placeholder="Ex: Enviar lembrete 24h antes de qualquer consulta..." {...register("regras_lembrete")} style={textareaStyle} />
          {errors.regras_lembrete && <p style={errorMessageStyle}>{errors.regras_lembrete.message}</p>}
        </div>

        <div>
          <label htmlFor="expectativa_tempo_resposta" style={fieldLabelStyle}>Qual é o tempo de resposta esperado? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="expectativa_tempo_resposta" placeholder="Ex: Perguntas simples: resposta em até 15 minutos..." {...register("expectativa_tempo_resposta")} style={textareaStyle} />
          {errors.expectativa_tempo_resposta && <p style={errorMessageStyle}>{errors.expectativa_tempo_resposta.message}</p>}
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}