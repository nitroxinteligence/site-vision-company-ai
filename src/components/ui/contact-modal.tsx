"use client";

import React, { useState, useEffect } from 'react';
import { useModal } from '@/components/providers/modal-provider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

// Estilos CSS para animações personalizadas
const modalStyles = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, 20px, 0);
    }
  }

  .modal-fade-in {
    animation: fadeInDown 0.15s ease-out forwards;
  }

  .modal-fade-out {
    animation: fadeOutDown 0.15s ease-out forwards;
  }

  .overlay-fade-in {
    animation: fadeIn 0.15s ease-out forwards;
  }

  .overlay-fade-out {
    animation: fadeOut 0.15s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  atuacao: string;
  prazoFranquia: string;
  investimento: string;
}

// Interface para eventos do dataLayer
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

// Função para enviar eventos para o dataLayer
const pushToDataLayer = (eventData: DataLayerEvent) => {
  if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: DataLayerEvent[] }).dataLayer) {
    (window as unknown as { dataLayer: DataLayerEvent[] }).dataLayer.push(eventData);
    console.log('DataLayer Event:', eventData); // Para debug
  }
};

// Função para calcular progresso do formulário
const calculateFormProgress = (formData: FormData) => {
  const totalFields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
  return Math.round((filledFields / totalFields) * 100);
};

// Função para remover formatação do telefone (apenas números)
const removePhoneFormatting = (phone: string) => {
  return phone.replace(/\D/g, '');
};

