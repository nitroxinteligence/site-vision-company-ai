"use client";

import React, { useState, useEffect } from 'react';
import { useModal } from '@/components/providers/modal-provider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    atuacao: '',
    prazoFranquia: '',
    investimento: ''
  });

  // Controla o fade in/out
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Verifica se todos os campos estão preenchidos
  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Aqui você pode implementar a lógica de envio do formulário
    console.log('Dados do formulário:', formData);
    
    // Fechar modal após envio
    closeModal();
    
    // Reset form
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      atuacao: '',
      prazoFranquia: '',
      investimento: ''
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => closeModal(), 200);
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
      isOpen && isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop com blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-md mx-4 rounded-2xl border transition-all duration-200 ${
          isOpen && isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          backgroundColor: '#141414',
          borderColor: '#323232',
          boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Conteúdo com scroll */}
        <div className="max-h-[90vh] overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-end mb-6">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
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
                placeholder="Seu nome completo"
              />
            </div>

            {/* Email */}
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
                required
                className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors placeholder-[#404040]"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                }}
                placeholder="seu@email.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-white mb-2">
                Telefone com DDD
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
              />
            </div>

            {/* Atuação */}
            <div>
              <label htmlFor="atuacao" className="block text-sm font-medium text-white mb-2">
                Qual sua atuação hoje?
              </label>
              <select
                id="atuacao"
                name="atuacao"
                value={formData.atuacao}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="" className="bg-gray-800 text-white">Selecione uma opção</option>
                <option value="empregado-clt" className="bg-gray-800 text-white">Empregado CLT</option>
                <option value="autonomo" className="bg-gray-800 text-white">Autônomo</option>
                <option value="empresario" className="bg-gray-800 text-white">Empresário(a)</option>
                <option value="dono-casa" className="bg-gray-800 text-white">Dono(a) de casa</option>
                <option value="servidor-publico" className="bg-gray-800 text-white">Servidor público</option>
              </select>
            </div>

            {/* Prazo Franquia */}
            <div>
              <label htmlFor="prazoFranquia" className="block text-sm font-medium text-white mb-2">
                Quando você pretende assumir a sua franquia?
              </label>
              <select
                id="prazoFranquia"
                name="prazoFranquia"
                value={formData.prazoFranquia}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="" className="bg-gray-800 text-white">Selecione uma opção</option>
                <option value="ate-30-dias" className="bg-gray-800 text-white">Em até 30 dias</option>
                <option value="ate-60-dias" className="bg-gray-800 text-white">Em até 60 dias</option>
                <option value="ate-90-dias" className="bg-gray-800 text-white">Em até 90 dias</option>
                <option value="preciso-mais-tempo" className="bg-gray-800 text-white">Preciso de mais tempo</option>
              </select>
            </div>

            {/* Investimento */}
            <div>
              <label htmlFor="investimento" className="block text-sm font-medium text-white mb-2">
                Quanto tem para investir?
              </label>
              <select
                id="investimento"
                name="investimento"
                value={formData.investimento}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundColor: '#202020',
                  borderColor: '#3D3D3D',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="" className="bg-gray-800 text-white">Selecione uma opção</option>
                <option value="ate-70mil" className="bg-gray-800 text-white">Tenho até 70mil</option>
                <option value="70mil-140mil" className="bg-gray-800 text-white">Tenho entre 70mil e 140mil</option>
                <option value="mais-140mil" className="bg-gray-800 text-white">Tenho mais de 140mil</option>
              </select>
            </div>
          </form>
        </div>

        {/* Submit Button - Fixo na parte inferior */}
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