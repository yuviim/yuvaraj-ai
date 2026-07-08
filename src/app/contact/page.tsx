import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function ContactPage() {
  const links = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/yuvim/", desc: "Connect and message me", icon: "in" },
    { label: "YouTube", url: "https://www.youtube.com/@yuvarajplatforms", desc: "Architecture deep-dives and walkthroughs", icon: "\u25B6" },
    { label: "Medium", url: "https://medium.com/@yuvii336_72159", desc: "Technical articles and analysis", icon: "M" },
    { label: "GitHub", url: "https://github.com/yuviim", desc: "NexusIQ, portfolio, and projects", icon: "\u2B21" },
    { label: "Email", url: "mailto:yuvarajm336@gmail.com", desc: "yuvarajm336@gmail.com", icon: "\u2709" },
  ];

  const topics = [
    "Enterprise AI Architecture", "Data Platform Strategy", "Agentic AI Systems",
    "MPP Databases", "AI Governance", "Federated Query", "Sovereign AI",
    "LangGraph / MCP", "European Tech Market",
  ];

  return (
    <div>
<SiteHeader active="none" />

      <main className="wrap" style={{ paddingTop: "64px", paddingBottom: "72px", maxWidth: "640px" }}>
        <div className="eyebrow">Contact</div>
        <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>Let&#39;s talk architecture.</h1>
        <p style={{ fontSize: "15px", color: "#6B7280", marginBottom: "40px", lineHeight: 1.7 }}>
          Open to conversations about enterprise AI architecture, data platform strategy,
          and roles in Europe. Whether you&#39;re hiring, collaborating, or just want to discuss
          systems design &#8212; reach out.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px 22px",
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow .15s",
              }}
            >
              <div style={{
                width: "42px", height: "42px", borderRadius: "10px",
                background: link.label === "LinkedIn" ? "#0A66C2" : link.label === "YouTube" ? "#FF0000" : link.label === "Medium" ? "#0B1220" : link.label === "GitHub" ? "#24292e" : "#2563EB",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 800, flexShrink: 0,
              }}>
                {link.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "14.5px" }}>{link.label}</div>
                <div style={{ fontSize: "12.5px", color: "#6B7280", marginTop: "2px" }}>{link.desc}</div>
              </div>
              <span style={{ fontSize: "18px", color: "#9AA3B2" }}>&#8594;</span>
            </a>
          ))}
        </div>

        <div className="card" style={{ padding: "24px", marginTop: "32px", background: "#F8FAFC" }}>
          <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>Topics I work on</h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {topics.map((topic) => (
              <span
                key={topic}
                style={{
                  fontSize: "12px", fontWeight: 600, padding: "5px 12px",
                  borderRadius: "99px", background: "#fff", border: "1px solid #E7EAF0", color: "#374151",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: "24px", marginTop: "16px" }}>
          <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>Looking for</h3>
          <p style={{ fontSize: "13.5px", color: "#6B7280", lineHeight: 1.7 }}>
            Enterprise AI architecture and data platform roles in Europe.
            18+ years of hands-on experience building the systems behind enterprise AI &#8212;
            from analytical databases to multi-agent orchestration.
          </p>
        </div>
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