// src/components/MarkdownRenderer.tsx
"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
}

// Parse inline markdown: **bold**, *italic*, [links](url), `code`, ![images](url)
function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Image: ![alt](url)
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      nodes.push(
        <img
          key={key++}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          style={{ maxWidth: "100%", borderRadius: "10px", margin: "12px 0" }}
        />
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      nodes.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563EB", fontWeight: 600, textDecoration: "underline" }}
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      nodes.push(<strong key={key++}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*(.+?)\*/);
    if (italicMatch) {
      nodes.push(<em key={key++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Inline code: `text`
    const codeMatch = remaining.match(/^`(.+?)`/);
    if (codeMatch) {
      nodes.push(
        <code
          key={key++}
          style={{
            background: "#F3F4F6",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
            fontFamily: "monospace",
            color: "#E11D48",
          }}
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Plain text - consume until next special char
    const nextSpecial = remaining.slice(1).search(/[*`!\[]/);
    if (nextSpecial === -1) {
      nodes.push(remaining);
      break;
    } else {
      nodes.push(remaining.slice(0, nextSpecial + 1));
      remaining = remaining.slice(nextSpecial + 1);
    }
  }

  return nodes;
}

// Extract YouTube video ID from various URL formats
function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?\s]+)/,
    /youtube\.com\/embed\/([^?\s]+)/,
    /\[youtube:([^\]]+)\]/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks: ```
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={key++}
            style={{
              background: "#1E293B",
              color: "#E2E8F0",
              padding: "16px 20px",
              borderRadius: "10px",
              fontSize: "13px",
              lineHeight: 1.6,
              overflowX: "auto",
              margin: "16px 0",
              fontFamily: "monospace",
            }}
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // YouTube embed: [youtube:VIDEO_ID] or raw YouTube URL
    const youtubeId = getYouTubeId(line.trim());
    if (youtubeId && line.trim().length < 100) {
      elements.push(
        <div key={key++} style={{ margin: "24px 0", borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
      continue;
    }

    // Diagram placeholder: [diagram:NAME]
    const diagramMatch = line.trim().match(/^\[diagram:([^\]]+)\]/);
    if (diagramMatch) {
      elements.push(
        <div
          key={key++}
          style={{
            background: "#F8FAFC",
            border: "2px dashed #E7EAF0",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "center",
            margin: "20px 0",
            color: "#9AA3B2",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>&#9633;</div>
          <div style={{ fontSize: "13px", fontWeight: 600 }}>Architecture Diagram: {diagramMatch[1]}</div>
          <div style={{ fontSize: "11px", marginTop: "4px" }}>Diagram will render here</div>
        </div>
      );
      continue;
    }

    // Empty line
    if (line.trim().length === 0) {
      elements.push(<div key={key++} style={{ height: "8px" }} />);
      continue;
    }

    // Heading 1: # text
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em", margin: "32px 0 12px", lineHeight: 1.2 }}>
          {parseInline(line.slice(2))}
        </h1>
      );
      continue;
    }

    // Heading 2: ## text
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.01em", margin: "28px 0 10px", lineHeight: 1.25 }}>
          {parseInline(line.slice(3))}
        </h2>
      );
      continue;
    }

    // Heading 3: ### text
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} style={{ fontSize: "18px", fontWeight: 700, margin: "24px 0 8px", lineHeight: 1.3 }}>
          {parseInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    // Blockquote: > text
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={key++}
          style={{
            borderLeft: "3px solid #2563EB",
            paddingLeft: "16px",
            color: "#6B7280",
            margin: "16px 0",
            fontStyle: "italic",
            fontSize: "15px",
          }}
        >
          {parseInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Unordered list: - text
    if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} style={{ marginLeft: "20px", marginBottom: "6px", lineHeight: 1.7 }}>
          {parseInline(line.slice(2))}
        </li>
      );
      continue;
    }

    // Ordered list: 1. text
    const olMatch = line.match(/^(\d+)\.\s(.+)/);
    if (olMatch) {
      elements.push(
        <li key={key++} style={{ marginLeft: "20px", marginBottom: "6px", lineHeight: 1.7, listStyleType: "decimal" }}>
          {parseInline(olMatch[2])}
        </li>
      );
      continue;
    }

    // Horizontal rule: ---
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(
        <hr key={key++} style={{ border: "none", borderTop: "1px solid #E7EAF0", margin: "24px 0" }} />
      );
      continue;
    }

    // Image on its own line: ![alt](url)
    const imgLineMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgLineMatch) {
      const src = imgLineMatch[2];
      const alt = imgLineMatch[1];
      const lowerAlt = alt.toLowerCase();
      const lowerSrc = src.toLowerCase();
      // Detect diagrams by alt text, filename, or if it's clearly a full-width image
      const isDiagram = lowerAlt.includes("architecture") ||
                        lowerAlt.includes("diagram") ||
                        lowerAlt.includes("reference") ||
                        lowerAlt.includes("flow") ||
                        lowerAlt.includes("system") ||
                        lowerSrc.includes("architecture") ||
                        lowerSrc.includes("diagram") ||
                        lowerSrc.includes("enterprise");
      // All standalone images get generous width; diagrams break out further
      elements.push(
        <figure key={key++} className="article-diagram" style={{ margin: isDiagram ? "28px -60px" : "24px -40px", padding: 0 }}>
          <a href={src} target="_blank" rel="noopener noreferrer" style={{ display: "block", cursor: "zoom-in" }}>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{
                width: "100%",
                maxWidth: isDiagram ? "960px" : "900px",
                borderRadius: "10px",
                border: "1px solid #E7EAF0",
                display: "block",
                margin: "0 auto",
              }}
            />
          </a>
          {alt && (
            <figcaption style={{ fontSize: "12px", color: "#9AA3B2", marginTop: "6px", textAlign: "center" }}>
              {alt} — click to view full size
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} style={{ marginBottom: "16px", lineHeight: 1.8 }}>
        {parseInline(line)}
      </p>
    );
  }

  return <div>{elements}</div>;
}
