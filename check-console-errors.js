// Script para verificar erros no console
console.log('🔍 Verificando se o erro de key prop foi corrigido...');

// Intercepta erros do console
const originalError = console.error;
let keyPropErrors = 0;

console.error = function(...args) {
  const message = args.join(' ');
  if (message.includes('unique "key" prop') || message.includes('TimelineItem')) {
    keyPropErrors++;
    console.log('❌ Erro de key prop ainda presente:', message);
  }
  originalError.apply(console, args);
};

// Aguarda um tempo para capturar erros
setTimeout(() => {
  if (keyPropErrors === 0) {
    console.log('✅ Nenhum erro de key prop encontrado! Problema resolvido.');
  } else {
    console.log(`❌ Ainda há ${keyPropErrors} erro(s) de key prop.`);
  }
}, 3000);