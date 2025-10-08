"use client";

import React, { ReactNode } from 'react';
import { createGlobalStyle } from "styled-components";

interface FormCardProps {
  children: ReactNode;
  title: string;
  description?: string;
}

// Add more line height to all text elements
export const GlobalStyles = createGlobalStyle`
  * {
    transition: all 0.2s ease;
  }
  
  textarea, input, p, label, span, div {
    line-height: 1.5 !important;
  }
  
  textarea, input {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  
  textarea:focus, input:focus {
    border-color: #ffffff !important;
    box-shadow: 0 0 0 1px #ffffff !important;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Adiciona espaçamento entre campos do formulário */
  form > div > div {
    margin-bottom: 1.25rem;
  }
  
  /* Remove a margem do último elemento para evitar espaçamento extra */
  form > div > div:last-child {
    margin-bottom: 0;
  }
  
  /* Estilo para o checkbox */
  input[type="checkbox"] {
    cursor: pointer;
    transition: all 0.2s;
  }
  
  /* Adiciona animação suave ao trocar entre etapas */
  .step-content {
    animation: fadeIn 0.4s ease-in-out;
  }
  
  /* Ajuste para altura do footer */
  .footer-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    border-top: none;
    z-index: 1000;
    height: 60px;
    display: flex;
    align-items: center;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
  }
  
  .footer-nav-content {
    display: flex;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

// Componente de card para todas as etapas do formulário com animação e novos estilos
export const FormCard: React.FC<FormCardProps> = ({ children, title, description }) => {
  return (
    <div 
      style={{ 
        backgroundColor: "#000000", // Alterado de #0f0f0f para #000000
        borderRadius: "0.5rem", 
        padding: "1.5rem", 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
        border: "none",
        maxWidth: "100%",
        overflow: "hidden",
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold",
          background: "linear-gradient(to right, #ffffff, #888888)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.5rem",
        }}>
          {title}
        </h2>
        {description && (
          <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "0.5rem" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

// Estilo para os elementos de textarea com transições e animações
export const textareaStyle = {
  color: "#FFFFFF", 
  padding: "0.75rem",
  minHeight: "120px",
  width: "100%",
  maxWidth: "100%",
  borderRadius: "8px",
  overflow: "auto",
  lineHeight: "1.8",
  fontSize: "0.95rem",
};

export const inputStyle = {
  color: "#FFFFFF", 
  padding: "0.75rem",
  width: "100%",
  maxWidth: "100%",
  borderRadius: "8px",
  lineHeight: "1.8",
  fontSize: "0.95rem",
};

export const fieldLabelStyle = { 
  display: "block", 
  fontSize: "0.95rem", 
  fontWeight: "500", 
  marginBottom: "0.5rem",
  lineHeight: "1.6",
};

export const errorMessageStyle = { 
  marginTop: "0.25rem", 
  fontSize: "0.875rem", 
  color: "#f87171",
  lineHeight: "1.6",
};

export const helperTextStyle = { 
  fontSize: "0.75rem", 
  color: "rgba(255, 255, 255, 0.6)", 
  marginBottom: "0.75rem",
  lineHeight: "1.6",
};

// Estilo para botões ocultos (usados para submissão de formulário)
export const hiddenButtonStyle = {
  display: "none"
};

export const formFieldContainerStyle = {
  marginBottom: "1.25rem", // Margem entre campos
  transition: "all 0.3s ease" // Transição suave
};

// Legacy global styles using jsx style tags
export const LegacyGlobalStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    textarea, input {
      transition: all 0.3s ease-in-out;
    }
    
    textarea:focus, input:focus {
      border-color: #ffffff !important;
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    }
    
    /* Adiciona espaçamento entre campos do formulário */
    form > div > div {
      margin-bottom: 1.25rem;
    }
    
    /* Remove a margem do último elemento para evitar espaçamento extra */
    form > div > div:last-child {
      margin-bottom: 0;
    }
    
    /* Estilo para o checkbox */
    input[type="checkbox"] {
      cursor: pointer;
      transition: all 0.2s;
    }
    
    /* Adiciona animação suave ao trocar entre etapas */
    .step-content {
      animation: fadeIn 0.4s ease-in-out;
    }
    
    /* Ajuste para altura do footer */
    .footer-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      border-top: none;
      z-index: 1000;
      height: 60px;
      display: flex;
      align-items: center;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
    }
    
    .footer-nav-content {
      display: flex;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `}</style>
);