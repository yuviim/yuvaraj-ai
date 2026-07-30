import React from "react";
import { prisma } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import { SIGNAL_CATEGORIES } from "@/lib/signalFeeds";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Radar — Daily AI Architecture Signal",
  description: "A running log of what matters in enterprise AI and data platforms — curated, not aggregated.",
};

interface SignalItemRow {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string | null;
  whyMatters: string | null;
  publishedAt: Date | null;
}

export default async function RadarPage() {
  const items = await prisma.signalItem.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }],
    take: 60,
  });

  return (
    <div>
      <SiteHeader active="radar" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
        <div style={{ marginBottom: "28px", maxWidth: "640px" }}>
          <div className="eyebrow">Daily AI Architecture</div>
          <h1 style={{ marginBottom: "14px" }}>Radar.</h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
            A running log of what matters in enterprise AI and data platforms &mdash; releases,
            architecture shifts, and the occasional career note. Curated by hand, not aggregated.
          </p>
        </div>

        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", marginBottom: "36px", alignItems: "center" }}>
          {SIGNAL_CATEGORIES.map((cat) => (
            <div key={cat.value} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#6B7280" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: cat.color, display: "inline-block" }} />
              {cat.label}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#9AA3B2" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
            No tag
          </div>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9AA3B2" }}>
            Nothing published yet — check back soon.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item: SignalItemRow) => {
              const cat = SIGNAL_CATEGORIES.find((c) => c.value === item.category);
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", padding: "18px 0", borderBottom: "1px solid #E7EAF0",
                    textDecoration: "none", color: "inherit",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: cat ? cat.color : "#D1D5DB", flexShrink: 0 }} />
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {item.source}
                    </span>
                    {item.publishedAt && (
                      <span style={{ fontSize: "11.5px", color: "#9AA3B2" }}>
                        {new Date(item.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "15.5px", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: item.whyMatters ? "4px" : 0 }}>
                    {item.title}
                  </div>
                  {item.whyMatters && (
                    <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>{item.whyMatters}</div>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
