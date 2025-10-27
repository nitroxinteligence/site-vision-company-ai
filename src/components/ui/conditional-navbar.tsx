'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header-2';

export function ConditionalNavbar() {
    const pathname = usePathname();

    // Ocultar navbar na página de captura, no formulário de agentes e na página cpt
    if (pathname === '/captura' || pathname === '/agentes' || pathname === '/cpt') {
        return null;
    }

    return <Header />;
}