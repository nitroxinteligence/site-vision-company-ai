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

export function FifthStepForm({ onSave, onNext, formData }: FifthStepFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormValues>({
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

  const onSubmit = (data: FormValues) => {
    onSave(data);
    onNext();
  };

  return (
    <FormCard title="Diferenciais Competitivos" description="Destaque o que torna seu produto ou serviço único no mercado.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="diferenciais_empresa" style={fieldLabelStyle}>Principais diferenciais <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="diferenciais_empresa" placeholder="Liste os principais diferenciais..." {...register("diferenciais_empresa")} style={textareaStyle} />
          {errors.diferenciais_empresa && <p style={errorMessageStyle}>{errors.diferenciais_empresa.message}</p>}
        </div>

        <div>
          <label htmlFor="vantagens_empresa" style={fieldLabelStyle}>Vantagens competitivas <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="vantagens_empresa" placeholder="Descreva as vantagens competitivas..." {...register("vantagens_empresa")} style={textareaStyle} />
          {errors.vantagens_empresa && <p style={errorMessageStyle}>{errors.vantagens_empresa.message}</p>}
        </div>

        <div>
          <label htmlFor="usp_empresa" style={fieldLabelStyle}>Proposta de valor única (USP) <span style={{ color: "#FF4D4F" }}>*</span></label>
          <Textarea id="usp_empresa" placeholder="Qual é a proposta de valor única?" {...register("usp_empresa")} style={textareaStyle} />
          {errors.usp_empresa && <p style={errorMessageStyle}>{errors.usp_empresa.message}</p>}
          <p style={helperTextStyle}>A USP (Unique Selling Proposition) é o que faz seu produto ou serviço se destacar.</p>
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}