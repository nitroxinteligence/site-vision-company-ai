import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefing de Agente | Vision AI",
  description: "Formulário de briefing para criação de agentes de IA personalizados.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AgentFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
