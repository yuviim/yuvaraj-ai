import React from "react";
import { getLatestContent, getPillarStats } from "@/lib/content";
import { ContentStream } from "@/components/ContentStream";
import { PillarGrid } from "@/components/PillarGrid";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function Home() {
  const latest = await getLatestContent(8);
  const stats = await getPillarStats();
  const totalArticles = stats.reduce((sum, s) => sum + s.count, 0);

  // Get the featured/newest article for the hero CTA
  const featured = latest[0];

  return (
    <>
      <SiteHeader active="none" />

      <main className="wrap">

        {/* HERO — featured article + NexusIQ */}
        <section className="hero-grid" style={{ padding: "56px 0 48px", alignItems: "start" }}>
          <div>
            <div className="eyebrow">Enterprise AI Architecture Library</div>
            <h1 style={{ marginBottom: "16px" }}>
              Practical reference architectures for enterprise AI.
            </h1>
            <p style={{ color: "#6B7280", maxWidth: "520px", marginBottom: "24px", fontSize: "15px", lineHeight: 1.7 }}>
              {totalArticles}+ articles, videos, and diagrams across data platforms, agents,
              governance, and sovereign AI &mdash; organized into five topic hubs.
            </p>

            {/* FEATURED ARTICLE — strong above-the-fold CTA */}
            {featured && (
              <Link href={"/" + featured.slug} style={{
                display: "block", padding: "16px 20px", borderRadius: "12px",
                border: "1px solid #E7EAF0", background: "#F8FAFC",
                textDecoration: "none", color: "inherit", marginBottom: "20px",
                maxWidth: "520px",
              }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", marginBottom: "6px" }}>
                  Latest article
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", lineHeight: 1.35, marginBottom: "4px" }}>
                  {featured.title}
                </div>
                {featured.excerpt && (
                  <div style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5 }}>
                    {featured.excerpt.slice(0, 120)}{featured.excerpt.length > 120 ? "..." : ""}
                  </div>
                )}
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#2563EB", display: "inline-block", marginTop: "8px" }}>
                  Read article &#8594;
                </span>
              </Link>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <Link href="/projects" className="btn btn-pri">View projects &#8594;</Link>
              <Link href="/about" className="btn btn-sec">About Yuvaraj</Link>
            </div>
          </div>

          {/* NEXUSIQ CARD */}
          <div className="card" style={{ padding: "26px" }}>
            <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", color: "#7C3AED", textTransform: "uppercase" }}>
              Flagship reference platform
            </span>
            <h3 style={{ margin: "6px 0 8px" }}>NexusIQ</h3>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
              A working multi-agent AI control plane with Text-to-SQL, RAG, federated query
              across four engines, role-based governance, and sovereign AI controls.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "16px 0" }}>
              {["AI \u2192 SQL", "RAG", "Federation", "Governance"].map((chip) => (
                <div key={chip} style={{ border: "1px solid #E7EAF0", borderRadius: "9px", padding: "9px 14px", fontSize: "12px", fontWeight: 600, background: "#F8FAFC" }}>{chip}</div>
              ))}
            </div>
            <Link href="/nexusiq" className="btn btn-pri" style={{ fontSize: "12.5px", display: "inline-block" }}>
              Architecture &amp; demo &#8594;
            </Link>
          </div>
        </section>

        {/* START HERE — for first-time visitors */}
        <section style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px",
          marginBottom: "48px",
        }} className="stats-grid">
          <Link href="/building-enterprise-agentic-ai-systems-intro-mr6fxqfd" className="card" style={{
            padding: "20px", textDecoration: "none", color: "inherit", display: "block",
            borderTop: "3px solid #F59E0B",
          }}>
            <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F59E0B", marginBottom: "8px" }}>
              Start here
            </div>
            <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.35, marginBottom: "6px" }}>
              Building Enterprise Agentic AI Systems
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280" }}>
              A 9-layer reference architecture for enterprise agents.
            </div>
          </Link>

          <Link href="/projects" className="card" style={{
            padding: "20px", textDecoration: "none", color: "inherit", display: "block",
            borderTop: "3px solid #2563EB",
          }}>
            <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", marginBottom: "8px" }}>
              6 enterprise projects
            </div>
            <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.35, marginBottom: "6px" }}>
              Systems I&rsquo;ve Designed &amp; Delivered
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280" }}>
              Architecture diagrams, tech stacks, and $16M+ business impact.
            </div>
          </Link>

          <Link href="/nexusiq" className="card" style={{
            padding: "20px", textDecoration: "none", color: "inherit", display: "block",
            borderTop: "3px solid #7C3AED",
          }}>
            <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7C3AED", marginBottom: "8px" }}>
              Flagship platform
            </div>
            <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.35, marginBottom: "6px" }}>
              NexusIQ Architecture Walkthrough
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280" }}>
              Multi-agent AI with federated query and governance.
            </div>
          </Link>
        </section>

        {/* LIBRARY — topic hubs */}
        <div>
          <div className="eyebrow">Five topic areas</div>
          <h2 style={{ marginBottom: "24px" }}>Explore by topic.</h2>
          <PillarGrid />
        </div>

        {/* LATEST */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "18px", marginTop: "16px", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">Latest</div>
            <h2>Recently published.</h2>
          </div>
          <Link href="/research" style={{ fontSize: "13px", fontWeight: 600, color: "#2563EB" }}>
            View all research &#8594;
          </Link>
        </div>
        <ContentStream items={latest} />

        {/* FOOTER CTA */}
        <section style={{
          display: "flex", alignItems: "center", gap: "24px",
          justifyContent: "space-between", padding: "28px 32px",
          margin: "56px 0 72px", flexWrap: "wrap", borderRadius: "16px",
          background: "linear-gradient(135deg, #0A1628, #1a2d4a)",
        }}>
          <div>
            <h3 style={{ color: "#fff", marginBottom: "6px" }}>Open to enterprise AI architecture roles in Europe.</h3>
            <p style={{ fontSize: "13px", color: "#9AA3B2", maxWidth: "480px" }}>
              18 years of enterprise delivery. Targeting the Netherlands and Germany.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/contact" className="btn" style={{
              background: "#fff", color: "#0A1628", fontSize: "13px", fontWeight: 700,
              padding: "10px 22px", borderRadius: "10px",
            }}>
              Get in touch &#8594;
            </Link>
            <a href="/cv/Yuvaraj-CV.pdf" download className="btn" style={{
              background: "transparent", color: "#fff", fontSize: "13px", fontWeight: 600,
              padding: "10px 22px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.25)",
            }}>
              Download CV &#8595;
            </a>
          </div>
        </section>

      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <b style={{ color: "#111827" }}>Yuvaraj</b><br />
            Enterprise AI Architecture Library
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/">Library</Link>
            <Link href="/research">Research</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/nexusiq">NexusIQ</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
