import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Configuração centralizada do GSAP
let isGSAPInitialized = false;

export const initializeGSAP = () => {
  if (typeof window === "undefined" || isGSAPInitialized) {
    return;
  }

  // Registrar plugins apenas uma vez - CENTRALIZADO
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Configurações globais de performance OTIMIZADAS
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
    autoSleep: 60, // Pausa animações após 60s de inatividade
    units: { left: "%", top: "%", rotation: "rad" }, // Unidades otimizadas
  });

  // Detectar dispositivo móvel de forma mais precisa
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Configurações do ScrollTrigger OTIMIZADAS para mobile
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
    limitCallbacks: true, // Limita callbacks para melhor performance
    syncInterval: isMobile ? 200 : 120, // Intervalo maior em mobile
  });

  // Configurações específicas para mobile
  if (isMobile) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    
    // Reduzir qualidade de animações em mobile
    gsap.defaults({
      ease: "power2.out",
      duration: 0.6, // Durações mais curtas
    });
  }

  isGSAPInitialized = true;
};

// Função para cleanup global
export const cleanupGSAP = () => {
  if (typeof window !== "undefined") {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");
  }
};

// Hook para usar em componentes React
export const useGSAP = () => {
  if (typeof window !== "undefined") {
    initializeGSAP();
  }
  
  return {
    gsap,
    ScrollTrigger,
    cleanup: cleanupGSAP
  };
};

export { gsap, ScrollTrigger };