import React from "react";
import { getLatestContent, getPillarStats } from "@/lib/content";
import { ContentStream } from "@/components/ContentStream";
import { PillarGrid } from "@/components/PillarGrid";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const latest = await getLatestContent(4);
  const stats = await getPillarStats();
  const totalArticles = stats.reduce((sum, s) => sum + s.count, 0);
  const featured = latest[0];

  return (
    <>
      <SiteHeader active="none" />

      <style dangerouslySetInnerHTML={{ __html: `
        .start-card {
          position: relative;
          padding: 22px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #E7EAF0;
          text-decoration: none;
          color: inherit;
          display: block;
          overflow: hidden;
          transition: transform .2s, box-shadow .2s;
        }
        .start-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(16,24,40,.1);
        }
        .start-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          transition: height .2s;
        }
        .start-card:hover::before {
          height: 5px;
        }
        .start-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          margin-bottom: 12px;
          transition: transform .2s;
        }
        .start-card:hover .start-icon {
          transform: scale(1.1);
        }
        .featured-card {
          display: block;
          padding: 18px 22px;
          border-radius: 12px;
          border: 1px solid #E7EAF0;
          background: linear-gradient(135deg, #F8FAFC, #EFF4FF);
          text-decoration: none;
          color: inherit;
          margin-bottom: 20px;
          max-width: 520px;
          transition: transform .15s, box-shadow .15s;
        }
        .featured-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37,99,235,.12);
        }
        .footer-cta {
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: space-between;
          padding: 28px 32px;
          margin: 56px 0 72px;
          flex-wrap: wrap;
          border-radius: 16px;
          background: linear-gradient(135deg, #0A1628, #1a2d4a);
          position: relative;
          overflow: hidden;
        }
        .footer-cta::before {
          content: '';
          position: absolute;
          top: -50%; right: -20%;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,.15), transparent 70%);
        }
      `}} />

      <main className="wrap">

        {/* HERO */}
        <section className="hero-grid" style={{ padding: "56px 0 44px", alignItems: "start" }}>
          <div>
            <div className="eyebrow">Enterprise AI Architecture Library</div>
            <h1 style={{ marginBottom: "16px" }}>
              Practical reference architectures for enterprise AI.
            </h1>
            <p style={{ color: "#6B7280", maxWidth: "520px", marginBottom: "24px", fontSize: "15px", lineHeight: 1.7 }}>
              {totalArticles}+ articles, videos, and diagrams across data platforms, agents,
              governance, and sovereign AI &mdash; organized into five topic hubs.
            </p>

            {/* FEATURED ARTICLE — dynamic, auto-updates */}
            {featured && (
              <Link href={"/" + featured.slug} className="featured-card">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB" }}>
                    Latest article
                  </span>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", lineHeight: 1.35, marginBottom: "4px" }}>
                  {featured.title}
                </div>
                {featured.excerpt && (
                  <div style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5 }}>
                    {featured.excerpt.slice(0, 120)}{featured.excerpt.length > 120 ? "..." : ""}
                  </div>
                )}
                <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#2563EB", display: "inline-block", marginTop: "8px" }}>
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

        {/* START HERE — attractive cards with hover effects */}
        <section style={{ marginBottom: "48px" }}>
          <div className="eyebrow" style={{ marginBottom: "16px" }}>Recommended</div>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            <Link href="/building-enterprise-agentic-ai-systems-intro-mr6fxqfd" className="start-card" style={{ "--accent": "#F59E0B" } as React.CSSProperties}>
              <div className="start-icon" style={{ background: "#FEF3C7", color: "#D97706" }}>&#9889;</div>
              <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#D97706", marginBottom: "8px" }}>
                Start here
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, lineHeight: 1.35, marginBottom: "6px" }}>
                Building Enterprise Agentic AI Systems
              </div>
              <div style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5 }}>
                A 9-layer reference architecture for enterprise agents. Part 1 of a deep-dive series.
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#D97706", display: "inline-block", marginTop: "10px" }}>
                Read article &#8594;
              </span>
            </Link>

            <Link href="/projects" className="start-card" style={{ "--accent": "#2563EB" } as React.CSSProperties}>
              <div className="start-icon" style={{ background: "#DBEAFE", color: "#2563EB" }}>&#9878;</div>
              <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", marginBottom: "8px" }}>
                6 enterprise projects
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, lineHeight: 1.35, marginBottom: "6px" }}>
                Systems I&rsquo;ve Designed &amp; Delivered
              </div>
              <div style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5 }}>
                Architecture diagrams, tech stacks, and $16M+ in measurable business impact.
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#2563EB", display: "inline-block", marginTop: "10px" }}>
                View projects &#8594;
              </span>
            </Link>

            <Link href="/nexusiq" className="start-card" style={{ "--accent": "#7C3AED" } as React.CSSProperties}>
              <div className="start-icon" style={{ background: "#EDE9FE", color: "#7C3AED" }}>&#9670;</div>
              <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7C3AED", marginBottom: "8px" }}>
                Flagship platform
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, lineHeight: 1.35, marginBottom: "6px" }}>
                NexusIQ Architecture Walkthrough
              </div>
              <div style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5 }}>
                Multi-agent AI with federated query across Databricks, Snowflake, MySQL, and Exasol.
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#7C3AED", display: "inline-block", marginTop: "10px" }}>
                Explore NexusIQ &#8594;
              </span>
            </Link>

          </div>
        </section>

        {/* LIBRARY — topic hubs */}
        <div>
          <div className="eyebrow">Five topic areas</div>
          <h2 style={{ marginBottom: "24px" }}>Explore by topic.</h2>
          <PillarGrid />
        </div>

        {/* LATEST — reduced to 4, with strong "see all" */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "18px", marginTop: "16px", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">Latest</div>
            <h2>Recently published.</h2>
          </div>
        </div>
        <ContentStream items={latest} />
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link href="/articles" className="btn btn-sec" style={{ fontSize: "13px" }}>
            View all articles &amp; videos &#8594;
          </Link>
        </div>

        {/* FOOTER CTA */}
        <section className="footer-cta">
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ color: "#fff", marginBottom: "6px" }}>Open to enterprise AI architecture roles in Europe.</h3>
            <p style={{ fontSize: "13px", color: "#9AA3B2", maxWidth: "480px" }}>
              18 years of enterprise delivery. Targeting the Netherlands and Germany.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", position: "relative", zIndex: 1 }}>
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
            <Link href="/">Home</Link>
            <Link href="/articles">Articles</Link>
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
