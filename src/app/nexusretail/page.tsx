import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "NexusRetail — End-to-End AWS Build with AI Invoice Reconciliation | Yuvaraj",
  description:
    "A multi-tenant inventory and order management platform built solo on AWS: VPC isolation, ECS Fargate, Cognito, Textract-based invoice reconciliation, WAF, and full CI/CD — every decision made and defended end to end.",
  openGraph: {
    title: "NexusRetail — End-to-End AWS Reference Build",
    description:
      "Multi-tenant AWS platform with AI invoice reconciliation — networking, security, CI/CD, and observability, all implemented and operated solo.",
    images: ["/og-image.png"],
  },
};

const capabilities = [
  { t: "Network Isolation", d: "Two-AZ VPC with public/private subnets \u2014 database and containers have no direct route to the internet." },
  { t: "Compute & Auth", d: "ECS Fargate behind an ALB, RDS Postgres in the private subnet, Cognito for tenant-scoped access." },
  { t: "AI Invoice Reconciliation", d: "Textract AnalyzeExpense extraction, automatic PO lookup, fuzzy line-item matching, human-in-the-loop on low-confidence matches." },
  { t: "Security", d: "Separate ECS execution/task IAM roles, AWS WAF managed rules plus a custom rate-based rule, tuned from real false positives." },
  { t: "Observability", d: "Terraform-defined CloudWatch dashboards, nine alarms on SNS \u2014 used in practice to distinguish a rolling deploy from an incident." },
  { t: "CI/CD", d: "Two independent GitHub Actions pipelines \u2014 API to ECR/ECS, frontend to S3/CloudFront \u2014 each with its own IAM scope." },
];

const decisions = [
  {
    t: "Task role vs. execution role, kept strictly separate",
    d: "The execution role only pulls images and writes logs. A distinct task role is what the application actually uses to call S3, Textract, and Secrets Manager \u2014 conflating the two causes access-denied failures that look like code bugs but are an IAM gap.",
  },
  {
    t: "Human-in-the-loop over full automation",
    d: "The invoice pipeline could update stock automatically on every extraction. It doesn't. When a match is confident, stock updates immediately; when it isn't, the system stops and shows a person exactly what didn't align, with nothing written until they approve.",
  },
  {
    t: "Landing page decoupled from the product",
    d: "The marketing site at www.nexusretail.yuvarajai.com runs on its own S3 bucket, its own CloudFront distribution, and its own deploy pipeline \u2014 deliberately kept away from the authenticated app's release cadence.",
  },
  {
    t: "WAF false positives fixed by exclusion, not by disabling rules",
    d: "Two real false positives (SizeRestrictions_BODY and CrossSiteScripting_BODY, both against genuine PDF invoice uploads) were diagnosed from WAF sampled requests and excluded individually to count-only, with every other rule left fully enforced.",
  },
];

