import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <header style={{ background: "#fff", borderBottom: "1px solid #E7EAF0", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>Y</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14.5px", lineHeight: 1.2 }}>Yuvaraj</div>
              <div style={{ fontSize: "11.5px", color: "#6B7280" }}>Enterprise AI & Platform Architect</div>
            </div>
          </Link>
          <nav style={{ display: "flex", gap: "26px", fontSize: "13.5px", fontWeight: 500, color: "#6B7280" }}>
            <Link href="/">Architecture</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about" style={{ color: "#111827", fontWeight: 600, borderBottom: "2px solid #111827", paddingBottom: "2px" }}>About</Link>
          </nav>
          <Link href="/contact" className="btn btn-pri">Contact →</Link>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: "64px", paddingBottom: "72px", maxWidth: "720px" }}>
        <div className="eyebrow">About</div>
        <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Building the systems behind enterprise AI.</h1>

        <div style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "18px" }}>
            I&apos;m Yuvaraj — an Enterprise AI & Platform Architect with 18+ years building
            data-intensive systems at the intersection of analytics, machine learning,
            and platform engineering.
          </p>
          <p style={{ marginBottom: "18px" }}>
            Currently at <b>Exasol AG</b> as Product Evangelist, working on technical
            content, demos, and go-to-market strategy for enterprise data platforms
            in the Indian market.
          </p>
          <p style={{ marginBottom: "18px" }}>
            My work focuses on five areas: modern AI data platforms, enterprise AI
            systems architecture, agentic AI patterns, sovereign AI infrastructure,
            and deep technical content around Exasol&apos;s analytical database.
          </p>

          <h2 style={{ marginTop: "40px", marginBottom: "16px" }}>What I Build</h2>
          <p style={{ marginBottom: "18px" }}>
            <b>NexusIQ</b> — A multi-agent AI governance platform featuring Text-to-SQL,
            RAG pipelines, federated query across Databricks, Snowflake, and Exasol,
            role-based access control, and research intelligence workflows.
          </p>
          <p style={{ marginBottom: "18px" }}>
            <b>Architecture Library</b> — This site. A unified content platform that
            auto-syncs from YouTube, Medium, and LinkedIn into one organized library
            of reference architectures, diagrams, and implementation notes.
          </p>

          <h2 style={{ marginTop: "40px", marginBottom: "16px" }}>Background</h2>
          <p style={{ marginBottom: "18px" }}>
            Previously built enterprise ML systems at scale, trained teams to GCP ML
            certification, designed LangGraph multi-agent systems with human-in-the-loop,
            and deployed RAG pipelines on Azure. Based in Chennai, focused on opportunities
            in Europe.
          </p>

          <div className="card" style={{ padding: "24px", marginTop: "40px" }}>
            <h3 style={{ marginBottom: "12px" }}>Let&apos;s connect</h3>
            <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px" }}>
              Open to conversations about enterprise AI architecture, data platform
              strategy, and roles in Europe.
            </p>
            <Link href="/contact" className="btn btn-pri">Get in touch →</Link>
          </div>
        </div>
      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div><b style={{ color: "#111827" }}>Yuvaraj</b><br />Enterprise AI Architecture Library</div>
          <div><Link href="/">Architecture</Link> · <Link href="/videos">Videos</Link> · <Link href="/about">About</Link></div>
        </div>
      </footer>
    </>
  );
}
