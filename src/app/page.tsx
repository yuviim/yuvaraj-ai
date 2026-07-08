import React from "react";
import { getLatestContent, getPillarStats } from "@/lib/content";
import { ContentStream } from "@/components/ContentStream";
import { PillarGrid } from "@/components/PillarGrid";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const latest = await getLatestContent(8);

  return (
    <>
      <SiteHeader active="none" />

      <main className="wrap">

        {/* HERO — value prop + NexusIQ, no duplicated pillar list */}
        <section className="hero-grid" style={{ padding: "64px 0 56px", alignItems: "start" }}>
          <div>
            <div className="eyebrow">Enterprise AI Architecture Library</div>
            <h1 style={{ marginBottom: "16px" }}>
              Practical reference architectures for enterprise AI.
            </h1>
            <p style={{ color: "#6B7280", maxWidth: "520px", marginBottom: "28px", fontSize: "15px", lineHeight: 1.7 }}>
              Articles, videos, and diagrams covering data platforms, retrieval, agents, governance,
              and sovereign AI. Everything organized into five topic hubs below.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="#library" className="btn btn-pri">Browse the library &#8594;</a>
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
              Architecture &#38; demo &#8594;
            </Link>
          </div>
        </section>

        {/* LIBRARY — topic hubs */}
        <div id="library">
          <div className="eyebrow">Five topic areas</div>
          <h2 style={{ marginBottom: "24px" }}>What&rsquo;s in the library.</h2>
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
        <section className="card" style={{ display: "flex", alignItems: "center", gap: "24px", justifyContent: "space-between", padding: "26px 30px", margin: "56px 0 72px", flexWrap: "wrap" }}>
          <div>
            <h3>Want to discuss architecture or data platform work?</h3>
            <p style={{ fontSize: "12.5px", color: "#6B7280", maxWidth: "480px", marginTop: "6px" }}>
              Based in Chennai, targeting European AI platform and data engineering roles.
            </p>
          </div>
          <Link href="/contact" className="btn btn-pri">Get in touch &#8594;</Link>
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
            <Link href="/research">Research</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/nexusiq">NexusIQ</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
