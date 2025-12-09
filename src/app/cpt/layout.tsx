import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franquia Vision AI | Seja um Parceiro de IA para Empresas",
  description: "Conheça o modelo de franquia Vision AI. Torne-se um parceiro e ofereça soluções de IA para empresas na sua região. Baixo investimento, alto potencial de retorno.",
  keywords: [
    "franquia IA",
    "franquia tecnologia",
    "parceiro Vision AI",
    "negócio inteligência artificial",
    "franquia automação",
  ],
  openGraph: {
    title: "Franquia Vision AI | Seja um Parceiro de IA para Empresas",
    description: "Conheça o modelo de franquia Vision AI. Torne-se um parceiro e ofereça soluções de IA para empresas.",
    url: "https://visioncompany.ai/cpt",
    type: "website",
  },
  alternates: {
    canonical: "https://visioncompany.ai/cpt",
  },
};

export default function CptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}