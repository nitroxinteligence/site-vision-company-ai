"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { 
  FormCard, 
  textareaStyle, 
  fieldLabelStyle,
  errorMessageStyle,
  helperTextStyle,
  hiddenButtonStyle
} from "./form-styles";

interface TenthStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  politicaCancelamento: z.string().min(5, { 
    message: "Por favor, forneça informações sobre a política de cancelamento" 
  }),
  politicaReembolso: z.string().min(5, { 
    message: "Por favor, forneça informações sobre a política de reembolso" 
  }),
  termos: z.string().min(5, { 
    message: "Por favor, forneça informações sobre os termos de uso" 
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function TenthStepForm({ onNext, formData = {} }: TenthStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      politicaCancelamento: formData.politicaCancelamento || "",
      politicaReembolso: formData.politicaReembolso || "",
      termos: formData.termos || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext(data);
  };

  return (
    <FormCard 
      title="Políticas e Termos"
      description="Configure as políticas de cancelamento, reembolso e termos de uso."
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="politicaCancelamento" style={fieldLabelStyle}>
            Política de cancelamento <span style={{ color: "#FF4D4F" }}>*</span>
          </label>
          <Textarea
            id="politicaCancelamento"
            placeholder="Descreva sua política de cancelamento."
            {...register("politicaCancelamento")}
            aria-invalid={errors.politicaCancelamento ? "true" : "false"}
            style={textareaStyle}
          />
          {errors.politicaCancelamento && (
            <p style={errorMessageStyle}>
              {errors.politicaCancelamento.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="politicaReembolso" style={fieldLabelStyle}>
            Política de reembolso <span style={{ color: "#FF4D4F" }}>*</span>
          </label>
          <Textarea
            id="politicaReembolso"
            placeholder="Descreva sua política de reembolso."
            {...register("politicaReembolso")}
            aria-invalid={errors.politicaReembolso ? "true" : "false"}
            style={textareaStyle}
          />
          {errors.politicaReembolso && (
            <p style={errorMessageStyle}>
              {errors.politicaReembolso.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="termos" style={fieldLabelStyle}>
            Termos de uso <span style={{ color: "#FF4D4F" }}>*</span>
          </label>
          <Textarea
            id="termos"
            placeholder="Descreva os termos de uso do seu serviço."
            {...register("termos")}
            aria-invalid={errors.termos ? "true" : "false"}
            style={textareaStyle}
          />
          {errors.termos && (
            <p style={errorMessageStyle}>
              {errors.termos.message}
            </p>
          )}
        </div>

        <div style={{ paddingTop: "0.5rem" }}>
          <button type="submit" style={hiddenButtonStyle}>
            Próximo
          </button>
        </div>
      </form>
    </FormCard>
  );
} 