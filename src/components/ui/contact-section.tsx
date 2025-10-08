"use client";

export default function ContactSection() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png')",
        filter: "grayscale(1)",
      }}
    >
      {/* Overlay escuro para melhor legibilidade */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 10, 10, 0.8)' }} />
      
      {/* Conteúdo da seção */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Card com estilos do 09-CARD-STYLES.md + opacidade 10% + desfoque */}
        <div 
          className="max-w-4xl w-full p-2 rounded-3xl border mx-auto"
          style={{ 
            backgroundColor: 'transparent',
            borderColor: '#141414'
          }}
        >
          <div 
            className="w-full p-12 rounded-2xl border relative min-h-80 backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(10, 10, 10, 0.8)', // Usando #0A0A0A com mais opacidade
              borderColor: 'rgba(50, 50, 50, 0.1)', // 10% opacity
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.008)' // 10% of original opacity
            }}
          >
            <h2 className="title-section text-white text-center mb-6">
              Mais escala, mais lucro, mais liberdade.
            </h2>
            
            <p className="text-description text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Se você quer crescer sem abrir mão da sua qualidade de vida, fale com a Vision AI.
            </p>
            
            <div className="flex justify-center">
              <button
                type="button"
                className="group relative overflow-hidden border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 text-base rounded-lg font-medium tracking-wide text-white backdrop-blur-sm hover:from-white/30 hover:to-white/20 transition-all duration-300"
              >
                Quero minha consultoria gratuita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}