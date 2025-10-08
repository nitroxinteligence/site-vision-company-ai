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


type StepValues = Pick<FormValues, 'regras_operacao' | 'regras_follow_up' | 'regras_lembrete' | 'expectativa_tempo_resposta'>;

export function NinthStepForm({ onSave, onNext, formData }: NinthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
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

  const onSubmit = (data: StepValues) => {
    onSave(data);
    onNext();
  };


  return (
    <FormCard title="Comunicação" description="Configure as regras de comunicação e operação do seu agente IA.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="regras_operacao" style={fieldLabelStyle}>Como o agente deve operar em cada etapa? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_operacao" placeholder='Ex: "Na qualificação, o agente deve fazer no máximo 5 perguntas. Se o lead for qualificado, deve imediatamente enviar o link do Calendly. Se não for, deve agradecer e encerrar."' {...register("regras_operacao")} style={textareaStyle} />
          {errors.regras_operacao && <p style={errorMessageStyle}>{errors.regras_operacao.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_follow_up" style={fieldLabelStyle}>Quais regras o agente deve seguir para fazer follow-up? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_follow_up" placeholder={`Ex: "Se um lead qualificado não agendar a reunião em 24h, o agente deve enviar uma mensagem de follow-up. Ex: 'Olá, [Nome]! Notei que ainda não agendou nossa conversa. Há algum impedimento?' Fazer no máximo 2 follow-ups."`} {...register("regras_follow_up")} style={textareaStyle} />
          {errors.regras_follow_up && <p style={errorMessageStyle}>{errors.regras_follow_up.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_lembrete" style={fieldLabelStyle}>Como o agente deve enviar lembretes? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="regras_lembrete" placeholder='Ex: "Para reuniões agendadas, o agente deve enviar um lembrete via WhatsApp 24 horas antes e outro 1 hora antes do horário marcado."' {...register("regras_lembrete")} style={textareaStyle} />
          {errors.regras_lembrete && <p style={errorMessageStyle}>{errors.regras_lembrete.message}</p>}
        </div>

        <div>
          <label htmlFor="expectativa_tempo_resposta" style={fieldLabelStyle}>Qual é o tempo de resposta esperado? <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="expectativa_tempo_resposta" placeholder='Ex: "O agente deve responder a novas mensagens em no máximo 5 minutos durante o horário comercial (9h-18h). Fora do horário, a primeira resposta pode levar mais tempo, mas deve informar que o contato será retomado no próximo dia útil."' {...register("expectativa_tempo_resposta")} style={textareaStyle} />
          {errors.expectativa_tempo_resposta && <p style={errorMessageStyle}>{errors.expectativa_tempo_resposta.message}</p>}
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}