function ArchitectureDiagram() {
  return (
    <figure style={{ margin: 0, padding: 0 }}>
      <a href="/images/nexusretail-architecture.png" target="_blank" rel="noopener noreferrer" style={{ display: "block", cursor: "zoom-in" }}>
        <img
          src="/images/nexusretail-architecture.png"
          alt="NexusRetail AWS architecture — Route 53, WAF, ALB, ECS Fargate, RDS Postgres in a two-AZ VPC, Cognito auth, Textract invoice pipeline with confidence-based human review, and dual GitHub Actions CI/CD pipelines"
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

function VideoEmbed() {
  return (
    <figure style={{ margin: 0, padding: 0 }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px" }}>
        <iframe
          src="https://www.youtube.com/embed/K_kagA2orUU"
          title="NexusRetail — full architecture walkthrough"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption style={{ fontSize: "12px", color: "#9AA3B2", marginTop: "10px", textAlign: "center" }}>
        Full architecture walkthrough, recorded end to end
      </figcaption>
    </figure>
  );
}

export default function NexusRetailPage() {
  return (
    <div>
      <SiteHeader active="independent-projects" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
        {/* HERO */}
        <div style={{ maxWidth: "760px", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "7px 14px", borderRadius: "99px", marginBottom: "18px",
            background: "#0E1B33", border: "1px solid #FF9900",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF9900" }} />
            <span className="mono" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", color: "#FFB020", textTransform: "uppercase" }}>
              100% AWS Cloud &middot; Designed, Deployed &amp; Operated Solo
            </span>
          </div>
          <div className="eyebrow">Independent AWS Build &middot; eu-central-1</div>
          <h1 style={{ marginBottom: "14px" }}>NexusRetail &mdash; Multi-Tenant Retail Platform with AI Invoice Reconciliation</h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7, marginBottom: "22px" }}>
            NexusRetail is a multi-tenant inventory and order management platform with a full AI invoice-reconciliation
            pipeline, designed, built, and operated solo in a real AWS account. The product itself was chosen because
            it&rsquo;s messy enough to force real decisions across networking, compute, identity, multi-tenancy, security,
            AI document processing, CI/CD, and observability &mdash; in one system, not as separate exercises. It also
            doubled as the hands-on companion project for AWS Solutions Architect Associate study.
          </p>

          {/* AWS SERVICES STRIP */}
          <div style={{ marginBottom: "22px" }}>
            <div className="mono" style={{ fontSize: "10.5px", fontWeight: 700, color: "#B45F00", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
              AWS services used
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["VPC", "ECS Fargate", "ALB", "RDS PostgreSQL", "Cognito", "S3", "CloudFront", "Route 53", "ACM", "Secrets Manager", "Textract", "Bedrock", "CloudWatch", "SNS", "ECR", "WAF"].map((svc) => (
                <span key={svc} className="mono" style={{
                  fontSize: "11.5px", fontWeight: 600, padding: "6px 12px",
                  borderRadius: "99px", background: "#FFF7EC", border: "1px solid #FFD699", color: "#B45F00",
                }}>
                  {svc}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="https://github.com/yuviim/nexusretail" target="_blank" rel="noopener noreferrer" className="btn btn-pri">Source &#8594;</a>
          </div>
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
          <h2 style={{ marginBottom: "8px" }}>Every layer, built and operated end to end.</h2>
          <p style={{ color: "#6B7280", fontSize: "14px", maxWidth: "640px", marginBottom: "22px" }}>
            A custom VPC across two availability zones keeps the database and application containers off the public
            internet entirely. ECS Fargate runs behind an ALB fronted by WAF, RDS Postgres sits in the private subnet,
            and Cognito handles tenant-scoped auth. The invoice pipeline flows from S3 through Textract and fuzzy PO
            matching, routing to automatic stock updates or human review based on match confidence &mdash; with two
            independent GitHub Actions pipelines handling API and frontend deploys.
          </p>
        </div>
        <div className="card" style={{ padding: "24px", marginBottom: "56px" }}>
          <ArchitectureDiagram />
        </div>

        {/* WALKTHROUGH VIDEO */}
        <div style={{ marginBottom: "16px" }}>
          <div className="eyebrow">Full Walkthrough</div>
          <h2 style={{ marginBottom: "8px" }}>The build, narrated end to end.</h2>
        </div>
        <div className="card" style={{ padding: "24px", marginBottom: "56px" }}>
          <VideoEmbed />
        </div>

        {/* DECISIONS */}
        <div style={{ marginBottom: "16px" }}>
          <div className="eyebrow">Decisions I&rsquo;d Defend</div>
          <h2 style={{ marginBottom: "8px" }}>Trade-offs made on purpose, not by default.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "48px" }}>
          {decisions.map((d) => (
            <div key={d.t} className="card" style={{ padding: "18px 20px" }}>
              <h4 style={{ fontSize: "13.5px", fontWeight: 700, marginBottom: "8px" }}>{d.t}</h4>
              <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.6 }}>{d.d}</p>
            </div>
          ))}
        </div>

        {/* TECH STACK */}
        <div style={{ marginBottom: "16px" }}>
          <div className="eyebrow">Tech Stack</div>
          <h2 style={{ marginBottom: "18px" }}>What it runs on.</h2>
        </div>
        <div className="card" style={{ padding: "22px 24px", marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#9AA3B2", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Cloud &amp; IaC</div>
              <p style={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.7 }}>
                AWS (eu-central-1) &mdash; VPC, ECS Fargate, ALB, RDS PostgreSQL, Cognito, S3, CloudFront, Route 53, ACM,
                Secrets Manager, Textract, Bedrock, CloudWatch, SNS, ECR, WAF &middot; Terraform
              </p>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#9AA3B2", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Backend &amp; CI/CD</div>
              <p style={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.7 }}>
                Node.js, Prisma ORM, multer &middot; GitHub Actions
              </p>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#9AA3B2", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Frontend</div>
              <p style={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.7 }}>
                Vite, React, Tailwind CSS
              </p>
            </div>
          </div>
        </div>

        {/* IN PROGRESS */}
        <div className="card" style={{ padding: "20px 24px", marginBottom: "48px", borderLeft: "3px solid #FFB020" }}>
          <h4 style={{ fontSize: "13.5px", fontWeight: 700, marginBottom: "8px" }}>Currently blocked</h4>
          <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.6 }}>
            A Bedrock orchestrator agent (a tool-calling loop over the Converse API for extract, match, and update-stock
            tools) is fully written but blocked on an AWS Marketplace payment-instrument issue unrelated to regular AWS
            billing &mdash; left documented as genuinely unresolved rather than implied working.
          </p>
        </div>

        {/* CTA */}
        <section className="card" style={{ display: "flex", alignItems: "center", gap: "24px", justifyContent: "space-between", padding: "26px 30px", margin: "16px 0 0", flexWrap: "wrap" }}>
          <div>
            <h3>Want the Terraform, or a deeper walkthrough?</h3>
            <p style={{ fontSize: "12.5px", color: "#6B7280", maxWidth: "480px", marginTop: "8px" }}>
              Happy to go through the networking, the WAF tuning, or the invoice pipeline in detail.
            </p>
          </div>
          <Link href="/contact" className="btn btn-pri">Get in touch &#8594;</Link>
        </section>
      </main>
    </div>
  );
}
