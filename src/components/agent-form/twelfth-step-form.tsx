"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { 
  FormCard, 
  fieldLabelStyle,
  errorMessageStyle,
  helperTextStyle,
  hiddenButtonStyle
} from "./form-styles";

interface TwelfthStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  apiKey: z.string().min(1, { 
    message: "A API Key é obrigatória" 
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function TwelfthStepForm({ onNext, formData = {} }: TwelfthStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: formData.apiKey || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext(data);
  };

  return (
    <FormCard 
      title="API Key OpenAI"
      description="Insira sua API Key da OpenAI para que possamos integrar o serviço com o seu agente de IA."
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
            title="Como obter sua API Key da OpenAI" 
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
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.875rem" }}>
          Assista ao vídeo acima para aprender como obter sua API Key da OpenAI e como inseri-la no formulário.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="apiKey" style={fieldLabelStyle}>
            API Key <span style={{ color: "#FF4D4F" }}>*</span>
          </label>
          <Input
            id="apiKey"
            type="password"
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            {...register("apiKey")}
            aria-invalid={errors.apiKey ? "true" : "false"}
            style={{
              color: "#FFFFFF", 
              padding: "0.75rem",
              backgroundColor: "#0a0a0a",
              borderRadius: "8px",
              border: "1px solid #272727",
              transition: "all 0.3s ease-in-out" // Transição suave
            }}
          />
          {errors.apiKey && (
            <p style={errorMessageStyle}>
              {errors.apiKey.message}
            </p>
          )}
          <p style={helperTextStyle}>
            Sua API Key será armazenada com segurança e utilizada apenas para as funcionalidades de IA do seu agente.
          </p>
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