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
  summary: string | null;
  category: string | null;
  whyMatters: string | null;
  publishedAt: Date | null;
}

// Source accent colors — drawn from the site's existing palette family
// rather than each company's own brand colors.
const sourceAccent: Record<string, string> = {
  OpenAI: "#10B981",
  "Google DeepMind": "#7C3AED",
  "Hugging Face": "#F59E0B",
  AWS: "#F59E0B",
  "Google Cloud": "#2563EB",
  Azure: "#2563EB",
  Snowflake: "#63C7DE",
};
const defaultAccent = "#6B7280";

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDayHeading(d: Date) {
  const today = new Date();
  const key = dayKey(d);
  if (key === dayKey(today)) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (key === dayKey(yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

export default async function RadarPage() {
  const items: SignalItemRow[] = await prisma.signalItem.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }],
    take: 60,
  });

  // Group into date buckets — this is a log, so the date is real structure,
  // not decoration.
  const groups: { key: string; date: Date; items: SignalItemRow[] }[] = [];
  for (const item of items) {
    const d = item.publishedAt ? new Date(item.publishedAt) : new Date();
    const key = dayKey(d);
    const existing = groups.find((g) => g.key === key);
    if (existing) existing.items.push(item);
    else groups.push({ key, date: d, items: [item] });
  }

  return (
    <div>
      <SiteHeader active="radar" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
        <div style={{ marginBottom: "8px", maxWidth: "640px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ position: "relative", display: "inline-flex", width: "9px", height: "9px" }}>
              <span
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "var(--cyan)", opacity: 0.5,
                  animation: "radar-ping 2.2s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span style={{ position: "relative", width: "9px", height: "9px", borderRadius: "50%", background: "var(--cyan)" }} />
            </span>
            <div className="eyebrow" style={{ margin: 0 }}>Daily AI Architecture</div>
          </div>
          <h1 style={{ marginBottom: "14px" }}>Radar.</h1>
          <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
            A running log of what matters in enterprise AI and data platforms &mdash; releases,
            architecture shifts, and the occasional career note. Curated by hand, not aggregated.
          </p>
        </div>

        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", margin: "28px 0 40px", alignItems: "center" }}>
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

        {groups.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9AA3B2" }}>
            Nothing published yet — check back soon.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px", maxWidth: "760px" }}>
            {groups.map((group) => (
              <div key={group.key}>
                <div
                  className="mono"
                  style={{
                    fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#9AA3B2", marginBottom: "14px", display: "flex", alignItems: "center", gap: "12px",
                  }}
                >
                  {formatDayHeading(group.date)}
                  <span style={{ flex: 1, height: "1px", background: "var(--line)" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {group.items.map((item) => {
                    const cat = SIGNAL_CATEGORIES.find((c) => c.value === item.category);
                    const accent = sourceAccent[item.source] || defaultAccent;
                    return (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card"
                        style={{
                          display: "block", padding: "16px 18px 16px 16px", textDecoration: "none", color: "inherit",
                          borderLeft: `3px solid ${accent}`, transition: "box-shadow .15s, transform .15s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span
                            className="mono"
                            style={{ fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.05em" }}
                          >
                            {item.source}
                          </span>
                          {cat && (
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: cat.color, display: "inline-block" }} />
                          )}
                          {item.publishedAt && (
                            <span style={{ fontSize: "11px", color: "#9AA3B2" }}>
                              {new Date(item.publishedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "15.5px", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: item.whyMatters ? "6px" : 0 }}>
                          {item.title}
                        </div>
                        {item.whyMatters && (
                          <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, fontStyle: "italic" }}>
                            {item.whyMatters}
                          </div>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes radar-ping {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(2.8); opacity: 0; }
        }
        a.card:hover {
          box-shadow: 0 4px 16px rgba(14,27,51,.08);
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="radar-ping"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
