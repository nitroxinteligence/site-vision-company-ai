
import React from 'react';

export default function ParabensPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Parabéns! Primeira etapa concluída. Agora assista o vídeo abaixo!
        </h1>
        
        <div className="w-full aspect-video bg-black border border-gray-700 rounded-lg mb-8 flex items-center justify-center">
          {/* Placeholder for the video */}
          <p className="text-gray-400">Seu vídeo aqui</p>
        </div>
        
        <a
          href="https://wa.me/5581998132001"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Entrar em contato agora!
        </a>
      </div>
    </main>
  );
}
