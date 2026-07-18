import React from "react";
import Link from "next/link";
import { PillarPill } from "./PillarPill";
import { SourceBadge } from "./SourceBadge";

const coverGradients: Record<string, string> = {
  DP: "linear-gradient(150deg, #0A1628 20%, #1e3a5f 80%)",
  ES: "linear-gradient(150deg, #1a0a2e, #2d1b69)",
  AA: "linear-gradient(150deg, #2A1602, #5a3a1f)",
  SV: "linear-gradient(150deg, #062A22, #0d4a3a)",
  KX: "linear-gradient(150deg, #0A1628 20%, #00B894 80%)",
};

const pillarImages: Record<string, string> = {
  DP: "/images/pillar-dp.png",
  ES: "/images/pillar-es.png",
  AA: "/images/pillar-aa.png",
  SV: "/images/pillar-sv.png",
  KX: "/images/pillar-kx.png",
};

const formatIcons: Record<string, { icon: string; label: string }> = {
  ARTICLE: { icon: "❙", label: "Article" },
  VIDEO: { icon: "▶", label: "Video" },
  NOTE: { icon: "✐", label: "Note" },
  DIAGRAM: { icon: "◨", label: "Diagram" },
  RESEARCH: { icon: "⌘", label: "Research" },
};

interface ContentCardProps {
  item: {
    id: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    coverImage?: string | null;
    pillar: string;
    source: string;
    format: string;
    readingTimeMin?: number | null;
    publishedAt?: Date | string | null;
  };
}

export function ContentCard({ item }: ContentCardProps) {
  const gradient = coverGradients[item.pillar] || coverGradients["DP"];
  const fmt = formatIcons[item.format] || formatIcons["ARTICLE"];
  const date = item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : null;

  return React.createElement(
    Link,
    {
      href: "/" + item.slug,
      style: {
        background: "#fff",
        border: "1px solid #E7EAF0",
        borderRadius: "14px",
        padding: "0",
        boxShadow: "0 1px 2px rgba(16,24,40,.04)",
        display: "block",
        textDecoration: "none",
        color: "inherit",
        overflow: "hidden",
      },
    },
    // Cover with pillar image
    React.createElement("div", {
      style: {
        background: gradient,
        aspectRatio: "16/9",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
      // Cover image — per-article coverImage takes priority, falls back to pillar default
      (item.coverImage || pillarImages[item.pillar])
        ? React.createElement("img", {
            src: item.coverImage || pillarImages[item.pillar],
            alt: "",
            style: {
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: 0.75,
            },
          })
        : null,
      // Dark overlay for text contrast
      React.createElement("div", {
        style: {
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(0,0,0,.25) 100%)",
        },
      }),
      // Format badge top-left
      React.createElement("div", {
        style: {
          position: "absolute", top: "12px", left: "12px",
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "rgba(255,255,255,.7)",
          background: "rgba(0,0,0,.3)", padding: "3px 10px",
          borderRadius: "6px", backdropFilter: "blur(4px)",
        },
      }, fmt.icon + " " + fmt.label),
      // Center icon
      React.createElement("span", {
        style: {
          fontSize: item.format === "VIDEO" ? "36px" : "28px",
          color: "rgba(255,255,255,.2)",
          position: "relative", zIndex: 1,
        },
      }, fmt.icon),
      // Date bottom-right
      date ? React.createElement("div", {
        style: {
          position: "absolute", bottom: "10px", right: "12px",
          fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.5)",
        },
      }, date) : null
    ),
    // Content
    React.createElement("div", { style: { padding: "14px 16px 16px" } },
      React.createElement("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" } },
        React.createElement(PillarPill, { pillar: item.pillar }),
        React.createElement(SourceBadge, { source: item.source })
      ),
      React.createElement("h4", {
        style: { fontSize: "14.5px", fontWeight: 700, margin: "0 0 6px", lineHeight: 1.35 },
      }, item.title),
      React.createElement("span", { style: { fontSize: "11px", color: "#9AA3B2" } },
        [
          item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
            : null,
          item.readingTimeMin ? item.readingTimeMin + " min read" : null,
        ].filter(Boolean).join(" \u00B7 ")
      )
    )
  );
}
