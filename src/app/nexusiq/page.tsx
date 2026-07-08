import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { getContentByPillar } from "@/lib/content";
import { ContentStream } from "@/components/ContentStream";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "NexusIQ — Multi-Agent AI Governance Platform | Yuvaraj",
  description:
    "Reference architecture for NexusIQ: multi-agent orchestration, Text-to-SQL, RAG, federated query across Databricks, Snowflake, MySQL and Exasol, with governance, RBAC/RLS, and sovereign AI controls.",
  openGraph: {
    title: "NexusIQ — Multi-Agent AI Governance Platform",
    description:
      "Multi-agent orchestration, Text-to-SQL, RAG, federated query, and governance — a full enterprise AI reference architecture.",
    images: ["/og-image.png"],
  },
};

const capabilities = [
  { t: "AI \u2192 SQL", d: "Natural-language querying across connected engines with dialect-aware generation." },
  { t: "RAG", d: "Document retrieval over ChromaDB with role-based document filtering." },
  { t: "Federation", d: "One question, many engines \u2014 Databricks, Snowflake, MySQL, Exasol." },
  { t: "Governance", d: "RBAC, row-level security, and a full audit trail on every request." },
  { t: "Sovereign AI", d: "Request classification against data-residency policy before execution." },
  { t: "MCP Tooling", d: "SharePoint and SQL exposed as Model Context Protocol servers." },
];

function ArchitectureDiagram() {
  return (
    <figure style={{ margin: 0, padding: 0 }}>
      <a href="/images/nexusiq-architecture.png" target="_blank" rel="noopener noreferrer" style={{ display: "block", cursor: "zoom-in" }}>
        <img
          src="/images/nexusiq-architecture.png"
          alt="NexusIQ Multi-Agent AI Architecture — Experience, Gateway, Intelligence, Tools & Knowledge, and Federated Data Plane layers"
          style={{
            width: "100%",
            maxWidth: "960px",
            display: "block",
            margin: "0 auto",
            borderRadius: "12px",
          }}
        />
      </a>
      <figcaption style={{ fontSize: "12px", color: "#9AA3B2", marginTop: "10px", textAlign: "center" }}>
        Click to view full size
      </figcaption>
    </figure>
  );
}

export default async function NexusIQPage() {
  const related = await getContentByPillar("ES", 6);

  return (
    <div>
      <SiteHeader active="nexusiq" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
        {/* HERO */}
        <div style={{ maxWidth: "720px", marginBottom: "40px" }}>
          <div className="eyebrow">Flagship Reference Platform</div>
          <h1 style={{ marginBottom: "14px" }}>NexusIQ &mdash; Multi-Agent AI Governance Platform</h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
            NexusIQ is a working reference implementation of an enterprise AI control plane: multi-agent
            orchestration with governance enforced in the agent state, natural-language querying across four
            federated engines, retrieval over governed documents, and sovereign-AI request classification
            before anything executes. Every capability shown below runs end-to-end.
          </p>
        </div>

        {/* CAPABILITIES */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "48px" }}>
          {capabilities.map((c) => (
            <div key={c.t} className="card" style={{ padding: "16px 18px" }}>
              <h4 style={{ fontSize: "13.5px", fontWeight: 700, marginBottom: "6px" }}>{c.t}</h4>
              <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.55 }}>{c.d}</p>
            </div>
          ))}
        </div>

        {/* ARCHITECTURE */}
        <div style={{ marginBottom: "16px" }}>
          <div className="eyebrow">Reference Architecture</div>
          <h2 style={{ marginBottom: "8px" }}>How the layers fit together.</h2>
          <p style={{ color: "#6B7280", fontSize: "14px", maxWidth: "640px", marginBottom: "22px" }}>
            Requests flow from the experience layer through the FastAPI gateway, are routed to specialized
            agents, pass through the governance engine, and execute against MCP tools and the federated data plane.
          </p>
        </div>
        <div className="card" style={{ padding: "24px", marginBottom: "56px" }}>
          <ArchitectureDiagram />
        </div>

        {/* RELATED CONTENT */}
        {related.length > 0 && (
          <>
            <div className="eyebrow">From the Library</div>
            <h2 style={{ marginBottom: "18px" }}>Articles &amp; videos about NexusIQ.</h2>
            <ContentStream items={related} />
          </>
        )}

        {/* CTA */}
        <section className="card" style={{ display: "flex", alignItems: "center", gap: "24px", justifyContent: "space-between", padding: "26px 30px", margin: "56px 0 0", flexWrap: "wrap" }}>
          <div>
            <h3>Want a walkthrough of the architecture?</h3>
            <p style={{ fontSize: "12.5px", color: "#6B7280", maxWidth: "480px", marginTop: "8px" }}>
              I regularly demo NexusIQ end-to-end &mdash; agents, governance, and federation live.
            </p>
          </div>
          <Link href="/contact" className="btn btn-pri">Get in touch &#8594;</Link>
        </section>
      </main>
    </div>
  );
}
