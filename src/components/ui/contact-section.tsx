"use client";

import { useTranslations } from "@/components/providers/language-provider";

export default function ContactSection() {
  const copy = useTranslations();

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
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 overflow-x-clip">
        {/* Card com estilos do 09-CARD-STYLES.md + opacidade 10% + desfoque */}
        <div 
          className="max-w-4xl w-full p-2 rounded-3xl border mx-auto"
          style={{ 
            backgroundColor: 'transparent',
            borderColor: '#141414'
          }}
        >
          <div
            className="w-full p-6 sm:p-8 lg:p-12 rounded-2xl border relative min-h-80 backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(10, 10, 10, 0.8)', // Usando #0A0A0A com mais opacidade
              borderColor: 'rgba(50, 50, 50, 0.1)', // 10% opacity
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.008)' // 10% of original opacity
            }}
          >
            <h2 className="title-section text-white text-center mb-6 max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
              {copy.home.contact.title}
            </h2>
            
            <p className="text-description text-white/70 text-center mb-8 max-w-2xl mx-auto">
              {copy.home.contact.descriptionLine1} <br />
              {copy.home.contact.descriptionLine2}
            </p>
            
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const whatsappUrl = `https://wa.me/5581998132001?text=${encodeURIComponent(copy.common.whatsappMessage)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="group relative overflow-hidden bg-white py-5 text-base rounded-lg font-medium tracking-wide text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] w-full sm:w-auto sm:min-w-[320px] sm:max-w-[360px] max-w-[320px] mx-auto flex items-center justify-center"
              >
                <span className="transition-all duration-300 group-hover:mr-6">
                  {copy.home.contact.cta}
                </span>
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
