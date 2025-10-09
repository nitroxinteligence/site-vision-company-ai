"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { z } from "zod";
import { formSchema, FormData as FormValues } from './form-types';

// Key for localStorage

interface FirstStepFormProps {
  onNext: (data: Partial<FormValues>) => void;
  onSave: (data: Partial<FormValues>) => void;
  formData: Partial<FormValues>;
  submissionId: string | null;
}

// Define the schema for this step
const stepSchema = formSchema.pick({
  nome_agente: true,
  descricao_agente: true,
  personalidade_agente: true,
  instrucoes_agente: true,
  regras_agente: true,
  tom_de_voz_agente: true,
  comportamentos_agente: true,
  habilidades_agente: true,
  foco_agente: true,
  procedimentos_agente: true,
  limites_agente: true,
  estilo_linguagem_agente: true,
  objetivos_agente: true,
  saudacao_agente: true,
  politica_perguntas_nao_respondidas: true,
  publico_alvo_agente: true,
});

type StepValues = z.infer<typeof stepSchema>;

export function FirstStepForm({ onNext, onSave, formData }: FirstStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<StepValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const onSubmit = (data: StepValues) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Dados do Agente de I.A Personalizado
        </h2>
        <p className="text-gray-300">Preencha os campos abaixo para configurar seu Agente de I.A personalizado.</p>
      </div>

      <form id="form-wizard-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome_agente">Nome <span className="text-red-500">*</span></Label>
            <Input id="nome_agente" placeholder='Ex: "Beatriz", assistente virtual da Vision.ai' {...register("nome_agente")} />
            {errors.nome_agente && <p className="text-red-500 text-sm mt-1">{errors.nome_agente.message}</p>}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao_agente">Descrição <span className="text-red-500">*</span></Label>
            <Input id="descricao_agente" placeholder="Ex: Representante comercial da EMPRESA X" {...register("descricao_agente")} />
            {errors.descricao_agente && <p className="text-red-500 text-sm mt-1">{errors.descricao_agente.message}</p>}
          </div>
        </div>

        {/* Personalidade */}
        <div className="space-y-2">
          <Label htmlFor="personalidade_agente">Qual personalidade você deseja para o Agente de IA? <span className="text-red-500">*</span></Label>
          <Textarea id="personalidade_agente" placeholder="Ex: Uma personalidade amigável e entusiasmada..." {...register("personalidade_agente")} />
          {errors.personalidade_agente && <p className="text-red-500 text-sm mt-1">{errors.personalidade_agente.message}</p>}
        </div>

        {/* Instruções */}
        <div className="space-y-2">
          <Label htmlFor="instrucoes_agente">Quais instruções você quer dar para o Agente de IA? <span className="text-red-500">*</span></Label>
          <Textarea id="instrucoes_agente" placeholder="Ex: Fornecer informações detalhadas sobre nossos produtos..." {...register("instrucoes_agente")} />
          {errors.instrucoes_agente && <p className="text-red-500 text-sm mt-1">{errors.instrucoes_agente.message}</p>}
        </div>

        {/* Regras */}
        <div className="space-y-2">
          <Label htmlFor="regras_agente">Quais regras você quer inserir? <span className="text-red-500">*</span></Label>
          <Textarea id="regras_agente" placeholder="Ex: Não utilizar linguagem técnica complicada..." {...register("regras_agente")} />
          {errors.regras_agente && <p className="text-red-500 text-sm mt-1">{errors.regras_agente.message}</p>}
        </div>

        {/* Tom de Voz */}
        <div className="space-y-2">
          <Label htmlFor="tom_de_voz_agente">Qual deve ser o tom de voz do Agente de IA? <span className="text-red-500">*</span></Label>
          <Input id="tom_de_voz_agente" placeholder="Ex: Um tom cordial e profissional..." {...register("tom_de_voz_agente")} />
          {errors.tom_de_voz_agente && <p className="text-red-500 text-sm mt-1">{errors.tom_de_voz_agente.message}</p>}
        </div>

        {/* Comportamentos */}
        <div className="space-y-2">
          <Label htmlFor="comportamentos_agente">Quais comportamentos o Agente de IA deve adotar ou evitar? <span className="text-red-500">*</span></Label>
          <Textarea id="comportamentos_agente" placeholder="Ex: Deve ser proativo em oferecer ajuda..." {...register("comportamentos_agente")} />
          {errors.comportamentos_agente && <p className="text-red-500 text-sm mt-1">{errors.comportamentos_agente.message}</p>}
        </div>

        {/* Habilidades */}
        <div className="space-y-2">
          <Label htmlFor="habilidades_agente">Quais habilidades o Agente de IA deve demonstrar? <span className="text-red-500">*</span></Label>
          <Textarea id="habilidades_agente" placeholder="Ex: Conhecimento profundo sobre nossos serviços..." {...register("habilidades_agente")} />
          {errors.habilidades_agente && <p className="text-red-500 text-sm mt-1">{errors.habilidades_agente.message}</p>}
        </div>

        {/* Foco */}
        <div className="space-y-2">
          <Label htmlFor="foco_agente">Há algum foco específico que o Agente de IA deve manter? <span className="text-red-500">*</span></Label>
          <Textarea id="foco_agente" placeholder="Ex: Manter o foco em entender as necessidades do cliente..." {...register("foco_agente")} />
          {errors.foco_agente && <p className="text-red-500 text-sm mt-1">{errors.foco_agente.message}</p>}
        </div>

        {/* Procedimentos */}
        <div className="space-y-2">
          <Label htmlFor="procedimentos_agente">Existem procedimentos específicos que o Agente de IA deve seguir? <span className="text-red-500">*</span></Label>
          <Textarea id="procedimentos_agente" placeholder="Ex: Se o cliente expressar insatisfação..." {...register("procedimentos_agente")} />
          {errors.procedimentos_agente && <p className="text-red-500 text-sm mt-1">{errors.procedimentos_agente.message}</p>}
        </div>

        {/* Limites */}
        <div className="space-y-2">
          <Label htmlFor="limites_agente">Quais limites o Agente de IA não deve ultrapassar? <span className="text-red-500">*</span></Label>
          <Textarea id="limites_agente" placeholder="Ex: Não deve fornecer informações pessoais ou confidenciais..." {...register("limites_agente")} />
          {errors.limites_agente && <p className="text-red-500 text-sm mt-1">{errors.limites_agente.message}</p>}
        </div>

        {/* Estilo de Linguagem */}
        <div className="space-y-2">
          <Label htmlFor="estilo_linguagem_agente">Há algum estilo de linguagem que o Agente de IA deve usar? <span className="text-red-500">*</span></Label>
          <Textarea id="estilo_linguagem_agente" placeholder="Ex: Utilizar frases curtas e claras..." {...register("estilo_linguagem_agente")} />
          {errors.estilo_linguagem_agente && <p className="text-red-500 text-sm mt-1">{errors.estilo_linguagem_agente.message}</p>}
        </div>

        {/* Objetivos */}
        <div className="space-y-2">
          <Label htmlFor="objetivos_agente">Quais são os objetivos principais que o Agente de IA deve alcançar? <span className="text-red-500">*</span></Label>
          <Textarea id="objetivos_agente" placeholder="Ex: Aumentar a satisfação do cliente..." {...register("objetivos_agente")} />
          {errors.objetivos_agente && <p className="text-red-500 text-sm mt-1">{errors.objetivos_agente.message}</p>}
        </div>

        {/* Saudação */}
        <div className="space-y-2">
          <Label htmlFor="saudacao_agente">O Agente de IA deve usar alguma saudação específica? <span className="text-red-500">*</span></Label>
          <Textarea id="saudacao_agente" placeholder="Ex: Começar com 'Olá, seja bem-vindo...'" {...register("saudacao_agente")} />
          {errors.saudacao_agente && <p className="text-red-500 text-sm mt-1">{errors.saudacao_agente.message}</p>}
        </div>

        {/* Política de Perguntas Não Respondidas */}
        <div className="space-y-2">
          <Label htmlFor="politica_perguntas_nao_respondidas">Como o Agente de IA deve lidar com perguntas que não sabe responder? <span className="text-red-500">*</span></Label>
          <Textarea id="politica_perguntas_nao_respondidas" placeholder="Ex: Admitir que não possui a informação..." {...register("politica_perguntas_nao_respondidas")} />
          {errors.politica_perguntas_nao_respondidas && <p className="text-red-500 text-sm mt-1">{errors.politica_perguntas_nao_respondidas.message}</p>}
        </div>

        {/* Público Alvo */}
        <div className="space-y-2">
          <Label htmlFor="publico_alvo_agente">Há algum público-alvo específico que o Agente de IA deve considerar? <span className="text-red-500">*</span></Label>
          <Textarea id="publico_alvo_agente" placeholder="Ex: Jovens adultos entre 25 e 35 anos..." {...register("publico_alvo_agente")} />
          {errors.publico_alvo_agente && <p className="text-red-500 text-sm mt-1">{errors.publico_alvo_agente.message}</p>}
        </div>
      </form>
    </div>
  );
}
