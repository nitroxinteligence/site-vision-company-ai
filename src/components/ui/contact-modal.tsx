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

  // Validação do email
  const validateEmail = (email: string) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Por favor, insira um email válido.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Verifica se todos os campos estão preenchidos e se o email é válido
  const isFormValid = Object.values(formData).every(value => value.trim() !== '') && formData.telefone.replace(/\D/g, '').length >= 10 && emailError === '';

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    if (!isFormValid || !isEmailValid) return;
    
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]"
                  style={{
                    backgroundColor: '#202020',
                    borderColor: '#3D3D3D',
                  }}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
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
          </form>
        </div>

        <div className="sticky bottom-0 p-6 pt-4 border-t" style={{ 
          backgroundColor: '#141414',
          borderColor: '#323232'
        }}>
          <Button
            onClick={handleSubmit}
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
      </div>
    </div>
  );
};