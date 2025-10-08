"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { FormCard, textareaStyle, fieldLabelStyle, errorMessageStyle, helperTextStyle, hiddenButtonStyle } from "./form-styles";
import { useDebouncedCallback } from "use-debounce";

interface ThirteenthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: Record<string, any>;
}

const formSchema = z.object({
  links_importantes: z.string().min(1, { message: "Este campo é obrigatório" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ThirteenthStepForm({ onSave, onNext, formData = {} }: ThirteenthStepFormProps) {
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
    <FormCard title="Acessos e/ou Links" description="Compartilhe links de acesso que sejam importantes para nós.">
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="links_importantes" style={fieldLabelStyle}>Links importantes<span style={{ color: '#FF4D4F' }}> *</span></label>
          <Textarea id="links_importantes" placeholder="Adicione aqui links relevantes..." {...register("links_importantes")} style={{ ...textareaStyle, borderColor: errors.links_importantes ? '#FF4D4F' : textareaStyle.borderColor }} />
          {errors.links_importantes && <p style={errorMessageStyle}>{errors.links_importantes.message}</p>}
          <p style={helperTextStyle}>Exemplos: Links para sistemas, dashboards, documentações, etc.</p>
        </div>
        <button type="submit" style={hiddenButtonStyle}>Submit</button>
      </form>
    </FormCard>
  );
}