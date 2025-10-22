'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header-2';

export function ConditionalNavbar() {
    const pathname = usePathname();

    // Ocultar navbar na página de captura, no formulário de agentes, na página cpt e na política de privacidade
    if (pathname === '/captura' || pathname === '/agentes' || pathname === '/cpt' || pathname === '/politica-de-privacidade') {
        return null;
    }

    return <Header />;
}