"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { FormCard, textareaStyle, fieldLabelStyle, errorMessageStyle, hiddenButtonStyle } from "./form-styles";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface PerfilClienteIdealFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'perfil_cliente_ideal' | 'caracteristicas_cliente_ideal' | 'criterios_qualificacao_lead' | 'criterios_desqualificacao_lead'>;

export function PerfilClienteIdealForm({ onSave, onNext, formData }: PerfilClienteIdealFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      perfil_cliente_ideal: true,
      caracteristicas_cliente_ideal: true,
      criterios_qualificacao_lead: true,
      criterios_desqualificacao_lead: true,
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
    <FormCard title="Perfil do Cliente Ideal" description="Defina claramente o perfil do cliente ideal para seu produto ou serviço.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="perfil_cliente_ideal" style={fieldLabelStyle}>Descreva seu cliente ideal <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="perfil_cliente_ideal" placeholder='Ex: "Empresas de tecnologia (SaaS) com 50 a 200 funcionários, que buscam otimizar seu processo de qualificação de leads e já investem em marketing digital."' {...register("perfil_cliente_ideal")} style={textareaStyle} />
          {errors.perfil_cliente_ideal && <p style={errorMessageStyle}>{errors.perfil_cliente_ideal.message}</p>}
        </div>

        <div>
          <label htmlFor="caracteristicas_cliente_ideal" style={fieldLabelStyle}>Características principais do cliente ideal <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="caracteristicas_cliente_ideal" placeholder='Ex: "O decisor geralmente é o Diretor de Vendas ou CMO. São pessoas analíticas, que valorizam dados e ROI, e estão abertas a adotar novas tecnologias para melhorar a eficiência."' {...register("caracteristicas_cliente_ideal")} style={textareaStyle} />
          {errors.caracteristicas_cliente_ideal && <p style={errorMessageStyle}>{errors.caracteristicas_cliente_ideal.message}</p>}
        </div>

        <div>
          <label htmlFor="criterios_qualificacao_lead" style={fieldLabelStyle}>Critérios para qualificação de leads <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="criterios_qualificacao_lead" placeholder='Ex: "1. Faturamento anual acima de R$ 2 milhões. 2. Pelo menos 5 vendedores na equipe. 3. Utiliza um CRM. 4. Demonstra ter um problema claro que nossa solução resolve (ex: baixo volume de agendamentos)."' {...register("criterios_qualificacao_lead")} style={textareaStyle} />
          {errors.criterios_qualificacao_lead && <p style={errorMessageStyle}>{errors.criterios_qualificacao_lead.message}</p>}
        </div>

        <div>
          <label htmlFor="criterios_desqualificacao_lead" style={fieldLabelStyle}>Critérios para desqualificação de leads <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="criterios_desqualificacao_lead" placeholder='Ex: "Empresas com menos de 10 funcionários, que não investem em marketing, ou que atuam em setores que não podemos atender (ex: governo). Leads que buscam apenas preço e não valor."' {...register("criterios_desqualificacao_lead")} style={textareaStyle} />
          {errors.criterios_desqualificacao_lead && <p style={errorMessageStyle}>{errors.criterios_desqualificacao_lead.message}</p>}
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}