/**
 * Teste de funcionalidade do scroll após otimizações
 * Execute este arquivo no console do browser para verificar se tudo está funcionando
 */

interface WindowWithLenis extends Window {
  lenis?: unknown
  ScrollTrigger?: {
    getAll(): unknown[]
  }
  gc?: () => void
  scrollTest?: typeof scrollTest
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number
  }
}

export const scrollTest = {
  // Testa se o Lenis está funcionando
  testLenis: () => {
    if (typeof window === 'undefined') return false;
    const lenis = (window as WindowWithLenis).lenis;
    if (!lenis) {
      console.error('❌ Lenis não encontrado');
      return false;
    }
    console.log('✅ Lenis encontrado:', lenis);
    return true;
  },

  // Testa se o ScrollTrigger está funcionando
  testScrollTrigger: () => {
    if (typeof window === 'undefined') return false;
    const ScrollTrigger = (window as WindowWithLenis).ScrollTrigger;
    if (!ScrollTrigger) {
      console.error('❌ ScrollTrigger não encontrado');
      return false;
    }
    console.log('✅ ScrollTrigger encontrado:', ScrollTrigger);
    console.log('📊 ScrollTriggers ativos:', ScrollTrigger.getAll().length);
    return true;
  },

  // Testa performance das animações
  testPerformance: () => {
    const start = performance.now();
    
    // Simula scroll
    window.scrollTo({ top: 500, behavior: 'auto' });
    
    setTimeout(() => {
      const end = performance.now();
      const duration = end - start;
      
      if (duration < 16) { // 60fps = 16ms por frame
        console.log('✅ Performance boa:', duration.toFixed(2) + 'ms');
      } else {
        console.warn('⚠️ Performance pode melhorar:', duration.toFixed(2) + 'ms');
      }
    }, 100);
  },

  // Testa se há memory leaks
  testMemoryLeaks: () => {
    if (typeof window === 'undefined') return false;
    const initialMemory = (performance as PerformanceWithMemory).memory?.usedJSHeapSize || 0;
    
    // Força garbage collection se disponível
    const windowWithGc = window as WindowWithLenis;
    if (windowWithGc.gc) {
      windowWithGc.gc();
    }
    
    setTimeout(() => {
      const finalMemory = (performance as PerformanceWithMemory).memory?.usedJSHeapSize || 0;
      const diff = finalMemory - initialMemory;
      
      if (diff < 1000000) { // Menos de 1MB
        console.log('✅ Sem vazamentos significativos de memória');
      } else {
        console.warn('⚠️ Possível vazamento de memória:', (diff / 1000000).toFixed(2) + 'MB');
      }
    }, 2000);
  },

  // Executa todos os testes
  runAllTests: () => {
    console.log('🧪 Iniciando testes de scroll...\n');
    
    scrollTest.testLenis();
    scrollTest.testScrollTrigger();
    scrollTest.testPerformance();
    scrollTest.testMemoryLeaks();
    
    console.log('\n✅ Testes concluídos! Verifique os resultados acima.');
  }
};

// Disponibiliza globalmente para uso no console
if (typeof window !== 'undefined') {
  (window as WindowWithLenis).scrollTest = scrollTest;
}

// Auto-executa os testes em desenvolvimento (apenas no cliente)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  setTimeout(() => {
    scrollTest.runAllTests();
  }, 3000); // Aguarda 3s para tudo carregar
}