import React from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

interface SiteHeaderProps {
  active?: "architecture" | "articles" | "research" | "projects" | "videos" | "about" | "nexusiq" | "none";
}

export function SiteHeader({ active = "none" }: SiteHeaderProps) {
  const navItems: { href: string; label: string; key: string }[] = [
    { href: "/articles", label: "Articles", key: "articles" },
    { href: "/projects", label: "Projects", key: "projects" },
    { href: "/nexusiq", label: "NexusIQ", key: "nexusiq" },
    { href: "/videos", label: "Videos", key: "videos" },
    { href: "/about", label: "About", key: "about" },
  ];

  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid #E7EAF0",
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 1px 3px rgba(16,24,40,.05)",
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link {
          position: relative;
          padding: 6px 2px;
          transition: color .15s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0%;
          height: 2px;
          background: #2563EB;
          transition: width .2s ease;
        }
        .nav-link:hover {
          color: #111827 !important;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link-active::after {
          width: 100% !important;
          background: #111827 !important;
        }
        .logo-mark {
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          transition: transform .2s;
        }
        .logo-link:hover .logo-mark {
          transform: scale(1.06) rotate(-4deg);
        }
      `}} />
      <div className="wrap site-header-inner" style={{ display: "flex", alignItems: "center", gap: "16px", height: "72px" }}>

        {/* LOGO — left */}
        <Link href="/" className="logo-link" style={{ display: "flex", alignItems: "center", gap: "11px", flexShrink: 0 }}>
          <div className="logo-mark" style={{ width: "38px", height: "38px", borderRadius: "11px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "16px" }}>Y</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "15px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>Yuvaraj</div>
            <div className="header-tagline" style={{ fontSize: "11px", color: "#9AA3B2", fontWeight: 500 }}>AI Data Platform Architect</div>
          </div>
        </Link>

        {/* NAV — centered in remaining space */}
        <nav className="site-nav" style={{
          display: "flex", gap: "32px", fontSize: "13.5px", fontWeight: 600, color: "#6B7280",
          alignItems: "center", flex: 1, justifyContent: "center",
        }}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={"nav-link" + (active === item.key ? " nav-link-active" : "")}
              style={active === item.key ? { color: "#111827" } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* SEARCH + CONTACT — right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <SearchBar />
          <Link href="/contact" className="btn btn-pri header-contact" style={{
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
          }}>
            Contact &#8594;
          </Link>
        </div>
      </div>
    </header>
  );
}

