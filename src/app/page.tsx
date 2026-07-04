import React from "react";
import { getLatestContent, getPillarStats } from "@/lib/content";
import { ContentStream } from "@/components/ContentStream";
import { PillarPill } from "@/components/PillarPill";
import { PillarGrid } from "@/components/PillarGrid";
import Link from "next/link";

const pillarNames: Record<string, string> = {
  DP: "Data Platforms",
  ES: "Enterprise AI",
  AA: "Agentic AI",
  SV: "Sovereign AI",
  KX: "Know Exasol",
};

const pillarInfo = [
  { p: "DP", t: "Modern AI Data Platforms", d: "Warehouses · Lakehouses · Federation · MPP" },
  { p: "ES", t: "Enterprise AI Systems", d: "AI Gateways · Policy Engines · Audit · Governance" },
  { p: "AA", t: "Enterprise Agentic AI", d: "Agents · MCP · Tool Use · Orchestration" },
  { p: "SV", t: "Sovereign AI Systems", d: "Trust Boundaries · Residency · Compliance · Control" },
  { p: "KX", t: "Know Exasol", d: "MPP · Optimizer · Execution · Memory · Federation" },
];

export default async function Home() {
  const latest = await getLatestContent(8);
  const stats = await getPillarStats();

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E7EAF0",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "66px",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "#2563EB",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Y
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14.5px", lineHeight: 1.2 }}>
                Yuvaraj
              </div>
              <div style={{ fontSize: "11.5px", color: "#6B7280" }}>
                Enterprise AI & Platform Architect
              </div>
            </div>
          </Link>
          <nav
            style={{
              display: "flex",
              gap: "26px",
              fontSize: "13.5px",
              fontWeight: 500,
              color: "#6B7280",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#111827",
                fontWeight: 600,
                borderBottom: "2px solid #111827",
                paddingBottom: "2px",
              }}
            >
              Architecture
            </Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link href="/contact" className="btn btn-pri">
            Contact →
          </Link>
        </div>
      </header>

      <main className="wrap">
        {/* HERO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr .95fr",
            gap: "48px",
            padding: "64px 0 40px",
            alignItems: "start",
          }}
        >
          <div>
            <div className="eyebrow">Enterprise AI Architecture Library</div>
            <h1 style={{ marginBottom: "16px" }}>
              Practical Reference Architectures for Enterprise AI Systems.
            </h1>
            <p
              style={{
                color: "#6B7280",
                maxWidth: "540px",
                marginBottom: "22px",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              A practical knowledge base for the systems behind modern enterprise
              AI — data platforms, retrieval, memory, governance, agents, and
              architecture patterns. Every article, video, and diagram lives in
              one library, organized by five topics.
            </p>
            <div style={{ display: "flex", gap: "12px", marginBottom: "34px" }}>
              <Link href="/architecture" className="btn btn-pri">
                Explore Architecture Library →
              </Link>
              <Link href="/admin/content-studio" className="btn btn-sec">
                Open Publishing Studio
              </Link>
            </div>

            {/* STATS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "14px",
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.pillar}
                  style={{
                    background: "#fff",
                    border: "1px solid #E7EAF0",
                    borderRadius: "12px",
                    padding: "16px 18px",
                  }}
                >
                  <b
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      display: "block",
                    }}
                  >
                    {stat.count}
                  </b>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: "#6B7280",
                      fontWeight: 500,
                    }}
                  >
                    {pillarNames[stat.pillar] || stat.pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NEXUSIQ CARD */}
          <div className="card" style={{ padding: "26px" }}>
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#2563EB",
                textTransform: "uppercase",
              }}
            >
              Flagship Reference Platform
            </span>
            <h3 style={{ margin: "6px 0 8px" }}>NexusIQ</h3>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>
              Enterprise AI playground for Text-to-SQL, RAG, federated query,
              governance, research intelligence, and architecture demos.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                margin: "18px 0",
              }}
            >
              {["AI SQL", "RAG", "Federation", "Governance"].map((chip) => (
                <div
                  key={chip}
                  style={{
                    border: "1px solid #E7EAF0",
                    borderRadius: "9px",
                    padding: "10px 14px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    background: "#F8FAFC",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span className="btn btn-pri" style={{ fontSize: "12.5px" }}>
                Explore NexusIQ →
              </span>
              <span className="btn btn-sec" style={{ fontSize: "12.5px" }}>
                View architecture
              </span>
            </div>
          </div>
        </section>

        {/* TOPIC HUBS */}
        <div style={{ marginTop: "60px" }}>
          <div className="eyebrow">Architecture Library</div>
          <h2 style={{ marginBottom: "26px" }}>Learn the systems behind modern AI.</h2>
        </div>
        <PillarGrid />

        {/* LATEST STREAM */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "18px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eyebrow">Latest Knowledge</div>
            <h2>One stream — every format, every source.</h2>
          </div>
        </div>

        <ContentStream items={latest} />

        {/* FOOTER CTA */}
        <section
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            justifyContent: "space-between",
            padding: "26px 30px",
            margin: "64px 0 72px",
          }}
        >
          <div>
            <h3>Continue exploring the Enterprise AI Architecture Library.</h3>
            <p
              style={{
                fontSize: "12.5px",
                color: "#6B7280",
                maxWidth: "480px",
                marginTop: "8px",
              }}
            >
              A growing library of reference architectures, diagrams, videos,
              and implementation notes for practical enterprise AI systems.
            </p>
          </div>
          <Link href="/architecture" className="btn btn-pri">
            Open Library →
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#fff",
          borderTop: "1px solid #E7EAF0",
          padding: "32px 0 56px",
        }}
      >
        <div
          className="wrap"
          style={{
            color: "#6B7280",
            fontSize: "12.5px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <b style={{ color: "#111827" }}>Yuvaraj</b>
            <br />
            Enterprise AI Architecture Library
          </div>
          <div>
            <Link href="/">Architecture</Link> ·{" "}
            <Link href="/videos">Videos</Link> ·{" "}
            <Link href="/about">About</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
