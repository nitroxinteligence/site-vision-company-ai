import React from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export default function ParabensPage() {
  return (
    <section 
      className="relative overflow-hidden border-t min-h-screen flex items-center justify-center"
      style={{ 
        backgroundColor: '#000000',
        borderTopColor: '#323232'
      }}
    >
      <AnimatedGradientBackground
        startingGap={150}
        Breathing={true}
        gradientColors={[
          "#000000",
          "#1a1a1a",
          "#333333",
          "#4a4a4a",
          "#666666",
          "#808080",
          "#ffffff"
        ]}
        gradientStops={[20, 35, 50, 65, 75, 85, 100]}
        animationSpeed={0.015}
        breathingRange={8}
        topOffset={20}
        containerClassName="opacity-30"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Parabéns! Primeira etapa concluída. Agora assista o vídeo abaixo!
        </h1>
        
        <div className="w-full aspect-video bg-black/50 border border-gray-700 rounded-lg mb-12 flex items-center justify-center backdrop-blur-sm">
          <p className="text-gray-400">Seu vídeo aqui</p>
        </div>
        
        <a
          href="https://wa.me/5581998132001"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-8 py-4 text-lg rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
        >
          Entrar em contato agora!
        </a>
      </div>
    </section>
  );
}