"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useDebouncedCallback } from "use-debounce";
import { formSchema, FormData as FormValues } from './form-types';

interface SixteenthStepFormProps {
  onSave: (data: Partial<FormValues>) => void;
  onNext: () => void;
  submissionId: string | null;
  formData: FormValues;
}


type StepValues = Pick<FormValues, 'info_adicional_final'>;

export function SixteenthStepForm({ onSave, onNext, formData }: SixteenthStepFormProps) {
  const { register, handleSubmit, watch, reset } = useForm<StepValues>({
    resolver: zodResolver(formSchema.pick({
      info_adicional_final: true,
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
    <div style={{ backgroundColor: "#000000", borderRadius: "0.5rem", padding: "1.5rem", border: "none", maxWidth: "100%" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", background: "linear-gradient(to right, #ffffff, #888888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
          Informações extra
        </h2>
        <p style={{ color: "#ffffff" }}>
          Existe algum tipo de informação que não lhe foi solicitada e você gostaria de nos enviar? Se sim, insira neste campo.
        </p>
      </div>
      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="info_adicional_final" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#FFFFFF" }}>
            Informações adicionais
          </label>
          <Textarea
            id="info_adicional_final"
            placeholder='Ex: "Gostaríamos que o agente tivesse um tom um pouco mais informal ao lidar com leads que se identificam como ''startups em estágio inicial''. Também temos uma lista de concorrentes que o agente NUNCA deve mencionar, posso enviar em anexo por email."'
            {...register("info_adicional_final")}
            style={{ color: "#FFFFFF", padding: "0.75rem", minHeight: "200px", backgroundColor: "#0a0a0a", borderRadius: "8px" }}
          />
          <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)", marginTop: "0.5rem" }}>
            Este campo é opcional.
          </p>
        </div>
        <button type="submit" style={{ display: "none" }}>Submit</button>
      </form>
    </div>
  );
}
