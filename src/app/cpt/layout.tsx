import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPT - Vision AI",
  description: "Capture Page Template - Vision AI",
};

export default function CptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}