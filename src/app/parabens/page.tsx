import type { Metadata } from "next";
import ParabensContent from "@/components/pages/parabens-content";

export const metadata: Metadata = {
  title: "Cadastro Realizado | Vision AI",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ParabensPage() {
  return <ParabensContent />;
}
