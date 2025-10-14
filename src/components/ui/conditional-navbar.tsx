'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Ocultar navbar na página de captura e no formulário de agentes
  if (pathname === '/cpt' || pathname === '/agent-form' || pathname === '/parabens') {
    return null;
  }
  
  return <Navbar />;
}