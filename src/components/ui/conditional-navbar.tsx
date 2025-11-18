'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header-2';

export function ConditionalNavbar() {
    const pathname = usePathname();

    // Ocultar navbar em páginas específicas
    if (pathname === '/captura' || pathname === '/agentes' || pathname === '/cpt' || pathname === '/agent-form') {
        return null;
    }

    return <Header />;
}