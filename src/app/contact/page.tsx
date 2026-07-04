import React from "react";
import Link from "next/link";

export default function ContactPage() {
  const links = [
    { label: "LinkedIn", url: "https://linkedin.com/in/your-profile", desc: "Connect and message me" },
    { label: "YouTube", url: "https://youtube.com/@your-channel", desc: "Watch architecture deep-dives" },
    { label: "Medium", url: "https://medium.com/@your-handle", desc: "Read technical articles" },
    { label: "GitHub", url: "https://github.com/your-handle", desc: "Explore NexusIQ and projects" },
    { label: "Email", url: "mailto:your@email.com", desc: "your@email.com" },
  ];

  const topics = [
    "Enterprise AI Architecture", "Data Platform Strategy", "Agentic AI Systems",
    "MPP Databases", "AI Governance", "Technical Evangelism", "European Tech Market",
  ];

  return (
    <div>
      <header style={{ background: "#fff", borderBottom: "1px solid #E7EAF0", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>Y</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14.5px", lineHeight: 1.2 }}>Yuvaraj</div>
              <div style={{ fontSize: "11.5px", color: "#6B7280" }}>Enterprise AI and Platform Architect</div>
            </div>
          </Link>
          <nav style={{ display: "flex", gap: "26px", fontSize: "13.5px", fontWeight: 500, color: "#6B7280" }}>
            <Link href="/">Architecture</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: "64px", paddingBottom: "72px", maxWidth: "600px" }}>
        <div className="eyebrow">Contact</div>
        <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>Let us talk architecture.</h1>
        <p style={{ fontSize: "15px", color: "#6B7280", marginBottom: "40px" }}>
          Open to conversations about enterprise AI, data platform strategy,
          technical evangelism, and architecture roles in Europe.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="card"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", cursor: "pointer" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14.5px" }}>{link.label}</div>
                <div style={{ fontSize: "12.5px", color: "#6B7280", marginTop: "2px" }}>{link.desc}</div>
              </div>
              <span style={{ fontSize: "18px", color: "#9AA3B2" }}>&#8594;</span>
            </a>
          ))}
        </div>

        <div className="card" style={{ padding: "24px", marginTop: "40px", background: "#F8FAFC" }}>
          <h3 style={{ marginBottom: "8px" }}>Topics I am interested in</h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {topics.map((topic) => (
              <span key={topic} style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "99px", background: "#fff", border: "1px solid #E7EAF0", color: "#374151" }}>
                {topic}
              </span>
            ))}
          </div>
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
