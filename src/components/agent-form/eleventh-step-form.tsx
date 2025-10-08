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

interface EleventhStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  agendamentoHorarios: z.string().min(5, { 
    message: "Por favor, forneça informações sobre seus horários de disponibilidade" 
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function EleventhStepForm({ onNext, formData = {} }: EleventhStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agendamentoHorarios: formData.agendamentoHorarios || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext(data);
  };

  return (
    <FormCard 
      title="Agendamento e Horários"
      description="Informe seus horários de disponibilidade para que possamos agendar as reuniões ou consultas."
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="agendamentoHorarios" style={fieldLabelStyle}>
            Informe seus horários de disponibilidade <span style={{ color: "#FF4D4F" }}>*</span>
          </label>
          <Textarea
            id="agendamentoHorarios"
            placeholder="Exemplo: Disponível de segunda a sexta, das 9h às 12h e das 14h às 18h."
            {...register("agendamentoHorarios")}
            aria-invalid={errors.agendamentoHorarios ? "true" : "false"}
            style={textareaStyle}
            className="scrollbar"
          />
          {errors.agendamentoHorarios && (
            <p style={errorMessageStyle}>
              {errors.agendamentoHorarios.message}
            </p>
          )}
          <p style={helperTextStyle}>
            Por favor, seja específico quanto aos dias da semana e horários que você está disponível para reuniões ou consultas.
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