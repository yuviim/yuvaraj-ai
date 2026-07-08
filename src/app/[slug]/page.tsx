// src/app/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PillarPill } from "@/components/PillarPill";
import { SourceBadge } from "@/components/SourceBadge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await prisma.contentItem.findUnique({ where: { slug: params.slug } });
  if (!item) return {};
  const description = item.excerpt || item.subtitle || (item.body ? item.body.replace(/[#*`>\[\]]/g, "").slice(0, 155) : undefined);
  const image = item.coverImage || "/og-image.png";
  return {
    title: item.title,
    description,
    openGraph: {
      type: "article",
      title: item.title,
      description,
      url: "https://yuvarajai.com/" + item.slug,
      images: [{ url: image, width: 1200, height: 630, alt: item.title }],
      publishedTime: item.publishedAt ? item.publishedAt.toISOString() : undefined,
    },
    twitter: { card: "summary_large_image", title: item.title, description, images: [image] },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const item = await prisma.contentItem.findUnique({
    where: { slug: params.slug },
  });

  if (!item) return notFound();

  return (
    <div>
      <SiteHeader active="none" />

      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px", maxWidth: "880px", overflow: "visible" }}>
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