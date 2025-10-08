"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

interface SixthStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  argumentosVenda: z.string().min(5, { 
    message: "Argumentos de venda são obrigatórios" 
  }),
  gatilhosEmocionais: z.string().min(5, { 
    message: "Gatilhos emocionais são obrigatórios" 
  }),
  informacaoAdicional: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SixthStepForm({ onNext, formData = {} }: SixthStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      argumentosVenda: formData.argumentosVenda || "",
      gatilhosEmocionais: formData.gatilhosEmocionais || "",
      informacaoAdicional: formData.informacaoAdicional || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext(data);
  };

  const textareaStyle = {
    color: "#FFFFFF", 
    padding: "0.75rem",
    minHeight: "120px",
    width: "100%",
    maxWidth: "100%",
    borderRadius: "8px",
    overflow: "auto"
  };

  return (
    <div 
      style={{ 
        backgroundColor: "#000000", 
        borderRadius: "0.5rem", 
        padding: "1.5rem", 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
        border: "none",
        maxWidth: "100%",
        overflow: "hidden"
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          marginBottom: "0.5rem",
          color: "#ffffff"
        }}>
          Abordagem de Vendas
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          Defina os argumentos e gatilhos emocionais que mais funcionam em sua estratégia de vendas.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
          <div>
            <label htmlFor="argumentosVenda" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Principais argumentos de venda <span style={{ color: "#FF4D4F" }}>*</span>
            </label>
            <Textarea
              id="argumentosVenda"
              placeholder='Ex: "15 anos de experiência em causas trabalhistas", "Mais de 10.000 processos ganhos", "Atendimento 24/7 via WhatsApp", "Honorários apenas em caso de êxito", "Equipe especializada em cada área do direito"'
              {...register("argumentosVenda")}
              aria-invalid={errors.argumentosVenda ? "true" : "false"}
              style={textareaStyle}
              className="scrollbar"
            />
            {errors.argumentosVenda && (
              <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>
                {errors.argumentosVenda.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gatilhosEmocionais" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Gatilhos emocionais a serem utilizados <span style={{ color: "#FF4D4F" }}>*</span>
            </label>
            <Textarea
              id="gatilhosEmocionais"
              placeholder='Ex: Urgência: "Prazo prescricional próximo do fim", Segurança: "Mais de 5.000 clientes satisfeitos", Escassez: "Agenda limitada para novos casos", Prova social: "Cases de sucesso similares", Autoridade: "Especialistas reconhecidos na área"'
              {...register("gatilhosEmocionais")}
              aria-invalid={errors.gatilhosEmocionais ? "true" : "false"}
              style={textareaStyle}
              className="scrollbar"
            />
            {errors.gatilhosEmocionais && (
              <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>
                {errors.gatilhosEmocionais.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="informacaoAdicional" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Informação adicional
            </label>
            <Textarea
              id="informacaoAdicional"
              placeholder="Existe alguma informação adicional que você precisa nos enviar? Se sim, insira neste campo e não economize palavras."
              {...register("informacaoAdicional")}
              style={{...textareaStyle, minHeight: "150px"}}
              className="scrollbar"
            />
          </div>
        </div>

        <div style={{ paddingTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" style={{ display: "none" }}>
            Próximo
          </button>
        </div>
      </form>
    </div>
  );
}