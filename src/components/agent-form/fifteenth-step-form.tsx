"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { FileText, Save, Edit, Trash2 } from "lucide-react";

interface FifteenthStepFormProps {
  onNext: (data: any) => void;
  formData?: any;
}

// Definir o esquema de validação
const formSchema = z.object({
  fluxoEtapas: z.string().min(5, { 
    message: "O fluxo de etapas é obrigatório" 
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Template padrão
const DEFAULT_TEMPLATE = `### Etapa 1: Introdução

- Condições:
É o início da conversa.
O nome do lead não é conhecido.

- Ações:
Cumprimentar o lead de forma amigável e profissional.
Apresentar-se como representante da empresa.
Perguntar o nome do lead de maneira cortês.
Perguntar se é um bom momento para conversar. (para abordagem ativa)

- Exemplo de Mensagem:
"Olá! Aqui é [Seu Nome] da [Nome da Empresa]. Com quem tenho o prazer de falar?"
Após o lead informar o nome: "Prazer em conhecê-lo(a), [Nome do Lead]! Podemos conversar agora?"

- Notas:
Use linguagem cordial e evite ser invasivo.
Respeite a disponibilidade do lead.

---

### Etapa 2: Análise da Necessidade

- Condições:
O nome do lead é conhecido.
Ainda não se sabe como o produto pode ajudar o lead.

- Objetivo:
Mapear o perfil e as necessidades do cliente.
Compreender os desafios e objetivos do lead.

- Perguntas (fazer uma de cada vez):
"O que motivou você a entrar em contato conosco?"
"Qual o seu faturamento atual?"

- Ações:
Escutar atentamente as respostas do lead.
Demonstrar empatia e interesse genuíno.
Anotar informações importantes para uso posterior.

- Notas:
Evite perguntas fechadas que possam ser respondidas com "sim" ou "não".
Adapte as perguntas conforme as respostas do lead.

- Critérios de Qualificação:
Lead Qualificado:
Lead Desqualificado:

---

### Etapa 3: Apresentação da Solução

- Condições:
Todas as informações necessárias foram coletadas na Etapa 2.
O Agente compreende as necessidades do lead.

- Objetivo:
Apresentar uma solução alinhada às necessidades específicas do lead.
Destacar benefícios e diferenciais relevantes.

- Ações:

- Confirmar o entendimento das necessidades do lead.
"Se entendi corretamente, você está buscando [resumo da necessidade]."

- Apresentar a solução de forma clara e personalizada.
"Nós oferecemos [produto/serviço] que pode ajudar você a [benefício específico]."

- Fornecer exemplos ou casos de sucesso, se apropriado.
Estar preparado para responder a perguntas adicionais.

- Exemplo de Mensagem:
"Compreendo que você deseja melhorar [aspecto específico]. Nossa solução oferece [funcionalidade] que pode ajudá-lo(a) a alcançar [objetivo]."

- Notas:
Evite jargões técnicos.
Foque nos benefícios para o lead, não apenas nas características do produto.

---

### Etapa 4: Agendamento de Reunião

- Condições:
Lead é qualificado e demonstra interesse.
Agente sabe como o produto pode ajudar o lead.
Lead está aberto a agendar uma reunião.

- Objetivo:
Agendar uma reunião com um representante comercial.
Coletar informações necessárias para o agendamento.

- Informações Necessárias:
Nome completo (se ainda não confirmado).
E-mail para envio de confirmação.
Número de WhatsApp ou telefone para contato.
Data e horário preferidos para a reunião.

- Ações:

- Confirmar o interesse em agendar.
"Ficaria feliz em agendar uma reunião para discutirmos mais detalhes. O que acha?"

- Oferecer opções de datas e horários.
"Qual seria o melhor dia e horário para você? Temos disponibilidade em [opções]."

- Coletar e confirmar as informações de contato.
"Poderia me fornecer seu e-mail e número de WhatsApp para enviarmos a confirmação?"

- Exemplo de Mensagem:
"Excelente, [Nome do Lead]! Para avançarmos, vamos agendar uma reunião. Qual é o melhor horário para você?"

- Notas:
Facilite o processo de agendamento.
Seja flexível com os horários para acomodar o lead.

---

### Etapa 5: Encerramento

- Condições:
Lead Qualificado: Reunião agendada com sucesso.
Lead Não Qualificado: Lead não atende aos critérios ou não demonstra interesse em prosseguir.

- Objetivo:

- Para Lead Qualificado:
Reforçar a confirmação da reunião.
Agradecer o interesse e o tempo do lead.
Informar sobre os próximos passos.

- Para Lead Não Qualificado:
Agradecer o interesse demonstrado.
Oferecer recursos adicionais (por exemplo, materiais informativos).
Atualizar o status no CRM como desqualificado.

- Ações:

- Lead Qualificado:
"Perfeito, [Nome do Lead]! A reunião está marcada para [data e horário]. Você receberá um e-mail com todos os detalhes. Agradeço seu tempo e estou à disposição para qualquer dúvida."

- Lead Não Qualificado:
"Entendo, [Nome do Lead]. Agradeço seu interesse. Se precisar de algo no futuro, estamos à disposição. Tenha um ótimo dia!"`;

export function FifteenthStepForm({ onNext, formData = {} }: FifteenthStepFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [hasTemplate, setHasTemplate] = useState<boolean>(!!formData.fluxoEtapas);
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fluxoEtapas: formData.fluxoEtapas || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setIsEditing(false);
    onNext(data);
  };

  const handleGerarTemplate = () => {
    if (hasTemplate) {
      // Limpar o template
      setValue("fluxoEtapas", "");
      setHasTemplate(false);
    } else {
      // Gerar o template
      setValue("fluxoEtapas", DEFAULT_TEMPLATE);
      setHasTemplate(true);
    }
  };

  const handleSaveEdit = () => {
    if (isEditing) {
      // Salvar
      if (getValues("fluxoEtapas")) {
        setIsEditing(false);
        setHasTemplate(true);
      }
    } else {
      // Editar
      setIsEditing(true);
    }
  };

  const textareaStyle = {
    color: "#FFFFFF", 
    padding: "0.75rem",
    minHeight: "400px",
    width: "100%",
    maxWidth: "100%",
    borderRadius: "8px",
    overflow: "auto",
    fontFamily: "monospace",
    backgroundColor: "#0a0a0a",
    lineHeight: "1.5"
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h2 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "bold",
            background: "linear-gradient(to right, #ffffff, #888888)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Fluxo de Etapas do Agente de I.A
          </h2>
          <button
            type="button"
            onClick={handleGerarTemplate}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: hasTemplate ? "rgba(255, 75, 75, 0.1)" : "rgba(255, 255, 255, 0.1)",
              color: hasTemplate ? "#FF4D4F" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out"
            }}
          >
            {hasTemplate ? (
              <>
                <Trash2 size={18} />
                <span>Apagar template</span>
              </>
            ) : (
              <>
                <FileText size={18} />
                <span>Gerar template</span>
              </>
            )}
          </button>
        </div>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          Nesta etapa, você pode definir o fluxo de etapas personalizado para o seu Agente IA. Sinta-se à vontade para estruturar as informações da maneira que melhor se adeque ao seu processo de vendas e atendimento.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
          <div>
            <Textarea
              id="fluxoEtapas"
              placeholder="Insira aqui o fluxo de etapas do seu Agente IA. Você pode gerar um template clicando no botão acima."
              {...register("fluxoEtapas")}
              aria-invalid={errors.fluxoEtapas ? "true" : "false"}
              style={{...textareaStyle, opacity: isEditing ? 1 : 0.8}}
              className="scrollbar"
              disabled={!isEditing}
            />
            {errors.fluxoEtapas && (
              <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#f87171" }}>
                {errors.fluxoEtapas.message}
              </p>
            )}
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)", marginTop: "0.5rem" }}>
              Organize seu fluxo de etapas de forma clara e estruturada para que o Agente IA possa seguir corretamente.
            </p>
          </div>
        </div>

        <div style={{ paddingTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button
            type="button"
            onClick={handleSaveEdit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: isEditing ? "#ffffff" : "rgba(255, 255, 255, 0.1)",
                color: isEditing ? "#000000" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out"
            }}
          >
            {isEditing ? (
              <>
                <Save size={18} />
                <span>Salvar e Concluir</span>
              </>
            ) : (
              <>
                <Edit size={18} />
                <span>Editar</span>
              </>
            )}
          </button>
          <button 
            type="submit" 
            style={{ 
              display: "none"
            }}
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
}