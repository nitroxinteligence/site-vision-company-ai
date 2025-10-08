"use client";

import ScrollSections from "@/components/ui/scroll-sections";

export default function CptScrollReveal() {
  const scrollSections = [
    {
      title: "Sonhos que se tornam possíveis",
    },
    {
      title: "Trocar de carro em menos de 1 ano",
    },
    {
      title: "A casa própria mais rápido do que no modelo tradicional",
    },
    {
      title: "Viagens internacionais sem depender de férias aprovadas",
    },
    {
      title: "Independência financeira real, em um setor que só cresce",
    }
  ];

  return (
    <ScrollSections sections={scrollSections} />
  );
}