export const ContactModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [overlayAnimationClass, setOverlayAnimationClass] = useState('');
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    atuacao: '',
    prazoFranquia: '',
    investimento: ''
  });
  const [emailError, setEmailError] = useState('');

  // Injeta os estilos CSS no documento
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = modalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Controla as animações de entrada e saída
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      setAnimationClass('modal-fade-in');
      setOverlayAnimationClass('overlay-fade-in');
    } else if (isVisible) {
      setIsAnimating(true);
      setAnimationClass('modal-fade-out');
      setOverlayAnimationClass('overlay-fade-out');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        setAnimationClass('');
        setOverlayAnimationClass('');
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  // Validação do email com tracking
  const validateEmail = (email: string) => {
    const isValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email && !isValid) {
      setEmailError('Por favor, insira um email válido.');
      
      // Track email validation error
      pushToDataLayer({
        event: 'email_validation_error',
        form_name: 'contact_modal',
        field_name: 'email',
        email_value: email,
        error_message: 'Invalid email format',
        timestamp: new Date().toISOString()
      });
      
      return false;
    } else if (email && isValid) {
      setEmailError('');
      
      // Track successful email validation
      pushToDataLayer({
        event: 'email_validation_success',
        form_name: 'contact_modal',
        field_name: 'email',
        email_value: email,
        timestamp: new Date().toISOString()
      });
      
      return true;
    }
    
    setEmailError('');
    return true;
  };

  // Verifica se todos os campos estão preenchidos e se o email é válido
  const isFormValid = Object.values(formData).every(value => value.trim() !== '') && formData.telefone.replace(/\D/g, '').length >= 10 && emailError === '';

  // Função para formatar telefone com +55 automático
  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Se não há números, retorna vazio
    if (!numbers) return '';
    
    // Se começa com 55, mantém como está
    if (numbers.startsWith('55')) {
      // Formata: +55 (XX) XXXXX-XXXX
      if (numbers.length <= 2) return `+${numbers}`;
      if (numbers.length <= 4) return `+${numbers.slice(0, 2)} (${numbers.slice(2)}`;
      if (numbers.length <= 9) return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4)}`;
      if (numbers.length <= 13) {
        return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 9)}-${numbers.slice(9, 13)}`;
      }
      // Limita a 13 dígitos (55 + 11 dígitos do número)
      return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 9)}-${numbers.slice(9, 13)}`;
    } else {
      // Adiciona +55 automaticamente
      const fullNumber = '55' + numbers;
      if (fullNumber.length <= 2) return `+${fullNumber}`;
      if (fullNumber.length <= 4) return `+${fullNumber.slice(0, 2)} (${fullNumber.slice(2)}`;
      if (fullNumber.length <= 9) return `+${fullNumber.slice(0, 2)} (${fullNumber.slice(2, 4)}) ${fullNumber.slice(4)}`;
      if (fullNumber.length <= 13) {
        return `+${fullNumber.slice(0, 2)} (${fullNumber.slice(2, 4)}) ${fullNumber.slice(4, 9)}-${fullNumber.slice(9, 13)}`;
      }
      // Limita a 13 dígitos (55 + 11 dígitos do número)
      return `+${fullNumber.slice(0, 2)} (${fullNumber.slice(2, 4)}) ${fullNumber.slice(4, 9)}-${fullNumber.slice(9, 13)}`;
    }
  };

  // Handler específico para o campo telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    
    setFormData(prev => ({ ...prev, telefone: formattedPhone }));
    
    // Track phone field interaction
    pushToDataLayer({
      event: 'form_field_change',
      form_name: 'contact_modal',
      field_name: 'telefone',
      field_type: 'tel',
      field_value: formattedPhone,
      form_progress: calculateFormProgress({ ...formData, telefone: formattedPhone }),
      timestamp: new Date().toISOString()
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'telefone') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData(prev => {
      const newFormData = { ...prev, [name]: processedValue };
      
      // Track field change
      pushToDataLayer({
        event: 'form_field_change',
        form_name: 'contact_modal',
        field_name: name,
        field_type: 'input',
        field_value_length: processedValue.length,
        form_progress: calculateFormProgress(newFormData),
        timestamp: new Date().toISOString()
      });

      return newFormData;
    });

    if (name === 'email') {
      validateEmail(processedValue);
    }
  };

  // Handlers específicos para campos select com tracking
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track select field interaction
    pushToDataLayer({
      event: 'form_field_select',
      form_name: 'contact_modal',
      field_name: field,
      field_value: value,
      field_type: 'select',
      form_progress: calculateFormProgress({ ...formData, [field]: value }),
      timestamp: new Date().toISOString()
    });

    // Track specific business insights
    if (field === 'investimento') {
      pushToDataLayer({
        event: 'investment_level_selected',
        investment_range: value,
        lead_value_indicator: getConversionValue(value),
        timestamp: new Date().toISOString()
      });
    }

    if (field === 'atuacao') {
      pushToDataLayer({
        event: 'business_area_selected',
        business_area: value,
        target_audience: value,
        timestamp: new Date().toISOString()
      });
    }

    if (field === 'prazoFranquia') {
      pushToDataLayer({
        event: 'franchise_timeline_selected',
        timeline: value,
        urgency_level: value === 'Imediatamente' ? 'high' : value === 'Em até 3 meses' ? 'medium' : 'low',
        timestamp: new Date().toISOString()
      });
    }
  };

  // Função para calcular qualidade do lead
  const calculateLeadQuality = (data: FormData) => {
    let score = 0;
    
    // Pontuação baseada no investimento
    if (data.investimento === 'mais-140mil') score += 40;
    else if (data.investimento === '70mil-140mil') score += 30;
    else if (data.investimento === 'ate-70mil') score += 20;
    
    // Pontuação baseada no prazo
    if (data.prazoFranquia === 'ate-30-dias') score += 30;
    else if (data.prazoFranquia === 'ate-60-dias') score += 25;
    else if (data.prazoFranquia === 'ate-90-dias') score += 20;
    else score += 10;
    
    // Pontuação baseada na atuação
    if (data.atuacao === 'empresario') score += 20;
    else if (data.atuacao === 'autonomo') score += 15;
    else score += 10;
    
    // Pontuação por ter email e telefone válidos
    if (data.email && !emailError) score += 10;
    
    return Math.min(score, 100);
  };

  // Função para calcular valor da conversão
  const getConversionValue = (investimento: string) => {
    switch (investimento) {
      case 'mais-140mil': return 140000;
      case '70mil-140mil': return 105000;
      case 'ate-70mil': return 70000;
      default: return 0;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    
    if (!isFormValid || !isEmailValid) {
      // Track failed submit attempt
      pushToDataLayer({
        event: 'form_submit_failed',
        form_name: 'contact_modal',
        failure_reason: !isEmailValid ? 'invalid_email' : 'incomplete_form',
        form_progress: calculateFormProgress(formData),
        filled_fields: Object.entries(formData).filter(([, value]) => value.trim() !== '').map(([key]) => key),
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Track successful form submission
    pushToDataLayer({
      event: 'form_submit_success',
      form_name: 'contact_modal',
      form_data: {
        nome: formData.nome,
        email: formData.email,
        telefone: removePhoneFormatting(formData.telefone),
        atuacao: formData.atuacao,
        prazo_franquia: formData.prazoFranquia,
        investimento: formData.investimento
      },
      form_progress: 100,
      lead_quality_score: calculateLeadQuality(formData),
      timestamp: new Date().toISOString()
    });

    // Track conversion event
    pushToDataLayer({
      event: 'conversion',
      conversion_type: 'lead_generation',
      conversion_value: getConversionValue(formData.investimento),
      lead_source: 'contact_modal',
      user_profile: {
        atuacao: formData.atuacao,
        prazo_franquia: formData.prazoFranquia,
        investimento: formData.investimento
      },
      timestamp: new Date().toISOString()
    });
    
    const message = `
      Olá! Tenho interesse na consultoria da Vision AI.
      Seguem meus dados:
      Nome: ${formData.nome}
      Email: ${formData.email}
      Telefone: ${formData.telefone}
      Atuação: ${formData.atuacao}
      Prazo para assumir a franquia: ${formData.prazoFranquia}
      Investimento: ${formData.investimento}
    `;

    const whatsappUrl = `https://wa.me/5581998132001?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    closeModal();
    
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      atuacao: '',
      prazoFranquia: '',
      investimento: ''
    });
    setEmailError('');
  };

  // Track modal open
  useEffect(() => {
    if (isOpen && isVisible) {
      pushToDataLayer({
        event: 'modal_open',
        modal_name: 'contact_modal',
        modal_type: 'lead_generation',
        timestamp: new Date().toISOString()
      });
    }
  }, [isOpen, isVisible]);

  // Track form progress changes
  useEffect(() => {
    const progress = calculateFormProgress(formData);
    if (progress > 0 && progress < 100) {
      pushToDataLayer({
        event: 'form_progress_update',
        form_name: 'contact_modal',
        form_progress: progress,
        filled_fields: Object.entries(formData).filter(([, value]) => value.trim() !== '').map(([key]) => key),
        timestamp: new Date().toISOString()
      });
    }
  }, [formData]);

  const handleClose = () => {
    setIsAnimating(true);
    setAnimationClass('modal-fade-out');
    setOverlayAnimationClass('overlay-fade-out');
    
    setTimeout(() => {
      closeModal();
      setIsVisible(false);
      setIsAnimating(false);
      setAnimationClass('');
      setOverlayAnimationClass('');
    }, 150);
  };

  if (!isOpen && !isVisible && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${overlayAnimationClass}`}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div 
        className={`relative w-full max-w-md mx-4 rounded-2xl border ${animationClass}`}
        style={{
          backgroundColor: '#141414',
          borderColor: '#323232',
          boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div className="max-h-[90vh] overflow-y-auto p-8">
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={handleClose}
              className="p-1 rounded border transition-colors hover:bg-white/10"
              style={{
                backgroundColor: '#202020',
                borderColor: '#3D3D3D',
              }}
            >
              <X size={12} className="text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-white mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]"
                  style={{
                    backgroundColor: '#202020',
                    borderColor: '#3D3D3D',
                  }}
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-white mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  onFocus={() => {
                    pushToDataLayer({
                      event: 'form_field_focus',
                      form_name: 'contact_modal',
                      field_name: 'telefone',
                      field_type: 'tel',
                      timestamp: new Date().toISOString()
                    });
                  }}
                  onBlur={(e) => {
                    pushToDataLayer({
                      event: 'form_field_blur',
                      form_name: 'contact_modal',
                      field_name: 'telefone',
                      field_type: 'tel',
                      field_filled: e.target.value.trim() !== '',
                      timestamp: new Date().toISOString()
                    });
                  }}
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]"
                  style={{
                    backgroundColor: '#202020',
                    borderColor: '#3D3D3D',
                  }}
                  placeholder="+55 (11) 99999-9999"
                  maxLength={19}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={(e) => validateEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040] ${emailError ? 'border-red-500' : ''}`}
                style={{
                  backgroundColor: '#202020',
                  borderColor: emailError ? '#f87171' : '#3D3D3D',
                }}
                placeholder="seu@email.com"
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="atuacao" className="block text-sm font-medium text-white mb-2">
                Qual sua atuação hoje?
              </label>
              <Select name="atuacao" value={formData.atuacao} onValueChange={(value) => handleSelectChange('atuacao', value)}>
                <SelectTrigger className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]" style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empregado-clt">Empregado CLT</SelectItem>
                  <SelectItem value="autonomo">Autônomo</SelectItem>
                  <SelectItem value="empresario">Empresário(a)</SelectItem>
                  <SelectItem value="dono-casa">Dono(a) de casa</SelectItem>
                  <SelectItem value="servidor-publico">Servidor público</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="prazoFranquia" className="block text-sm font-medium text-white mb-2">
                Quando você pretende assumir a sua franquia?
              </label>
              <Select name="prazoFranquia" value={formData.prazoFranquia} onValueChange={(value) => handleSelectChange('prazoFranquia', value)}>
                <SelectTrigger className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]" style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate-30-dias">Em até 30 dias</SelectItem>
                  <SelectItem value="ate-60-dias">Em até 60 dias</SelectItem>
                  <SelectItem value="ate-90-dias">Em até 90 dias</SelectItem>
                  <SelectItem value="preciso-mais-tempo">Preciso de mais tempo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="investimento" className="block text-sm font-medium text-white mb-2">
                Quanto tem para investir?
              </label>
              <Select name="investimento" value={formData.investimento} onValueChange={(value) => handleSelectChange('investimento', value)}>
                <SelectTrigger className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]" style={{ backgroundColor: '#202020', borderColor: '#3D3D3D' }}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate-70mil">Tenho até 70mil</SelectItem>
                  <SelectItem value="70mil-140mil">Tenho entre 70mil e 140mil</SelectItem>
                  <SelectItem value="mais-140mil">Tenho mais de 140mil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sticky bottom-0 pt-4 border-t" style={{ 
              borderColor: '#323232'
            }}>
              <Button
                type="submit"
                disabled={!isFormValid}
                size="lg"
                className={`w-full border px-6 py-3 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 ${
                  isFormValid 
                    ? 'border-white/50 bg-gradient-to-r from-white/20 to-white/10 hover:border-white/70 hover:bg-white/25 hover:shadow-lg hover:shadow-white/20 shadow-white/10' 
                    : 'border-gray-600/30 bg-gray-800/20 text-gray-400 cursor-not-allowed'
                }`}
                style={isFormValid ? {
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                } : {}}
              >
                Enviar informações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};