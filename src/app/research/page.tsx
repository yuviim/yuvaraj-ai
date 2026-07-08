import React from "react";
import { prisma } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import { ContentStream } from "@/components/ContentStream";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Research — Technology Exploration",
  description:
    "Field notes on emerging technologies — AI architectures, data systems, agent frameworks, vector databases, and experiment logs.",
  openGraph: {
    title: "Research — Technology Exploration | Yuvaraj",
    description: "Field notes on emerging technologies — AI architectures, data systems, agent frameworks.",
    images: ["/og-image.png"],
  },
};

const topicColors: Record<string, string> = {
  DP: "#2563EB",
  ES: "#7C3AED",
  AA: "#F59E0B",
  SV: "#10B981",
  KX: "#00B894",
};

const topicLabels: Record<string, string> = {
  DP: "Data Platforms",
  ES: "Enterprise AI",
  AA: "Agentic AI",
  SV: "Sovereign AI",
  KX: "Know Exasol",
};

export default async function ResearchPage() {
  const notes = await prisma.contentItem.findMany({
    where: {
      format: "RESEARCH",
      status: "PUBLISHED",
    },
    orderBy: [{ publishedAt: { sort: "desc", nulls: "first" } }, { createdAt: "desc" }],
  });

  // Also pull articles/notes tagged with research intent (all formats) for latest stream
  const allRecent = await prisma.contentItem.findMany({
    where: {
      status: "PUBLISHED",
      format: { in: ["RESEARCH", "NOTE"] },
    },
    orderBy: [{ publishedAt: { sort: "desc", nulls: "first" } }, { createdAt: "desc" }],
    take: 20,
  });

  // Group research by pillar
  const grouped: Record<string, typeof notes> = {};
  for (const note of notes) {
    if (!grouped[note.pillar]) grouped[note.pillar] = [];
    grouped[note.pillar].push(note);
  }
  const activePillars = Object.keys(grouped).sort();

  return (
    <div>
      <SiteHeader active="research" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>

        {/* HEADER */}
        <div className="hero-grid" style={{ alignItems: "start", marginBottom: "48px" }}>
          <div style={{ maxWidth: "560px" }}>
            <div className="eyebrow">Field Notes</div>
            <h1 style={{ marginBottom: "14px" }}>Research &amp; Exploration</h1>
            <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
              Thinking out loud on emerging AI and data systems &mdash; paper breakdowns,
              experiment logs, technology comparisons, architecture sketches, and notes
              from deep dives that didn&rsquo;t quite fit an article format.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "10px" }}>
                What goes here
              </div>
              {[
                { icon: "⌁", label: "Technology deep-dives" },
                { icon: "◎", label: "Architecture comparisons" },
                { icon: "↯", label: "Experiment logs and results" },
                { icon: "✦", label: "Paper notes and summaries" },
                { icon: "⊛", label: "Tool evaluations and TIL entries" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "5px 0", fontSize: "13px", color: "#374151" }}>
                  <span style={{ color: "#9AA3B2", fontWeight: 700, width: "16px" }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BY TOPIC */}
        {activePillars.length > 0 && (
          <>
            <div className="eyebrow">By topic area</div>
            <h2 style={{ marginBottom: "24px" }}>Research notes, grouped.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "56px" }}>
              {activePillars.map((pillar) => (
                <div key={pillar}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
                      textTransform: "uppercase", padding: "3px 10px", borderRadius: "99px",
                      background: (topicColors[pillar] || "#2563EB") + "18",
                      color: topicColors[pillar] || "#2563EB",
                    }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: topicColors[pillar] || "#2563EB" }} />
                      {topicLabels[pillar] || pillar}
                    </span>
                    <span style={{ fontSize: "12px", color: "#9AA3B2", fontWeight: 600 }}>
                      {grouped[pillar].length} note{grouped[pillar].length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ContentStream items={grouped[pillar]} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* EMPTY STATE */}
        {notes.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0 40px" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px", opacity: 0.3 }}>⌁</div>
            <h3 style={{ color: "#374151", marginBottom: "10px" }}>Research notes coming soon.</h3>
            <p style={{ color: "#9AA3B2", fontSize: "14px", maxWidth: "400px", margin: "0 auto 24px" }}>
              Publish your first research note from Content Studio &mdash; set the format to <strong>Research</strong>.
            </p>
            <Link href="/admin/content-studio" className="btn btn-pri">Open Content Studio &#8594;</Link>
          </div>
        )}

        {/* LATEST NOTES + ARTICLES */}
        {allRecent.length > 0 && (
          <>
            <div className="eyebrow" style={{ marginTop: "16px" }}>All field notes</div>
            <h2 style={{ marginBottom: "18px" }}>Notes &amp; research, chronological.</h2>
            <ContentStream items={allRecent} />
          </>
        )}

        {/* CTA */}
        <div className="card" style={{ display: "flex", gap: "24px", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", marginTop: "56px", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ marginBottom: "6px" }}>Have thoughts on these explorations?</h3>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>Architecture discussions, paper suggestions, or just want to talk AI data systems.</p>
          </div>
          <Link href="/contact" className="btn btn-pri">Get in touch &#8594;</Link>
        </div>

      </main>
    </div>
  );
}
