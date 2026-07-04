import React from "react";
import { getVideoSeries } from "@/lib/content";
import { PillarPill } from "@/components/PillarPill";
import Link from "next/link";

export default async function VideosPage() {
  const series = await getVideoSeries();

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
              <div style={{ fontWeight: 700, fontSize: "14.5px", lineHeight: 1.2 }}>Yuvaraj</div>
              <div style={{ fontSize: "11.5px", color: "#6B7280" }}>Enterprise AI & Platform Architect</div>
            </div>
          </Link>
          <nav style={{ display: "flex", gap: "26px", fontSize: "13.5px", fontWeight: 500, color: "#6B7280" }}>
            <Link href="/">Architecture</Link>
            <Link href="/videos" style={{ color: "#111827", fontWeight: 600, borderBottom: "2px solid #111827", paddingBottom: "2px" }}>Videos</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link href="/contact" className="btn btn-pri">Contact →</Link>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: "52px", paddingBottom: "72px" }}>
        <div style={{ marginBottom: "44px" }}>
          <div className="eyebrow">Video Library</div>
          <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
            Series-based video learning.
          </h1>
          <p style={{ fontSize: "15px", color: "#6B7280", maxWidth: "540px" }}>
            New uploads sync automatically from YouTube and file into their
            series and topic hub.
          </p>
        </div>

        {series.map((s) => (
          <div key={s.id} className="card" style={{ padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px", flexWrap: "wrap" }}>
              <PillarPill pillar={s.pillar} />
              <h3>{s.title}</h3>
              <span style={{ marginLeft: "auto", fontSize: "12px", color: "#6B7280", fontWeight: 600 }}>
                {s.items.length} episodes
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {s.items.map((item, idx) => (
                <div key={item.id} style={{ background: "#fff", border: "1px solid #E7EAF0", borderRadius: "12px", overflow: "hidden" }}>
                  <div
                    style={{
                      background: s.pillar === "KX"
                        ? "linear-gradient(150deg, #0A1628 20%, #00B894 80%)"
                        : "linear-gradient(150deg, #0A1628 20%, #2563EB 80%)",
                      aspectRatio: "16/9",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B1220", fontSize: "13px", paddingLeft: "3px" }}>
                        ▶
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", color: "#fff", fontWeight: 800, fontSize: "12px", background: "rgba(0,0,0,.45)", padding: "2px 8px", borderRadius: "6px" }}>
                      E{(s.items.length - idx).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div style={{ padding: "12px" }}>
                    <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: "10px 0 2px", lineHeight: 1.35 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: "#6B7280" }}>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "Draft"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {series.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p>No video series yet. Sync your YouTube channel or create content in the Studio.</p>
          </div>
        )}
      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div><b style={{ color: "#111827" }}>Yuvaraj</b><br />Enterprise AI Architecture Library</div>
          <div><Link href="/">Architecture</Link> · <Link href="/videos">Videos</Link> · <Link href="/about">About</Link></div>
        </div>
      </footer>
    </>
  );
}
