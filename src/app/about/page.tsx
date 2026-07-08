import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Yuvaraj",
  description:
    "18+ years building enterprise data and AI systems. Enterprise AI & Platform Architect at Exasol, builder of NexusIQ, targeting European AI architecture roles.",
  openGraph: {
    title: "About Yuvaraj | Enterprise AI Architecture Library",
    description: "18+ years building enterprise data and AI systems.",
    images: ["/og-image.png"],
  },
};

const pillarColors: Record<string, string> = {
  DP: "#2563EB", ES: "#7C3AED", AA: "#F59E0B", SV: "#10B981", KX: "#00B894",
};

export default function AboutPage() {
  return (
    <div>
      <SiteHeader active="about" />

      <main className="wrap" style={{ paddingTop: "56px", paddingBottom: "72px" }}>

        {/* ===== HERO ===== */}
        <section className="hero-grid" style={{ alignItems: "start", marginBottom: "72px", gap: "56px" }}>
          <div style={{ maxWidth: "560px" }}>
            <div className="eyebrow">About</div>
            <h1 style={{ fontSize: "38px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "24px", lineHeight: 1.12 }}>
              Data is the foundation of every technology.
            </h1>
            <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.8, marginBottom: "18px" }}>
              AI, quantum, analytics, governance &mdash; none of it works without the right
              data layer beneath it. That conviction has shaped everything I&rsquo;ve built over
              18 years of enterprise architecture.
            </p>
            <p style={{ fontSize: "15.5px", color: "#374151", lineHeight: 1.8, marginBottom: "18px" }}>
              I&rsquo;m Yuvaraj &mdash; Enterprise AI &amp; Platform Architect at <strong>Exasol</strong>,
              a founding member of their India team. I specialise in designing end-to-end AI systems,
              cloud-native deployments, and enterprise integrations across AWS, Azure, and GCP &mdash;
              with deep experience in financial services, healthcare analytics, and fintech.
            </p>
            <p style={{ fontSize: "15.5px", color: "#374151", lineHeight: 1.8 }}>
              This site is my architecture library: reference designs, deep-dives, experiment logs,
              and videos across the five domains I work in daily.
            </p>
          </div>

          {/* PROFILE CARD */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: "300px", borderRadius: "18px", overflow: "hidden",
              border: "1px solid #E7EAF0", boxShadow: "0 8px 24px rgba(16,24,40,.08)",
            }}>
              <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                <img
                  src="/images/yuvaraj-profile.png"
                  alt="Yuvaraj"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
              <div style={{ padding: "20px 22px", background: "#fff" }}>
                <div style={{ fontWeight: 800, fontSize: "18px", letterSpacing: "-0.01em" }}>Yuvaraj</div>
                <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "3px" }}>
                  Enterprise AI &amp; Platform Architect
                </div>
                <div style={{ fontSize: "12px", color: "#9AA3B2", marginTop: "2px" }}>
                  Exasol &middot; Chennai, India
                </div>
                <div style={{
                  display: "flex", gap: "8px", marginTop: "14px",
                  borderTop: "1px solid #F0F2F5", paddingTop: "14px",
                }}>
                  <a href="/cv/Yuvaraj-CV.pdf" download className="btn btn-pri"
                    style={{ fontSize: "12.5px", padding: "8px 18px", flex: 1, textAlign: "center" }}>
                    Download CV &#8595;
                  </a>
                  <Link href="/contact" className="btn btn-sec"
                    style={{ fontSize: "12.5px", padding: "8px 18px", flex: 1, textAlign: "center" }}>
                    Contact &#8594;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CAREER TIMELINE ===== */}
        <section style={{ marginBottom: "72px" }}>
          <div className="eyebrow">Career</div>
          <h2 style={{ marginBottom: "28px" }}>18 years of building what enterprises run on.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                period: "Apr 2026 \u2013 Present",
                role: "Enterprise AI & Platform Architect",
                org: "Exasol",
                detail: "Founding India team member. Product evangelism, technical content across the Know Exasol series, internal demo platforms including Exasol Studio, and the Virtual Schema federated query demo published to LinkedIn and YouTube.",
                accent: "#2563EB",
              },
              {
                period: "May 2025 \u2013 Mar 2026",
                role: "AI Architect",
                org: "Maveric Systems \u2014 Financial Services",
                detail: "Architected RAG-based platforms with LangChain, LangGraph, and Azure OpenAI. Built a vendor intelligence platform (SharePoint \u2192 vector embedding \u2192 conversational AI) delivering 85% productivity improvement. Designed multi-cloud invoice extraction (SharePoint \u2192 GCP Document AI \u2192 BigQuery) saving $1.5M annually. Built multi-tenant document intelligence with LlamaIndex and Azure Cognitive Services.",
                accent: "#7C3AED",
              },
              {
                period: "Oct 2023 \u2013 May 2025",
                role: "Senior Manager, AI/ML Product Delivery",
                org: "EXL Services \u2014 Healthcare Analytics",
                detail: "Led Gen AI\u2013powered claims automation: LLM-based rule creation, anomaly detection, and analytics pipelines. Delivered 25% improvement in detection accuracy and 25% increase in claims processing accuracy. Drove $11M revenue through cloud migration and vendor consolidation.",
                accent: "#F59E0B",
              },
              {
                period: "Apr 2021 \u2013 Oct 2023",
                role: "Senior Program Manager",
                org: "Crayon Data \u2014 Fintech SaaS",
                detail: "Delivered 7+ banking client implementations of an enterprise recommendation engine. Managed API design, data governance, model orchestration, and deployment patterns. Generated AED 2.3M incremental revenue and improved client satisfaction by 30%.",
                accent: "#10B981",
              },
              {
                period: "Aug 2016 \u2013 Apr 2021",
                role: "Senior Manager, Product Delivery",
                org: "Applied Data Finance \u2014 B2C Fintech",
                detail: "Led delivery of ML-powered underwriting platform across 60+ person teams. Reduced loan default rates by 20% through decision trees and gradient boosting. Managed release pipelines reducing post-launch issues by 35%.",
                accent: "#00B894",
              },
              {
                period: "Apr 2007 \u2013 Jan 2016",
                role: "Delivery Lead / Project Manager",
                org: "Accenture",
                detail: "Enterprise transformation programs for US-based clients. Large-scale data warehouses, ETL systems, and the analytical foundations that led to AI architecture work.",
                accent: "#9AA3B2",
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "180px 1fr", gap: "28px",
                padding: "24px 0",
                borderBottom: i < 5 ? "1px solid #F0F2F5" : "none",
              }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: item.accent }}>{item.period}</div>
                  <div style={{ fontSize: "12px", color: "#9AA3B2", marginTop: "2px" }}>{item.org}</div>
                </div>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "6px" }}>{item.role}</h4>
                  <p style={{ fontSize: "13.5px", color: "#6B7280", lineHeight: 1.65 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CERTIFICATIONS & SKILLS ===== */}
        <section style={{ marginBottom: "72px" }}>
          <div className="hero-grid" style={{ gap: "24px" }}>
            <div>
              <div className="eyebrow">Certifications</div>
              <h2 style={{ marginBottom: "20px" }}>Credentials.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { cert: "Generative AI with Large Language Models", org: "Deeplearning.ai" },
                  { cert: "Google Cloud Practitioner Fundamentals", org: "Google Cloud" },
                  { cert: "SAFe 6.0 Certified", org: "Scaled Agile Inc." },
                  { cert: "Project Management Professional (PMP)", org: "PMI" },
                  { cert: "MBA \u2014 Operations Management", org: "NIBM" },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0", borderBottom: i < 4 ? "1px solid #F0F2F5" : "none",
                  }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{c.cert}</span>
                    <span style={{ fontSize: "12px", color: "#9AA3B2", flexShrink: 0, marginLeft: "16px" }}>{c.org}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow">Core stack</div>
              <h2 style={{ marginBottom: "20px" }}>What I work with.</h2>
              {[
                { area: "AI/ML", tools: "LangChain, LangGraph, CrewAI, LlamaIndex, LangSmith, RAG, Agentic AI" },
                { area: "Cloud", tools: "AWS, Azure, GCP, Multi-cloud patterns" },
                { area: "Data", tools: "Exasol, Databricks, Snowflake, BigQuery, PostgreSQL, Neo4j" },
                { area: "Engineering", tools: "FastAPI, React, Next.js, TypeScript, Python, MCP" },
              ].map((s) => (
                <div key={s.area} style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "6px" }}>{s.area}</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {s.tools.split(", ").map((t) => (
                      <span key={t} style={{ fontSize: "11.5px", fontWeight: 600, padding: "4px 10px", borderRadius: "99px", background: "#F8FAFC", border: "1px solid #E7EAF0", color: "#374151" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT I BUILD ===== */}
        <section style={{ marginBottom: "72px" }}>
          <div className="eyebrow">What I Build</div>
          <h2 style={{ marginBottom: "24px" }}>Reference platforms, not slide decks.</h2>
          <div className="hero-grid" style={{ gap: "20px" }}>
            <div className="card" style={{ padding: "28px", borderTop: "3px solid #7C3AED" }}>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", color: "#7C3AED", textTransform: "uppercase" }}>
                Flagship platform
              </span>
              <h3 style={{ margin: "8px 0 10px" }}>NexusIQ</h3>
              <p style={{ fontSize: "13.5px", color: "#6B7280", lineHeight: 1.65, marginBottom: "16px" }}>
                A working multi-agent AI control plane: Text-to-SQL, RAG, federated query across
                Databricks, Snowflake, MySQL, and Exasol, with role-based governance and sovereign
                AI request classification. Every capability runs end-to-end.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["FastAPI", "React", "LangGraph", "ChromaDB", "MCP", "Databricks", "Snowflake", "Exasol"].map((t) => (
                  <span key={t} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "99px", background: "#F8FAFC", border: "1px solid #E7EAF0", color: "#374151" }}>{t}</span>
                ))}
              </div>
              <Link href="/nexusiq" style={{ display: "inline-block", marginTop: "16px", fontSize: "13px", fontWeight: 600, color: "#7C3AED" }}>
                View architecture &#8594;
              </Link>
            </div>
            <div className="card" style={{ padding: "28px", borderTop: "3px solid #2563EB" }}>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", color: "#2563EB", textTransform: "uppercase" }}>
                This site
              </span>
              <h3 style={{ margin: "8px 0 10px" }}>Architecture Library</h3>
              <p style={{ fontSize: "13.5px", color: "#6B7280", lineHeight: 1.65, marginBottom: "16px" }}>
                A full-stack content platform with a custom CMS, markdown editor with image uploads
                and diagram embedding, YouTube sync, and five topic hubs. Auto-deploys from GitHub to Vercel.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Next.js 14", "TypeScript", "Prisma", "Neon Postgres", "Vercel Blob", "Vercel"].map((t) => (
                  <span key={t} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "99px", background: "#F8FAFC", border: "1px solid #E7EAF0", color: "#374151" }}>{t}</span>
                ))}
              </div>
              <Link href="/" style={{ display: "inline-block", marginTop: "16px", fontSize: "13px", fontWeight: 600, color: "#2563EB" }}>
                Browse the library &#8594;
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FIVE DOMAINS ===== */}
        <section style={{ marginBottom: "72px" }}>
          <div className="eyebrow">Five domains</div>
          <h2 style={{ marginBottom: "24px" }}>Where I focus.</h2>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px" }}>
            {[
              { code: "DP", label: "Data Platforms", line: "The layer everything else depends on." },
              { code: "ES", label: "Enterprise AI", line: "Production AI with policy and governance." },
              { code: "AA", label: "Agentic AI", line: "Agents that plan, act, and operate under policy." },
              { code: "SV", label: "Sovereign AI", line: "When data can\u2019t cross a boundary." },
              { code: "KX", label: "Know Exasol", line: "MPP internals, architecture to execution." },
            ].map((p) => (
              <Link key={p.code} href={"/hub/" + p.code.toLowerCase()} className="card" style={{
                padding: "18px", borderTop: "3px solid " + (pillarColors[p.code] || "#2563EB"),
                display: "block", textDecoration: "none", color: "inherit",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
                  textTransform: "uppercase", padding: "3px 10px", borderRadius: "99px",
                  backgroundColor: (pillarColors[p.code] || "#2563EB") + "15",
                  color: pillarColors[p.code] || "#2563EB", marginBottom: "10px",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: pillarColors[p.code] || "#2563EB" }} />
                  {p.code}
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3 }}>{p.label}</h4>
                <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5 }}>{p.line}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== WHERE I'M HEADED ===== */}
        <section style={{
          marginBottom: "72px", padding: "32px 36px", borderRadius: "16px",
          background: "linear-gradient(135deg, #0A1628, #1a2d4a)", color: "#fff",
        }}>
          <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7B8AA3", marginBottom: "10px" }}>
            Where I&rsquo;m headed
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "14px", color: "#fff" }}>
            Targeting European AI platform architecture.
          </h2>
          <p style={{ fontSize: "15px", color: "#9AA3B2", lineHeight: 1.75, maxWidth: "640px", marginBottom: "8px" }}>
            My longer-term goal is to relocate to Germany and work on enterprise AI and data platform
            architecture at scale. Europe&rsquo;s regulatory landscape &mdash; GDPR, the AI Act, data
            sovereignty requirements &mdash; aligns directly with what I build: governed, auditable,
            policy-aware AI systems.
          </p>
          <p style={{ fontSize: "14px", color: "#7B8AA3", lineHeight: 1.7 }}>
            Open to conversations about architecture roles, data platform strategy, and AI governance.
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
            <Link href="/contact" className="btn" style={{
              background: "#fff", color: "#0A1628", fontSize: "13px", fontWeight: 700,
              padding: "10px 22px", borderRadius: "10px", display: "inline-block",
            }}>
              Get in touch &#8594;
            </Link>
            <a href="/cv/Yuvaraj-CV.pdf" download className="btn" style={{
              background: "transparent", color: "#fff", fontSize: "13px", fontWeight: 600,
              padding: "10px 22px", borderRadius: "10px", display: "inline-block",
              border: "1px solid rgba(255,255,255,.25)",
            }}>
              Download CV &#8595;
            </a>
          </div>
        </section>

      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div><b style={{ color: "#111827" }}>Yuvaraj</b><br />Enterprise AI Architecture Library</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/">Library</Link>
            <Link href="/research">Research</Link>
            <Link href="/nexusiq">NexusIQ</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
