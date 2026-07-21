import React from "react";
import { prisma } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import { ContentStream } from "@/components/ContentStream";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Articles — Enterprise AI Architecture Library",
  description:
    "Every article, video, and diagram published on yuvarajai.com — data platforms, agentic AI, sovereign AI, governance, and Exasol internals.",
  openGraph: {
    title: "Articles | Yuvaraj — Enterprise AI Architecture Library",
    description: "Every article, video, and diagram published on yuvarajai.com.",
    images: ["/og-image.png"],
  },
};

const topicColors: Record<string, string> = {
  DP: "#2563EB",
  ES: "#7C3AED",
  AA: "#F59E0B",
  SV: "#10B989",
  KX: "#00B894",
};

const topicLabels: Record<string, string> = {
  DP: "Data Platforms",
  ES: "Enterprise AI",
  AA: "Agentic AI",
  SV: "Sovereign AI",
  KX: "Know Exasol",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  const activeTopic = searchParams.topic?.toUpperCase();

  const items = await prisma.contentItem.findMany({
    where: {
      status: "PUBLISHED",
      ...(activeTopic && Object.keys(topicLabels).includes(activeTopic)
        ? { pillar: activeTopic }
        : {}),
    },
    orderBy: [{ publishedAt: { sort: "desc", nulls: "first" } }, { createdAt: "desc" }],
  });

  const allCounts = await prisma.contentItem.groupBy({
    by: ["pillar"],
    where: { status: "PUBLISHED" },
    _count: true,
  });
  const countByPillar: Record<string, number> = {};
  allCounts.forEach((c: { pillar: string; _count: number }) => { countByPillar[c.pillar] = c._count; });
  const totalCount = allCounts.reduce((sum: number, c: { _count: number }) => sum + c._count, 0);

  return (
    <div>
      <SiteHeader active="none" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "32px", maxWidth: "640px" }}>
          <div className="eyebrow">Full Archive</div>
          <h1 style={{ marginBottom: "14px" }}>All Articles &amp; Videos</h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
            Every piece published on this site &mdash; {totalCount} items across five topic areas,
            newest first.
          </p>
        </div>

        {/* TOPIC FILTER CHIPS */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          <Link
            href="/articles"
            style={{
              fontSize: "12.5px", fontWeight: 600, padding: "7px 16px", borderRadius: "99px",
              border: !activeTopic ? "1px solid #111827" : "1px solid #E7EAF0",
              background: !activeTopic ? "#111827" : "#fff",
              color: !activeTopic ? "#fff" : "#374151",
              textDecoration: "none",
            }}
          >
            All ({totalCount})
          </Link>
          {Object.entries(topicLabels).map(([code, label]) => {
            const isActive = activeTopic === code;
            const count = countByPillar[code] || 0;
            if (count === 0) return null;
            return (
              <Link
                key={code}
                href={"/articles?topic=" + code.toLowerCase()}
                style={{
                  fontSize: "12.5px", fontWeight: 600, padding: "7px 16px", borderRadius: "99px",
                  border: isActive ? "1px solid " + topicColors[code] : "1px solid #E7EAF0",
                  background: isActive ? topicColors[code] : "#fff",
                  color: isActive ? "#fff" : "#374151",
                  textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "6px",
                }}
              >
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: isActive ? "#fff" : topicColors[code],
                }} />
                {label} ({count})
              </Link>
            );
          })}
        </div>

        {/* CONTENT GRID */}
        {items.length > 0 ? (
          <ContentStream items={items} />
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p>No items found for this topic yet.</p>
          </div>
        )}

      </main>
    </div>
  );
}
