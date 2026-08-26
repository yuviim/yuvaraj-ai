import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Independent Projects — NexusIQ & NexusRetail | Yuvaraj",
  description:
    "Two independently built reference platforms: NexusIQ, a multi-agent AI governance platform, and NexusRetail, an end-to-end AWS retail system with AI invoice reconciliation.",
  openGraph: {
    title: "Independent Projects | Yuvaraj",
    description:
      "NexusIQ and NexusRetail \u2014 full reference platforms designed, built, and operated solo, outside of any employer engagement.",
    images: ["/og-image.png"],
  },
};

interface IndependentProject {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
  accent: string;
  accentBg: string;
}

const independentProjects: IndependentProject[] = [
  {
    slug: "/nexusiq",
    eyebrow: "Multi-Agent AI Governance",
    title: "NexusIQ",
    description:
      "A working multi-agent AI control plane: Text-to-SQL, RAG, federated query across four engines, role-based governance, and sovereign AI request classification \u2014 running end to end.",
    chips: ["AI \u2192 SQL", "RAG", "Federation", "Governance", "Sovereign AI"],
    accent: "#7C3AED",
    accentBg: "#EDE9FE",
  },
  {
    slug: "/nexusretail",
    eyebrow: "End-to-End AWS Build",
    title: "NexusRetail",
    description:
      "A multi-tenant retail and inventory platform with AI invoice reconciliation, designed, deployed, and operated solo in a real AWS account \u2014 VPC, ECS Fargate, Cognito, Textract, WAF, and full CI/CD.",
    chips: ["VPC & Security", "ECS Fargate", "Textract AI", "WAF", "CI/CD"],
    accent: "#B45F00",
    accentBg: "#FFF7EC",
  },
];

function ProjectCard({ project }: { project: IndependentProject }) {
  return (
    <Link
      href={project.slug}
      className="card indep-card"
      style={{ display: "block", padding: "30px 32px", textDecoration: "none", color: "inherit" }}
    >
      <div className="mono" style={{
        fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
        color: project.accent, marginBottom: "12px",
      }}>
        {project.eyebrow}
      </div>
      <h2 style={{ marginBottom: "12px" }}>{project.title}</h2>
      <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, marginBottom: "18px" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {project.chips.map((chip) => (
          <span key={chip} className="mono" style={{
            fontSize: "11px", fontWeight: 600, padding: "5px 12px", borderRadius: "99px",
            background: project.accentBg, color: project.accent,
          }}>
            {chip}
          </span>
        ))}
      </div>
      <span style={{ fontSize: "13px", fontWeight: 700, color: project.accent }}>
        Explore {project.title} &#8594;
      </span>
    </Link>
  );
}

export default function IndependentProjectsPage() {
  return (
    <div>
      <SiteHeader active="independent-projects" />
      <style dangerouslySetInnerHTML={{ __html: `
        .indep-card {
          transition: transform .2s, box-shadow .2s;
        }
        .indep-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 26px rgba(14,27,51,.1);
        }
        .indep-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 860px) {
          .indep-grid { grid-template-columns: 1fr; }
        }
      `}} />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>

        {/* HERO */}
        <div style={{ marginBottom: "40px", maxWidth: "660px" }}>
          <div className="eyebrow">No Employer, No Team, No Shortcuts</div>
          <h1 style={{ marginBottom: "14px" }}>
            What I build when nobody&rsquo;s asking me to.
          </h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
            Full systems, designed and operated solo, in real cloud accounts I pay for myself. No sandbox,
            no staging environment someone else maintains, no ticket dictating scope &mdash; every decision
            here is one I made, deployed, broke, and fixed. Each page below covers the trade-offs, not just
            the diagram.
          </p>
        </div>

        {/* PROJECT GRID */}
        <div className="indep-grid">
          {independentProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </main>
    </div>
  );
}
