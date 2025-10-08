"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FormWizard } from "@/components/agent-form/form-wizard";
import { ThankYouStep } from "@/components/agent-form/ThankYouStep";
import { FirstStepForm } from "@/components/agent-form/first-step-form";
import { ThirdStepForm } from "@/components/agent-form/third-step-form";
import { FourthStepForm } from "@/components/agent-form/fourth-step-form";
import { PerfilClienteIdealForm } from "@/components/agent-form/perfil-cliente-ideal-form";
import { FifthStepForm } from "@/components/agent-form/fifth-step-form";
import { InformationStepForm } from "@/components/agent-form/information-step-form";
import { SeventhStepForm } from "@/components/agent-form/seventh-step-form";
import { EighthStepForm } from "@/components/agent-form/eighth-step-form";
import { NinthStepForm } from "@/components/agent-form/ninth-step-form";
import { ThirteenthStepForm } from "@/components/agent-form/thirteenth-step-form";
import { SixteenthStepForm } from "@/components/agent-form/sixteenth-step-form";
import { CustomSelect } from "@/components/ui/custom-select";

interface SubmissionData {
  [key: string]: any;
}

const SESSION_STORAGE_KEY = 'supabase_submission_id';

export default function AgentFormPage() {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [targetEditStep, setTargetEditStep] = useState<number | null>(null);
  const [showInitialForm, setShowInitialForm] = useState(true);
  const [name, setName] = useState('');
  const [agentType, setAgentType] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [fullFormData, setFullFormData] = useState<SubmissionData>({});

  const agentOptions = [
    "Agente SDR", "Agente Closer", "Agente CS", "Agente Financeiro",
    "Agente de Gestão de Dados", "Outro",
  ];

  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const storedId = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedId) {
        const { data, error } = await supabase
          .from('form_agentes')
          .select('*')
          .eq('id', storedId)
          .single();

        if (data && !error) {
          setSubmissionId(storedId);
          setFullFormData(data);
          setName(data.nome_cliente || '');
          setAgentType(data.tipo_agente || '');
          setShowInitialForm(false);
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
      setHasCheckedSession(true);
      setIsLoading(false);
    };

    checkSession();
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    const isNameValid = name.trim().length >= 3;
    const isAgentTypeValid = agentType.startsWith("Outro:")
      ? agentType.split(":")[1].trim().length > 0
      : agentType.length > 0 && agentType !== 'Outro';
    setIsValid(isNameValid && isAgentTypeValid);
  }, [name, agentType]);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    const initialData = {
      nome_cliente: name,
      tipo_agente: agentType,
    };

    const { data, error } = await supabase
      .from('form_agentes')
      .insert(initialData)
      .select('id')
      .single();

    if (error) {
      console.error("Error creating submission:", JSON.stringify(error, null, 2));
      alert(`Ocorreu um erro ao iniciar o formulário: ${error.message}`);
      setIsLoading(false);
      return;
    }

    sessionStorage.setItem(SESSION_STORAGE_KEY, data.id);
    setSubmissionId(data.id);
    setFullFormData(initialData);
    setShowInitialForm(false);
    setIsLoading(false);
  };

  const handleSaveStepData = async (stepData: SubmissionData) => {
    if (!submissionId) return;

    const { error } = await supabase
      .from('form_agentes')
      .update(stepData)
      .eq('id', submissionId);

    if (error) {
      console.error("Error saving step data:", JSON.stringify(error, null, 2));
    } else {
      setFullFormData(prevData => ({ ...prevData, ...stepData }));
    }
  };

  const handleShowSummary = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setShowSummary(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (!hasCheckedSession || isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="animate-pulse"><div className="h-16 w-16 rounded-full bg-white/20"></div></div>
        </div>
      );
    }

    if (showInitialForm) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4" style={{ opacity: pageLoaded ? 1 : 0, transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease' }}>
          <h1 className="font-sans text-white" style={{ fontWeight: 700, fontSize: '54px', marginBottom: '32px' }}>VISION AI</h1>
          <div style={{ backgroundColor: '#000000', borderRadius: '12px', maxWidth: '600px', width: '90%', padding: '32px', border: '1px solid #272727' }}>
            <form onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.95rem', fontWeight: '500', marginBottom: '8px', color: '#FFFFFF' }}>Nome</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome completo" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #272727', backgroundColor: '#060606', color: '#FFFFFF', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s ease' }} onFocus={(e) => e.target.style.borderColor = '#ffffff'} onBlur={(e) => e.target.style.borderColor = '#272727'} />
              </div>
              <div>
                <label htmlFor="agentType" style={{ display: 'block', fontSize: '0.95rem', fontWeight: '500', marginBottom: '8px', color: '#FFFFFF' }}>Qual tipo de Agente você precisa?</label>
                <CustomSelect options={agentOptions} value={agentType} onChange={setAgentType} placeholder="Selecione o tipo de agente" />
              </div>
              <button type="submit" disabled={!isValid} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: isValid ? '#ffffff' : '#333333', color: isValid ? '#000000' : '#666666', fontSize: '1rem', fontWeight: '600', cursor: isValid ? 'pointer' : 'not-allowed', transition: 'all 0.2s ease', opacity: isValid ? 1 : 0.6, marginTop: '8px' }}>
                Iniciar
              </button>
            </form>
          </div>
        </main>
      );
    }

    if (showSummary) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
          <ThankYouStep />
        </main>
      );
    }

    const agentTitle = agentType.startsWith('Outro:') ? agentType.substring(6).trim() : agentType;

    return (
      <div className="min-h-screen bg-black">
        <div style={{ padding: '20px 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '8px' }}>Briefing de {name} para {agentTitle}</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }}>Lembre-se: é extremamente necessário que você responda todas as perguntas corretamente.</p>
            </div>
            <FormWizard onComplete={handleShowSummary} initialStep={targetEditStep || 1} formData={fullFormData}>
              <FirstStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <ThirdStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <FourthStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <PerfilClienteIdealForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <FifthStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <InformationStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} clientName={name} />
              <SeventhStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <EighthStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <NinthStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <ThirteenthStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
              <SixteenthStepForm onSave={handleSaveStepData} onNext={() => {}} submissionId={submissionId} />
            </FormWizard>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '20px', right: '20px', width: '180px', height: '100px', backgroundColor: '#1C1C1C', borderRadius: '8px', border: '1px solid #272727', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" fill="white"/></svg>
        </div>
      </div>
      {renderContent()}
    </>
  );
}