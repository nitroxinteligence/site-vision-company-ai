"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#0A0A0A', 
      color: 'white' 
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Página Não Encontrada</h1>
      <p style={{ marginBottom: '2rem' }}>Desculpe, a página que você está procurando não existe.</p>
      <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>
        Voltar para a Home
      </Link>
    </div>
  );
}
