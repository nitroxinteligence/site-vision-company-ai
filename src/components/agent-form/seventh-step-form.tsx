"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface SeventhStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'sistemas_atuais' | 'campos_personalizados_relevantes' | 'regras_movimentacao_etapas'>;

export function SeventhStepForm({ onSave, onNext, formData }: SeventhStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      sistemas_atuais: true,
      campos_personalizados_relevantes: true,
      regras_movimentacao_etapas: true,
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
          Integração com Sistemas Externos
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Informe sobre os sistemas que você utiliza e como deseja que a integração funcione.</p>
      </div>
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="sistemas_atuais" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Sistema utilizado atualmente</label>
          <Textarea id="sistemas_atuais" placeholder='Ex: "Utilizamos o CRM HubSpot para gestão de leads e o Pipefy para controle do fluxo de trabalho. O agente precisará ler e escrever dados em ambos."' {...register("sistemas_atuais")} style={{ ...textareaStyle, minHeight: "150px" }} className="scrollbar" />
          {errors.sistemas_atuais && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.sistemas_atuais.message}</p>}
        </div>

        <div>
          <label htmlFor="campos_personalizados_relevantes" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Campos personalizados relevantes</label>
          <Textarea id="campos_personalizados_relevantes" placeholder='Ex: "No HubSpot, os campos mais importantes são "Fonte do Lead", "Estágio do Funil" e o campo customizado "Interesse Principal". O agente deve preenchê-los após a qualificação."' {...register("campos_personalizados_relevantes")} style={textareaStyle} className="scrollbar" />
          {errors.campos_personalizados_relevantes && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.campos_personalizados_relevantes.message}</p>}
        </div>

        <div>
          <label htmlFor="regras_movimentacao_etapas" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Regras de movimentação entre etapas</label>
          <Textarea id="regras_movimentacao_etapas" placeholder='Ex: "Quando um lead for qualificado pelo agente (marcado como "Qualificado" no campo "Estágio do Funil" do HubSpot), ele deve ser movido automaticamente para a coluna "Agendar Demonstração" no Pipefy."' {...register("regras_movimentacao_etapas")} style={textareaStyle} className="scrollbar" />
          {errors.regras_movimentacao_etapas && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>{errors.regras_movimentacao_etapas.message}</p>}
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}
