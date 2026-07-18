import React from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

interface SiteHeaderProps {
  active?: "architecture" | "articles" | "research" | "projects" | "videos" | "about" | "nexusiq" | "none";
}

const activeStyle: React.CSSProperties = {
  color: "#111827",
  fontWeight: 600,
  borderBottom: "2px solid #111827",
  paddingBottom: "2px",
};

export function SiteHeader({ active = "none" }: SiteHeaderProps) {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #E7EAF0", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="wrap site-header-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", height: "66px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>Y</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "14.5px", lineHeight: 1.2 }}>Yuvaraj</div>
            <div className="header-tagline" style={{ fontSize: "11.5px", color: "#6B7280" }}>AI Data Platform Architect</div>
          </div>
        </Link>
        <nav className="site-nav" style={{ display: "flex", gap: "22px", fontSize: "13.5px", fontWeight: 500, color: "#6B7280", alignItems: "center" }}>
          <Link href="/articles" style={active === "articles" ? activeStyle : undefined}>Articles</Link>
          <Link href="/projects" style={active === "projects" ? activeStyle : undefined}>Projects</Link>
          <Link href="/nexusiq" style={active === "nexusiq" ? activeStyle : undefined}>NexusIQ</Link>
          <Link href="/videos" style={active === "videos" ? activeStyle : undefined}>Videos</Link>
          <Link href="/about" style={active === "about" ? activeStyle : undefined}>About</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <SearchBar />
          <Link href="/contact" className="btn btn-pri header-contact">Contact &#8594;</Link>
        </div>
      </div>
    </header>
  );
}
