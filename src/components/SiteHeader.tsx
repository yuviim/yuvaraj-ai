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
      background: "linear-gradient(135deg, #0A1628, #142943)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 2px 12px rgba(0,0,0,.25)",
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link-dark {
          position: relative;
          padding: 6px 2px;
          color: #9AA3B2;
          transition: color .15s;
        }
        .nav-link-dark::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0%;
          height: 2px;
          background: #3B82F6;
          transition: width .2s ease;
        }
        .nav-link-dark:hover {
          color: #fff !important;
        }
        .nav-link-dark:hover::after {
          width: 100%;
        }
        .nav-link-dark-active {
          color: #fff !important;
        }
        .nav-link-dark-active::after {
          width: 100% !important;
          background: #3B82F6 !important;
        }
        .logo-mark-dark {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          transition: transform .2s;
        }
        .logo-link-dark:hover .logo-mark-dark {
          transform: scale(1.06) rotate(-4deg);
        }
        .dark-search .search-bar {
          border: 1px solid rgba(255,255,255,.15) !important;
          background: rgba(255,255,255,.06) !important;
        }
        .dark-search .search-bar input {
          color: #fff !important;
        }
        .dark-search .search-bar input::placeholder {
          color: #6B7A99 !important;
        }
        .dark-search .search-bar span {
          color: #6B7A99 !important;
        }
      `}} />
      <div className="wrap site-header-inner" style={{ display: "flex", alignItems: "center", gap: "16px", height: "72px" }}>

        {/* LOGO — left */}
        <Link href="/" className="logo-link-dark" style={{ display: "flex", alignItems: "center", gap: "11px", flexShrink: 0 }}>
          <div className="logo-mark-dark" style={{ width: "38px", height: "38px", borderRadius: "11px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "16px" }}>Y</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "15px", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#fff" }}>Yuvaraj</div>
            <div className="header-tagline" style={{ fontSize: "11px", color: "#6B7A99", fontWeight: 500 }}>AI Data Platform Architect</div>
          </div>
        </Link>

        {/* NAV — centered in remaining space */}
        <nav className="site-nav" style={{
          display: "flex", gap: "32px", fontSize: "13.5px", fontWeight: 600,
          alignItems: "center", flex: 1, justifyContent: "center",
        }}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={"nav-link-dark" + (active === item.key ? " nav-link-dark-active" : "")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* SEARCH + CONTACT — right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <div className="dark-search">
            <SearchBar />
          </div>
          <Link href="/contact" className="btn btn-pri header-contact" style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          }}>
            Contact &#8594;
          </Link>
        </div>
      </div>
    </header>
  );
}
