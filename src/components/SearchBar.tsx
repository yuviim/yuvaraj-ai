"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const submit = () => {
    const term = q.trim();
    if (term.length > 0) {
      router.push("/search?q=" + encodeURIComponent(term));
    }
  };

  return (
    <div className="search-bar" style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E7EAF0", borderRadius: "10px", padding: "6px 10px", background: "#F8FAFC" }}>
      <span style={{ color: "#9AA3B2", fontSize: "13px", lineHeight: 1 }} aria-hidden>&#128269;</span>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="Search the library..."
        aria-label="Search articles, videos, and diagrams"
        style={{ border: "none", outline: "none", background: "transparent", fontSize: "12.5px", fontFamily: "inherit", width: "150px", color: "#111827" }}
      />
    </div>
  );
}
