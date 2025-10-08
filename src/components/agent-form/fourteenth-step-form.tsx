"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import NeonCheckbox from "../ui/neon-checkbox";
import { 
  FormCard, 
  fieldLabelStyle,
  errorMessageStyle,
  helperTextStyle,
  hiddenButtonStyle
} from "./form-styles";

interface FourteenthStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  assistiuVideo: z.boolean().refine(value => value === true, {
    message: "Você precisa assistir o vídeo antes de prosseguir",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function FourteenthStepForm({ onNext, formData = {} }: FourteenthStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assistiuVideo: formData.assistiuVideo || false,
    },
  });

  const assistiuVideo = watch("assistiuVideo");

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext(data);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setValue("assistiuVideo", checked, { shouldValidate: true });
  };

  return (
    <FormCard 
      title="Preencha corretamente o Fluxo de Etapas do Agente IA"
      description="Assista ao vídeo abaixo para entender como preencher corretamente o fluxo de etapas do seu agente de IA."
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div 
          style={{ 
            position: "relative",
            paddingBottom: "56.25%", /* Proporção 16:9 */
            height: 0,
            overflow: "hidden",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            animation: "fadeIn 0.5s ease-in-out", // Animação suave
            transition: "all 0.3s ease-in-out" // Transição suave
          }}
        >
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Como preencher o fluxo de etapas do agente IA" 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <div style={{ padding: "6px 0" }}>
            <NeonCheckbox
              id="assistiuVideo"
              checked={assistiuVideo}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
          <div>
            <label 
              htmlFor="assistiuVideo" 
              style={{ ...fieldLabelStyle, marginBottom: "0.25rem", cursor: "pointer" }}
              onClick={() => handleCheckboxChange(!assistiuVideo)}
            >
              Confirmo que assisti ao vídeo <span style={{ color: "#FF4D4F" }}>*</span>
            </label>
            {errors.assistiuVideo && (
              <p style={errorMessageStyle}>{errors.assistiuVideo.message}</p>
            )}
            <p style={helperTextStyle}>
              É importante assistir o vídeo completo para entender como preencher corretamente o fluxo de etapas.
            </p>
          </div>
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