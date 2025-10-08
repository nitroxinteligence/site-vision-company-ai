'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Ocultar navbar na página de captura
  if (pathname === '/cpt') {
    return null;
  }
  
  return <Navbar />;
}