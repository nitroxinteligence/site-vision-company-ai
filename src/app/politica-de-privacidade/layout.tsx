import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Vision AI",
  description: "Política de privacidade do Vision AI. Saiba como coletamos, usamos e protegemos suas informações pessoais.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://visioncompany.ai/politica-de-privacidade",
  },
};

export default function PoliticaPrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
