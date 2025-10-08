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

  // Configurações globais de performance
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  // Configurações do ScrollTrigger para melhor performance
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  });

  // Configurações de performance para dispositivos móveis
  if (window.innerWidth <= 768) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
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