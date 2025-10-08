"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface EighthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'ferramenta_agendamento' | 'disponibilidade_agendamento' | 'info_necessaria_agendamento'>;

export function EighthStepForm({ onSave, onNext, formData }: EighthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      ferramenta_agendamento: true,
      disponibilidade_agendamento: true,
      info_necessaria_agendamento: true,
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
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ffffff" }}>
          Integração com Calendários
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Configure como deseja integrar o agendamento com seus calendários.</p>
      </div>
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="ferramenta_agendamento" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Ferramenta de agendamento utilizada <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="ferramenta_agendamento" placeholder='Ex: "Utilizamos o Calendly. O agente deve enviar o link principal da nossa conta (calendly.com/suaempresa) para que o lead escolha o melhor horário com o vendedor disponível."' {...register("ferramenta_agendamento")} style={{ ...textareaStyle, minHeight: "150px" }} className="scrollbar" />
          {errors.ferramenta_agendamento && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.ferramenta_agendamento.message}</p>}
        </div>

        <div>
          <label htmlFor="disponibilidade_agendamento" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Horários disponíveis para agendamento <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="disponibilidade_agendamento" placeholder='Ex: "A disponibilidade é gerenciada diretamente no Calendly, mas como regra geral, agendamentos são possíveis de Segunda a Sexta, das 9h às 17h, com duração de 30 minutos."' {...register("disponibilidade_agendamento")} style={textareaStyle} className="scrollbar" />
          {errors.disponibilidade_agendamento && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.disponibilidade_agendamento.message}</p>}
        </div>

        <div>
          <label htmlFor="info_necessaria_agendamento" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Informações necessárias para agendamento <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="info_necessaria_agendamento" placeholder='Ex: "O Calendly já solicita Nome e Email. Além disso, o agente deve instruir o lead a preencher o campo "Observações" com o nome da empresa e seu cargo."' {...register("info_necessaria_agendamento")} style={textareaStyle} className="scrollbar" />
          {errors.info_necessaria_agendamento && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.info_necessaria_agendamento.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}
