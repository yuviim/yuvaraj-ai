import React from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

interface SiteHeaderProps {
  active?: "architecture" | "articles" | "research" | "projects" | "videos" | "about" | "nexusiq" | "none";
}

export function SiteHeader({ active = "none" }: SiteHeaderProps) {
  const navItems: { href: string; label: string; key: string }[] = [
    { href: "/articles", label: "Articles", key: "articles" },
    { href: "/research", label: "Research", key: "research" },
    { href: "/projects", label: "Projects", key: "projects" },
    { href: "/nexusiq", label: "NexusIQ", key: "nexusiq" },
    { href: "/videos", label: "Videos", key: "videos" },
    { href: "/about", label: "About", key: "about" },
  ];

  return (
    <header style={{
      background: "#0E1B33",
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid rgba(99,199,222,.18)",
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .bp-nav-link {
          position: relative;
          padding: 6px 2px;
          color: #8A97B5;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color .15s;
        }
        .bp-nav-link::before {
          content: '';
          position: absolute;
          left: -10px; top: 50%;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #63C7DE;
          opacity: 0;
          transform: translateY(-50%);
          transition: opacity .15s;
        }
        .bp-nav-link:hover {
          color: #E8F6FA !important;
        }
        .bp-nav-link:hover::before {
          opacity: 1;
        }
        .bp-nav-link-active {
          color: #63C7DE !important;
        }
        .bp-nav-link-active::before {
          opacity: 1 !important;
        }
        .bp-logo-mark {
          background: linear-gradient(135deg, #63C7DE, #2C6E8C);
          transition: transform .2s;
        }
        .bp-logo-link:hover .bp-logo-mark {
          transform: rotate(-6deg);
        }
        .bp-search input {
          color: #E8F6FA !important;
        }
        .bp-search .search-bar {
          border: 1px solid rgba(99,199,222,.25) !important;
          background: rgba(99,199,222,.06) !important;
        }
        .bp-search input::placeholder {
          color: #6C7A99 !important;
        }
        .bp-search span {
          color: #6C7A99 !important;
        }
      `}} />
      <div className="wrap site-header-inner" style={{ display: "flex", alignItems: "center", gap: "16px", height: "68px" }}>

        {/* LOGO — left */}
        <Link href="/" className="bp-logo-link" style={{ display: "flex", alignItems: "center", gap: "11px", flexShrink: 0 }}>
          <div className="bp-logo-mark" style={{ width: "36px", height: "36px", borderRadius: "8px", color: "#0E1B33", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "15px", fontFamily: "'Space Grotesk', sans-serif" }}>Y</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Yuvaraj</div>
            <div className="header-tagline mono" style={{ fontSize: "10px", color: "#6C7A99", fontWeight: 500, letterSpacing: "0.03em" }}>AI DATA PLATFORM ARCHITECT</div>
          </div>
        </Link>

        {/* NAV — centered, mono-cased */}
        <nav className="site-nav" style={{
          display: "flex", gap: "34px",
          alignItems: "center", flex: 1, justifyContent: "center",
        }}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={"bp-nav-link" + (active === item.key ? " bp-nav-link-active" : "")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* SEARCH + CONTACT — right */}
        <div className="bp-search" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <SearchBar />
          <Link href="/contact" className="btn btn-pri header-contact" style={{
            background: "linear-gradient(135deg, #63C7DE, #2C8FAD)",
            color: "#0A1628",
            fontWeight: 700,
          }}>
            Contact &#8594;
          </Link>
        </div>
      </div>
    </header>
  );
}
