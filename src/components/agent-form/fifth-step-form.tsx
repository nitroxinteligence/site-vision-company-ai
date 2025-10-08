"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { FormCard, textareaStyle, fieldLabelStyle, errorMessageStyle, helperTextStyle, hiddenButtonStyle } from "./form-styles";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface FifthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'diferenciais_empresa' | 'vantagens_empresa' | 'usp_empresa'>;

export function FifthStepForm({ onSave, onNext, formData }: FifthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      diferenciais_empresa: true,
      vantagens_empresa: true,
      usp_empresa: true,
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
    <FormCard title="Diferenciais Competitivos" description="Destaque o que torna seu produto ou serviço único no mercado.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="diferenciais_empresa" style={fieldLabelStyle}>Principais diferenciais <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="diferenciais_empresa" placeholder='Ex: "Nossa plataforma utiliza um algoritmo de IA proprietário que garante uma taxa de qualificação de leads 20% superior à média do mercado. Além disso, oferecemos integração nativa com mais de 50 CRMs."' {...register("diferenciais_empresa")} style={textareaStyle} />
          {errors.diferenciais_empresa && <p style={errorMessageStyle}>{errors.diferenciais_empresa.message}</p>}
        </div>

        <div>
          <label htmlFor="vantagens_empresa" style={fieldLabelStyle}>Vantagens competitivas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="vantagens_empresa" placeholder='Ex: "Nossos clientes conseguem reduzir o tempo de resposta ao lead de horas para minutos, aumentando a taxa de conversão. Nossa tecnologia também diminui o custo por lead qualificado em até 30%."' {...register("vantagens_empresa")} style={textareaStyle} />
          {errors.vantagens_empresa && <p style={errorMessageStyle}>{errors.vantagens_empresa.message}</p>}
        </div>

        <div>
          <label htmlFor="usp_empresa" style={fieldLabelStyle}>Proposta de valor única (USP) <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="usp_empresa" placeholder='Ex: "A Vision.ai é a única plataforma de qualificação de leads que aprende com cada interação, tornando seu processo de vendas mais inteligente e eficiente a cada dia, sem que você precise configurar regras complexas."' {...register("usp_empresa")} style={textareaStyle} />
          {errors.usp_empresa && <p style={errorMessageStyle}>{errors.usp_empresa.message}</p>}
          <p style={helperTextStyle}>A USP (Unique Selling Proposition) é o que faz seu produto ou serviço se destacar.</p>
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}