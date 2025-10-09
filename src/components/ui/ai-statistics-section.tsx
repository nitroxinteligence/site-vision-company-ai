'use client';

import { useRef } from 'react';

import { useCountUp } from '@/hooks/useCountUp';

export default function AiStatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const percentage2023Ref = useRef<HTMLDivElement>(null);
  const percentage2030Ref = useRef<HTMLDivElement>(null);

  // Hooks de contagem para os percentuais
  const percentage2023 = useCountUp({ 
    end: 37, 
    duration: 2000, 
    suffix: '%',
    threshold: 0.3,
    enableScrollTrigger: true,
    scrollTriggerElement: sectionRef
  });
  
  const percentage2030 = useCountUp({ 
    end: 80, 
    duration: 2500, 
    suffix: '%',
    threshold: 0.3,
    enableScrollTrigger: true,
    scrollTriggerElement: sectionRef
  });



  return (
    <section 
      ref={sectionRef}
      className="relative w-full text-white py-20 md:py-32 overflow-hidden" 
      style={{ backgroundColor: '#0A0A0A' }}
    >
      
      {/* Overlay escuro para melhor legibilidade */}
      
      
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        {/* Título Principal */}
        <div className="flex items-center justify-center mb-12">
          <h2 className="text-heading-2 text-white text-center text-balance">
            Em 2023, apenas <span style={{ color: '#343434' }}>{percentage2023.value}</span><br className="hidden md:block" />
            das empresas usavam IA
          </h2>
        </div>

        {/* Texto Introdutório */}
        <div className="flex justify-center mb-12">
          <p className="text-body-lg text-white/70 text-center max-w-4xl mx-auto font-medium leading-relaxed text-balance">
            Até 2030, a previsão é que <span className="text-white font-semibold" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>{percentage2030.value}</span> utilizem diariamente.<br className="hidden md:block" />
            Esta é a sua oportunidade de estar à frente da curva.
          </p>
        </div>

        {/* Seção de Estatísticas */}
        <div className="flex justify-center mb-16">
          <div 
            className="max-w-5xl w-full p-2 rounded-3xl border"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: '#141414'
            }}
          >
            <div 
              className="w-full p-6 sm:p-8 md:p-12 rounded-2xl border relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
              style={{ 
                backgroundColor: '#141414',
                borderColor: '#323232',
                boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="text-center max-w-3xl mx-auto">
                {/* Indicador visual */}
                 <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8 mb-8">
                    <div className="text-center">
                      <div ref={percentage2023Ref} className="text-7xl md:text-5xl font-bold mb-2" style={{ color: '#343434' }}>{percentage2023.value}</div>
                      <div className="text-sm text-white/70">2023</div>
                    </div>
                   
                   <div className="flex items-center">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-black to-white"></div>
                      <div className="w-3 h-3 bg-white rounded-full ml-2"></div>
                    </div>
                   
                   <div className="text-center">
                     <div ref={percentage2030Ref} className="text-7xl md:text-5xl font-bold text-white mb-2" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>{percentage2030.value}</div>
                     <div className="text-sm text-white/70">2030</div>
                   </div>
                 </div>
                
                <p className="text-description text-white/70 font-medium leading-relaxed text-balance">
                  O mercado de IA está em crescimento exponencial. Empresas que adotarem essa tecnologia agora terão vantagem competitiva significativa nos próximos anos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}