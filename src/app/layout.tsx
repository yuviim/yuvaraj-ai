import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuvaraj — Enterprise AI Architecture Library",
  description:
    "Practical reference architectures for enterprise AI systems — data platforms, retrieval, memory, governance, agents, and architecture patterns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
