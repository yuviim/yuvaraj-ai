import React from "react";
import { prisma } from "@/lib/db";
import { PillarPill } from "@/components/PillarPill";
import { SourceBadge } from "@/components/SourceBadge";
import { ContentCard } from "@/components/ContentCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";

export const revalidate = 60;

const pillarMeta: Record<string, { title: string; desc: string; img: string }> = {
  DP: {
    title: "Modern AI Data Platforms",
    desc: "Warehouses, lakehouses, federation, MPP engines, and the data layer that powers enterprise AI.",
    img: "/images/pillar-dp.png",
  },
  ES: {
    title: "Enterprise AI - NexusIQ",
    desc: "AI gateways, policy engines, governance frameworks, audit systems, and operational control planes.",
    img: "/images/pillar-es.png",
  },
  AA: {
    title: "Enterprise Agentic AI",
    desc: "Multi-agent orchestration, MCP, tool use, memory systems, planning, and human-in-the-loop patterns.",
    img: "/images/pillar-aa.png",
  },
  SV: {
    title: "Sovereign AI Systems",
    desc: "Data residency, trust boundaries, compliance enforcement, encryption, and regional AI infrastructure.",
    img: "/images/pillar-sv.png",
  },
  KX: {
    title: "Know Exasol",
    desc: "Deep technical walkthroughs of Exasol's MPP architecture, query optimizer, virtual schemas, and federation engine.",
    img: "/images/pillar-kx.png",
  },
};

const pillarColors: Record<string, string> = {
  DP: "#2563EB", ES: "#7C3AED", AA: "#F59E0B", SV: "#10B981", KX: "#00B894",
};

const validPillars = ["DP", "ES", "AA", "SV", "KX"];

export function generateStaticParams() {
  return validPillars.map((pillar) => ({ pillar: pillar.toLowerCase() }));
}

interface HubContentItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  coverImage?: string | null;
  pillar: string;
  source: string;
  format: string;
  body?: string | null;
  readingTimeMin?: number | null;
  publishedAt?: Date | string | null;
}

export default async function HubPage({ params }: { params: { pillar: string } }) {
  const pillar = params.pillar.toUpperCase();

  if (!validPillars.includes(pillar)) return notFound();

  const meta = pillarMeta[pillar];

  const articles = await prisma.contentItem.findMany({
    where: { pillar, format: "ARTICLE", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const videos = await prisma.contentItem.findMany({
    where: { pillar, format: "VIDEO", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const others = await prisma.contentItem.findMany({
    where: {
      pillar,
      status: "PUBLISHED",
      format: { notIn: ["ARTICLE", "VIDEO"] },
    },
    orderBy: { publishedAt: "desc" },
  });

  const totalCount = articles.length + videos.length + others.length;

  return (
    <div>
      <SiteHeader active="architecture" />

      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
        {/* HERO BANNER */}
        <div className="hero-grid" style={{ marginBottom: "48px", alignItems: "center" }}>
          <div>
            <Link href="/" style={{ fontSize: "13px", color: "#2563EB", fontWeight: 600, marginBottom: "16px", display: "inline-block" }}>&#8592; All Topics</Link>
            <div style={{ marginTop: "8px" }}>
              <PillarPill pillar={pillar} />
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "12px 0" }}>{meta.title}</h1>
            <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, marginBottom: "16px" }}>{meta.desc}</p>
            <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#9AA3B2" }}>
              <span><b style={{ color: "#111827" }}>{totalCount}</b> items</span>
              <span><b style={{ color: "#111827" }}>{articles.length}</b> articles</span>
              <span><b style={{ color: "#111827" }}>{videos.length}</b> videos</span>
            </div>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "16/10" }}>
            <img src={meta.img} alt={meta.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* ARTICLES */}
        {articles.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "18px" }}>Articles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {articles.map((item: HubContentItem) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* VIDEOS */}
        {videos.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "18px" }}>Videos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
              {videos.map((video: HubContentItem) => {
                const ytMatch = (video.body || "").match(/youtube\.com\/watch\?v=([^&\s]+)/) || (video.body || "").match(/youtu\.be\/([^?\s]+)/);
                const ytId = ytMatch ? ytMatch[1] : null;
                const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;

                return (
                  <Link key={video.id} href={"/" + video.slug} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="card" style={{ overflow: "hidden" }}>
                      <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "linear-gradient(150deg, #0A1628, #1e3a5f)" }}>
                        {thumb && <img src={thumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: thumb ? "rgba(0,0,0,.12)" : "transparent" }}>
                          <span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B1220", fontSize: "14px", paddingLeft: "3px" }}>&#9654;</span>
                        </div>
                      </div>
                      <div style={{ padding: "14px 16px" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.35, margin: "0 0 6px" }}>{video.title}</h4>
                        <span style={{ fontSize: "11px", color: "#9AA3B2" }}>
                          {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Draft"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* OTHER CONTENT */}
        {others.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "18px" }}>Notes &amp; Diagrams</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {others.map((item: HubContentItem) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {totalCount === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p>No content published in this topic yet.</p>
          </div>
        )}

        {/* OTHER HUBS */}
        <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E7EAF0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "16px" }}>Explore other topics</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {validPillars.filter((p) => p !== pillar).map((p) => (
              <Link key={p} href={"/hub/" + p.toLowerCase()} style={{
                padding: "8px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
                background: "#F8FAFC", border: "1px solid #E7EAF0", color: "#374151",
                textDecoration: "none",
              }}>
                <PillarPill pillar={p} /> {pillarMeta[p].title}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div><b style={{ color: "#111827" }}>Yuvaraj</b><br />Enterprise AI Architecture Library</div>
          <div><Link href="/">Architecture</Link> | <Link href="/videos">Videos</Link> | <Link href="/about">About</Link></div>
        </div>
      </footer>
    </div>
  );
}