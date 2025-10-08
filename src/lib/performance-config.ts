/**
 * Configurações de Performance para Animações
 * 
 * Este arquivo centraliza configurações otimizadas para melhor performance,
 * substituindo filtros blur custosos por alternativas mais leves.
 */

// Configurações de animação otimizadas
export const PERFORMANCE_CONFIG = {
  // Substituir blur por opacity + scale para melhor performance
  BLUR_ALTERNATIVE: {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      rotationX: 5, // Alternativa leve ao blur
    },
    final: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
    }
  },

  // Configurações de timing otimizadas
  TIMING: {
    duration: 0.8, // Reduzido de 1.2s para melhor responsividade
    stagger: 0.05, // Reduzido de 0.1s
    ease: "power2.out",
  },

  // Configurações do ScrollTrigger otimizadas
  SCROLL_TRIGGER: {
    start: "top 85%", // Mais conservador
    end: "bottom 15%",
    scrub: 0.5, // Mais responsivo que 1
    refreshPriority: -1,
    anticipatePin: 1,
  },

  // Propriedades CSS otimizadas
  CSS_OPTIMIZATIONS: {
    willChange: "transform, opacity", // Apenas propriedades necessárias
    force3D: true,
    backfaceVisibility: "hidden",
    perspective: 1000,
  },

  // Configurações para dispositivos móveis
  MOBILE: {
    reducedMotion: true,
    disableBlur: true,
    simplifiedAnimations: true,
  }
};

// Função para detectar se deve usar animações reduzidas
export const shouldUseReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

// Função para obter configurações otimizadas baseadas no dispositivo
export const getOptimizedConfig = () => {
  const isReducedMotion = shouldUseReducedMotion();
  
  return {
    ...PERFORMANCE_CONFIG,
    useBlurAlternative: true, // Sempre usar alternativa ao blur
    reducedMotion: isReducedMotion,
    timing: {
      ...PERFORMANCE_CONFIG.TIMING,
      duration: isReducedMotion ? 0.4 : PERFORMANCE_CONFIG.TIMING.duration,
      stagger: isReducedMotion ? 0.02 : PERFORMANCE_CONFIG.TIMING.stagger,
    }
  };
};