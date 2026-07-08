import React from "react";
import { PillarPill } from "./PillarPill";
import Link from "next/link";


const pillars = [
  { p: "DP", t: "Modern AI Data Platforms", d: "Your AI is only as good as the data layer beneath it.", img: "/images/pillar-dp.png" },
  { p: "ES", t: "Enterprise AI \u2014 NexusIQ", d: "What it takes to put AI into production with governance.", img: "/images/pillar-es.png" },
  { p: "AA", t: "Enterprise Agentic AI", d: "Agents that plan, use tools, and operate under policy.", img: "/images/pillar-aa.png" },
  { p: "SV", t: "Sovereign AI Systems", d: "When your data can\u2019t leave the building.", img: "/images/pillar-sv.png" },
  { p: "KX", t: "Know Exasol", d: "Inside the MPP engine \u2014 architecture to execution.", img: "/images/pillar-kx.png" },
];

export function PillarGrid() {
  return (
    <div className="pillar-grid" style={{ marginBottom: "60px" }}>
      {pillars.map((hub) => (
        <Link key={hub.p} href={"/hub/" + hub.p.toLowerCase()} className="card" style={{ overflow: "hidden", cursor: "pointer", transition: "transform .15s, box-shadow .15s", display: "block" }}>
          <div style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
            <img src={hub.img} alt={hub.t} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "14px" }}>
            <PillarPill pillar={hub.p} />
            <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "8px 0 4px", lineHeight: 1.3 }}>{hub.t}</h4>
            <p style={{ fontSize: "11.5px", color: "#6B7280", lineHeight: 1.5 }}>{hub.d}</p>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#2563EB", display: "inline-block", marginTop: "10px" }}>Open Hub &#8594;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}