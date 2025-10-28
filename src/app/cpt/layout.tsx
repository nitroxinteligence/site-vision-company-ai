import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision AI",
  description: "Vision AI",
};

export default function CptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}