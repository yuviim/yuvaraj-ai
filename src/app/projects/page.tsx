import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Enterprise AI & Data Systems",
  description:
    "Six enterprise projects across AI, data platforms, and fintech — RAG pipelines, multi-agent systems, invoice intelligence, ML underwriting, and more.",
  openGraph: {
    title: "Projects | Yuvaraj — Enterprise AI Architecture Library",
    description: "Six enterprise projects across AI, data platforms, and fintech.",
    images: ["/og-image.png"],
  },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Enterprise AI": { bg: "#EDE9FE", text: "#7C3AED" },
  "Finance Automation": { bg: "#FEF3C7", text: "#D97706" },
  "Healthcare": { bg: "#DCFCE7", text: "#16A34A" },
  "Fintech SaaS": { bg: "#DBEAFE", text: "#2563EB" },
  "B2C Fintech": { bg: "#FCE7F3", text: "#DB2777" },
  "Fintech": { bg: "#E0E7FF", text: "#4F46E5" },
};

interface Project {
  title: string;
  category: string;
  description: string;
  impact: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  diagram: string;
  diagramAlt: string;
}

const projects: Project[] = [
  {
    title: "Vendor Intelligence Automation",
    category: "Enterprise AI",
    description:
      "RAG-based intelligent chatbot with multi-layer architecture: SharePoint ingestion, vector embedding, graph retrieval engine with intelligent router for hybrid query handling (structured + semantic search). Event-driven automation via Power Automate for multi-channel communications.",
    impact: "Scaled to enterprise deployment, transforming how leadership accesses vendor intelligence across the organisation.",
    metrics: [
      { label: "Annual savings", value: "$3M+" },
      { label: "Decision speed", value: "+85%" },
    ],
    stack: ["Python", "Azure", "React", "LangChain", "LangGraph", "OpenAI", "Power Automate"],
    diagram: "/images/projects/vendor-intelligence.png",
    diagramAlt: "Vendor Intelligence Automation — Knowledge Bot architecture flow",
  },
  {
    title: "Document Intelligence Platform",
    category: "Enterprise AI",
    description:
      "Secure enterprise document intelligence chatbot built on Google Cloud. Multi-tenant architecture with knowledge graph (Neo4j) for relationship mapping across document corpus. Improved onboarding speed and compliance across geographies.",
    impact: "Freed up manual operations teams, saving significant FTE effort and accelerating regulatory onboarding.",
    metrics: [
      { label: "Onboarding time", value: "-60%" },
      { label: "FTE savings", value: "Significant" },
    ],
    stack: ["Python", "LangChain", "OpenAI", "Document AI", "Vertex AI", "Neo4j", "React"],
    diagram: "/images/projects/document-intelligence.png",
    diagramAlt: "Document Intelligence Platform — Google Cloud architecture",
  },
  {
    title: "Invoice Intelligence Platform",
    category: "Finance Automation",
    description:
      "Multi-cloud invoice extraction pipeline: secure authentication via Workload Identity Federation + Graph API, Document AI processing with business rules engine, automated synchronisation to BigQuery. Replaced a fully manual process that took days per cycle.",
    impact: "Cycle time compressed from days to hours with dramatically improved extraction accuracy.",
    metrics: [
      { label: "Accuracy improvement", value: "+40%" },
      { label: "Manual effort reduction", value: "-70%" },
      { label: "Annual savings", value: "$1.5M" },
    ],
    stack: ["Python", "GCP", "React", "Gemini Flash", "Document AI", "BigQuery", "SQL", "Cloud Logging"],
    diagram: "/images/projects/invoice-intelligence.png",
    diagramAlt: "Invoice Intelligence Platform — SharePoint to GCP multi-cloud architecture",
  },
  {
    title: "GenAI Rule Platform — US Healthcare",
    category: "Healthcare",
    description:
      "GenAI-powered Rule Engine automating policy logic creation and medical reviews. Used FlanT5 for text understanding, AWS Textract for document parsing, and a custom rule engine that translates natural language policies into executable business rules.",
    impact: "Transformed a process that took clinical teams weeks into an automated pipeline completing in hours.",
    metrics: [
      { label: "Cycle time reduction", value: "-90%" },
      { label: "Efficiency improvement", value: "+70%" },
    ],
    stack: ["AWS", "React", "FlanT5 Model", "Textract", "SQL", "Python"],
    diagram: "/images/projects/genai-rule-platform.png",
    diagramAlt: "GenAI Rule Platform — AWS healthcare automation architecture",
  },
  {
    title: "Recommendation Engine — Fintech SaaS",
    category: "Fintech SaaS",
    description:
      "Enterprise SaaS Recommendation Engine for banking clients. Managed end-to-end delivery: API design, data governance, model orchestration with decision trees and collaborative filtering, and deployment patterns across 7+ banking implementations.",
    impact: "Drove measurable revenue uplift and retention improvement across banking client portfolio.",
    metrics: [
      { label: "Revenue generated", value: "AED 4M+" },
      { label: "Client retention", value: "+20%" },
    ],
    stack: ["Python", "AWS", "Decision Tree", "Collaborative Filtering", "React", "Power BI"],
    diagram: "/images/projects/recommendation-engine.png",
    diagramAlt: "Recommendation Engine — Fintech SaaS platform architecture",
  },
  {
    title: "ML Lending Platform — B2C Fintech",
    category: "B2C Fintech",
    description:
      "ML-powered underwriting platform using decision trees, gradient boosting, and logistic regression. Managed 60+ person cross-functional team across engineering, data science, and operations. Built model monitoring, A/B testing framework, and continuous improvement pipelines.",
    impact: "Directly reduced financial risk while improving product stability and user adoption.",
    metrics: [
      { label: "Default rate reduction", value: "-20%" },
      { label: "Post-launch issues", value: "-35%" },
      { label: "Feature adoption", value: "+25%" },
    ],
    stack: ["Python", "Scikit-Learn", "Gradient Boost", "Logistic Regression", "React", "SQL"],
    diagram: "/images/projects/lending-platform.png",
    diagramAlt: "ML-Powered Loan Underwriting Workflow",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cat = categoryColors[project.category] || { bg: "#F3F4F6", text: "#374151" };
  const isReversed = index % 2 === 1;

  return (
    <div className="card" style={{ overflow: "hidden", marginBottom: "32px" }}>
      {/* Diagram */}
      <div style={{
        background: "#F8FAFC",
        padding: "24px",
        borderBottom: "1px solid #E7EAF0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "260px",
      }}>
        <a href={project.diagram} target="_blank" rel="noopener noreferrer" style={{ cursor: "zoom-in", display: "block", width: "100%", maxWidth: "700px" }}>
          <img
            src={project.diagram}
            alt={project.diagramAlt}
            style={{ width: "100%", borderRadius: "8px", display: "block" }}
          />
        </a>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
            padding: "4px 12px", borderRadius: "99px", background: cat.bg, color: cat.text,
          }}>
            {project.category}
          </span>
        </div>

        <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "10px", letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>

        <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7, marginBottom: "16px", maxWidth: "640px" }}>
          {project.description}
        </p>

        {/* Metrics */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          {project.metrics.map((m) => (
            <div key={m.label} style={{
              padding: "12px 18px", borderRadius: "12px",
              background: "#F8FAFC", border: "1px solid #E7EAF0",
              minWidth: "120px",
            }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>
                {m.value}
              </div>
              <div style={{ fontSize: "11px", color: "#9AA3B2", fontWeight: 500, marginTop: "2px" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Impact */}
        <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6, marginBottom: "18px", fontStyle: "italic" }}>
          {project.impact}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {project.stack.map((t) => (
            <span key={t} style={{
              fontSize: "11px", fontWeight: 600, padding: "4px 10px",
              borderRadius: "99px", background: "#F8FAFC", border: "1px solid #E7EAF0", color: "#374151",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <SiteHeader active="projects" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>

        {/* HERO */}
        <div style={{ marginBottom: "48px", maxWidth: "640px" }}>
          <div className="eyebrow">Enterprise Projects</div>
          <h1 style={{ marginBottom: "14px" }}>
            Systems I&rsquo;ve designed and delivered.
          </h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
            Six enterprise AI and data projects across financial services, healthcare,
            and fintech &mdash; each with architecture diagrams, tech stack, and measurable
            business impact. These are production systems, not demos.
          </p>
        </div>

        {/* SUMMARY STRIP */}
        <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "48px",
        }}>
          {[
            { v: "6", l: "Production systems" },
            { v: "$16M+", l: "Business impact" },
            { v: "3", l: "Cloud platforms" },
            { v: "18yr", l: "Enterprise experience" },
          ].map((s) => (
            <div key={s.l} className="card" style={{ padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#2563EB", letterSpacing: "-0.02em" }}>{s.v}</div>
              <div style={{ fontSize: "11px", color: "#9AA3B2", fontWeight: 500, marginTop: "4px" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* PROJECT CARDS */}
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}

        {/* CTA */}
        <section className="card" style={{
          display: "flex", alignItems: "center", gap: "24px",
          justifyContent: "space-between", padding: "26px 30px",
          marginTop: "24px", flexWrap: "wrap",
          background: "linear-gradient(135deg, #0A1628, #1a2d4a)",
        }}>
          <div>
            <h3 style={{ color: "#fff", marginBottom: "6px" }}>Interested in working together?</h3>
            <p style={{ fontSize: "13px", color: "#9AA3B2" }}>
              Open to enterprise AI architecture roles &mdash; particularly in the Netherlands and Germany.
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
    </div>
  );
}
