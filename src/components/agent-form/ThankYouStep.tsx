"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export function ThankYouStep() {
  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: '#000000',
        borderRadius: '0.5rem',
        border: '1px solid #272727',
        minHeight: '400px'
      }}
    >
      <CheckCircle size={64} style={{ color: '#58E877', marginBottom: '1.5rem' }} />
      <h2 style={{ 
        fontSize: "1.75rem", 
        fontWeight: "bold", 
        color: "#FFFFFF",
        marginBottom: "0.75rem"
      }}>
        Obrigado!
      </h2>
      <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: '450px' }}>
        Suas informações foram enviadas. Nossa equipe recebeu todos os dados necessários para configurar seu agente.
      </p>
    </div>
  );
}
