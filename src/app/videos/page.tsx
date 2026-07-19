"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const pillarLabels: Record<string, string> = {
  DP: "Modern AI Data Platforms",
  ES: "Enterprise AI Systems",
  AA: "Enterprise Agentic AI",
  SV: "Sovereign AI Systems",
  KX: "Know Exasol",
};

const pillarColors: Record<string, string> = {
  DP: "#2563EB", ES: "#7C3AED", AA: "#F59E0B", SV: "#10B981", KX: "#00B894",
};

const pillarBgs: Record<string, string> = {
  DP: "#EFF4FF", ES: "#F3EEFE", AA: "#FEF6E7", SV: "#E9FAF3", KX: "#E6FAF4",
};

const pillarOrder = ["KX", "DP", "ES", "AA", "SV"];

interface VideoItem {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  pillar: string;
  source: string;
  publishedAt: string | null;
}

function getYouTubeId(text: string): string | null {
  const match = text.match(/youtube\.com\/watch\?v=([^&\s]+)/) ||
                text.match(/youtu\.be\/([^?\s]+)/) ||
                text.match(/youtube\.com\/embed\/([^?\s]+)/);
  return match ? match[1] : null;
}

function VideoCard({ video, episodeNum }: { video: VideoItem; episodeNum?: number }) {
  const ytId = video.body ? getYouTubeId(video.body) : null;
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;

  return (
    <Link href={"/" + video.slug} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "linear-gradient(150deg, #0A1628 20%, #1e3a5f 80%)" }}>
          {thumb && (
            <img
              src={thumb}
              alt={video.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.includes("maxresdefault")) {
                  img.src = img.src.replace("maxresdefault", "hqdefault");
                }
              }}
            />
          )}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: thumb ? "rgba(0,0,0,.12)" : "transparent" }}>
            <span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B1220", fontSize: "14px", paddingLeft: "3px", boxShadow: "0 2px 8px rgba(0,0,0,.2)" }}>&#9654;</span>
          </div>
          {episodeNum !== undefined && (
            <div style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,.8)", background: "rgba(0,0,0,.45)", padding: "2px 8px", borderRadius: "6px" }}>
              E{String(episodeNum).padStart(2, "0")}
            </div>
          )}
        </div>
        <div style={{ padding: "14px 16px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.35, margin: "0 0 6px" }}>{video.title}</h4>
          <span style={{ fontSize: "11px", color: "#9AA3B2" }}>
            {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Draft"}
          </span>
        </div>
      </div>
    </Link>
  );
}

function TopicSection({ pillar, videos }: { pillar: string; videos: VideoItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const label = pillarLabels[pillar] || pillar;
  const color = pillarColors[pillar] || "#2563EB";
  const bg = pillarBgs[pillar] || "#EFF4FF";
  const latest = videos[0];
  const rest = videos.slice(1);
  const hasMore = rest.length > 0;

  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", padding: "3px 10px", borderRadius: "99px",
          backgroundColor: bg, color: color,
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: color }} />
          {pillar}
        </span>
        <h2 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>{label}</h2>
        <span style={{ fontSize: "12px", color: "#9AA3B2", fontWeight: 600 }}>{videos.length} video{videos.length !== 1 ? "s" : ""}</span>
      </div>

      {!expanded ? (
        <div className="video-hero-grid" style={{ display: "grid", gridTemplateColumns: hasMore ? "1.2fr 1fr" : "1fr", gap: "16px", alignItems: "stretch" }}>
          <VideoCard video={latest} episodeNum={videos.length} />

          {hasMore && (
            <div
              onClick={() => setExpanded(true)}
              style={{
                background: bg,
                border: `1px solid ${color}20`,
                borderRadius: "14px",
                padding: "28px 24px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "36px", fontWeight: 800, color: color, letterSpacing: "-0.02em", marginBottom: "8px" }}>
                +{rest.length}
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>
                more episode{rest.length !== 1 ? "s" : ""} in this series
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px", lineHeight: 1.5 }}>
                {rest.slice(0, 3).map((v) => v.title).join(" \u00B7 ")}
                {rest.length > 3 ? " \u2026" : ""}
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: color }}>
                View full series &#8594;
              </span>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {videos.map((video, idx) => (
              <VideoCard key={video.id} video={video} episodeNum={videos.length - idx} />
            ))}
          </div>
          <button
            onClick={() => setExpanded(false)}
            style={{
              marginTop: "16px", fontSize: "13px", fontWeight: 600,
              color: color, background: "none", border: "none",
              cursor: "pointer", fontFamily: "inherit", padding: "8px 0",
            }}
          >
            &#8592; Collapse series
          </button>
        </div>
      )}
    </div>
  );
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?format=VIDEO&status=PUBLISHED")
      .then((res) => res.json())
      .then((data) => { setVideos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const grouped: Record<string, VideoItem[]> = {};
  for (const video of videos) {
    const p = (video.pillar || "DP").toUpperCase();
    if (!grouped[p]) grouped[p] = [];
    grouped[p].push(video);
  }
  const knownPillars = pillarOrder.filter((p) => grouped[p] && grouped[p].length > 0);
  const unknownPillars = Object.keys(grouped).filter((p) => !pillarOrder.includes(p));
  const sortedPillars = [...knownPillars, ...unknownPillars];

  return (
    <div>
<SiteHeader active="videos" />

      <main className="wrap" style={{ paddingTop: "52px", paddingBottom: "72px" }}>
        <div style={{ marginBottom: "44px" }}>
          <div className="eyebrow">Video Library</div>
          <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>Architecture deep-dives and walkthroughs.</h1>
          <p style={{ fontSize: "15px", color: "#6B7280", maxWidth: "540px" }}>
            Technical videos organized by topic &#8212; click any series to see all episodes.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9AA3B2" }}>Loading videos...</div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p>No videos published yet.</p>
          </div>
        ) : (
          sortedPillars.map((pillar) => (
            <TopicSection key={pillar} pillar={pillar} videos={grouped[pillar]} />
          ))
        )}
      </main>

      <footer style={{ background: "#fff", borderTop: "1px solid #E7EAF0", padding: "32px 0 56px" }}>
        <div className="wrap" style={{ color: "#6B7280", fontSize: "12.5px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div><b style={{ color: "#111827" }}>Yuvaraj</b><br />Enterprise AI Architecture Library</div>
          <div><Link href="/">Architecture</Link> | <Link href="/videos">Videos</Link> | <Link href="/about">About</Link></div>
        </div>
      </footer>
    </div>
  );
}