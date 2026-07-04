// src/app/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PillarPill } from "@/components/PillarPill";
import { SourceBadge } from "@/components/SourceBadge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const item = await prisma.contentItem.findUnique({
    where: { slug: params.slug },
  });

  if (!item) return notFound();

  return (
    <div>
      <header style={{ background: "#fff", borderBottom: "1px solid #E7EAF0", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>Y</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14.5px", lineHeight: 1.2 }}>Yuvaraj</div>
              <div style={{ fontSize: "11.5px", color: "#6B7280" }}>Enterprise AI &amp; Platform Architect</div>
            </div>
          </Link>
          <nav style={{ display: "flex", gap: "26px", fontSize: "13.5px", fontWeight: 500, color: "#6B7280" }}>
            <Link href="/">Architecture</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link href="/contact" className="btn btn-pri">Contact &#8594;</Link>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px", maxWidth: "780px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#2563EB", fontWeight: 600 }}>&#8592; Back to library</Link>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
          <PillarPill pillar={item.pillar} />
          <SourceBadge source={item.source} />
          {item.readingTimeMin ? <span style={{ fontSize: "12px", color: "#9AA3B2" }}>{item.readingTimeMin} min read</span> : null}
          <span style={{
            fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
            padding: "2px 8px", borderRadius: "4px",
            background: item.format === "VIDEO" ? "#FEE2E2" : item.format === "DIAGRAM" ? "#EFF4FF" : "#F3F4F6",
            color: item.format === "VIDEO" ? "#DC2626" : item.format === "DIAGRAM" ? "#2563EB" : "#6B7280",
            letterSpacing: "0.06em",
          }}>
            {item.format}
          </span>
        </div>

        <h1 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "12px" }}>
          {item.title}
        </h1>

        {item.subtitle ? <p style={{ fontSize: "17px", color: "#6B7280", marginBottom: "16px" }}>{item.subtitle}</p> : null}

        <div style={{ fontSize: "13px", color: "#9AA3B2", marginBottom: "32px", display: "flex", gap: "12px", alignItems: "center" }}>
          <span>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
              : "Draft"}
          </span>
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", fontWeight: 600 }}>
              View original &#8594;
            </a>
          ) : null}
        </div>

        {/* ARTICLE BODY — rendered with markdown support */}
        <article style={{ fontSize: "16px", lineHeight: 1.8, color: "#374151" }}>
          <MarkdownRenderer content={item.body || ""} />
        </article>

        {/* Tags */}
        {item.tags ? (
          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #E7EAF0" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {item.tags.split(",").map((tag) => (
                <span key={tag} style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "99px", background: "#F8FAFC", border: "1px solid #E7EAF0", color: "#374151" }}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="card" style={{ padding: "24px", marginTop: "40px" }}>
          <h3 style={{ marginBottom: "8px" }}>Continue exploring</h3>
          <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px" }}>
            More articles, videos, and architecture diagrams in the library.
          </p>
          <Link href="/" className="btn btn-pri">Back to library &#8594;</Link>
        </div>
      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div><b style={{ color: "#111827" }}>Yuvaraj</b><br/>Enterprise AI Architecture Library</div>
          <div><Link href="/">Architecture</Link> | <Link href="/videos">Videos</Link> | <Link href="/about">About</Link></div>
        </div>
      </footer>
    </div>
  );
}