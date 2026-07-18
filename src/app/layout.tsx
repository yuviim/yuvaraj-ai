import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yuvarajai.com"),
  title: {
    default: "Yuvaraj \u2014 Enterprise AI Architecture Library",
    template: "%s | Yuvaraj \u2014 Enterprise AI Architecture Library",
  },
  description:
    "Practical reference architectures for enterprise AI systems \u2014 data platforms, retrieval, memory, governance, agents, and architecture patterns.",
  keywords: [
    "enterprise AI architecture", "AI data platforms", "agentic AI", "sovereign AI",
    "Exasol", "multi-agent systems", "RAG architecture", "data federation", "MCP",
  ],
  authors: [{ name: "Yuvaraj", url: "https://yuvarajai.com" }],
  openGraph: {
    type: "website",
    url: "https://yuvarajai.com",
    siteName: "Yuvaraj \u2014 Enterprise AI Architecture Library",
    title: "Yuvaraj \u2014 Enterprise AI Architecture Library",
    description:
      "Practical reference architectures for enterprise AI systems \u2014 data platforms, retrieval, governance, agents, and architecture patterns.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Yuvaraj \u2014 Enterprise AI Architecture Library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvaraj \u2014 Enterprise AI Architecture Library",
    description:
      "Practical reference architectures for enterprise AI systems.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
