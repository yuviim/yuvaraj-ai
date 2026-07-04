import React from "react";
import { PillarPill } from "./PillarPill";

const pillars = [
  { p: "DP", t: "Modern AI Data Platforms", d: "Warehouses . Lakehouses . Federation . MPP", grad: "linear-gradient(150deg, #0A1628 20%, #1e3a5f 80%)", accent: "rgba(37,99,235,.4)", icon: "⬡" },
  { p: "ES", t: "Enterprise AI Systems", d: "AI Gateways . Policy Engines . Audit . Governance", grad: "linear-gradient(150deg, #1a0a2e, #2d1b69)", accent: "rgba(124,58,237,.4)", icon: "◈" },
  { p: "AA", t: "Enterprise Agentic AI", d: "Agents . MCP . Tool Use . Orchestration", grad: "linear-gradient(150deg, #2A1602, #5a3a1f)", accent: "rgba(245,158,11,.4)", icon: "⬢" },
  { p: "SV", t: "Sovereign AI Systems", d: "Trust Boundaries . Residency . Compliance . Control", grad: "linear-gradient(150deg, #062A22, #0d4a3a)", accent: "rgba(16,185,129,.4)", icon: "◉" },
  { p: "KX", t: "Know Exasol", d: "MPP . Optimizer . Execution . Memory . Federation", grad: "linear-gradient(150deg, #0A1628 20%, #00B894 80%)", accent: "rgba(0,184,148,.45)", icon: "⏣" },
];

export function PillarGrid() {
  return React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "60px" } },
    pillars.map((hub) =>
      React.createElement("div", { key: hub.p, className: "card", style: { overflow: "hidden", cursor: "pointer" } },
        React.createElement("div", { style: { background: hub.grad, aspectRatio: "4/3", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" } },
          React.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.6, background: "radial-gradient(circle at 70% 65%, " + hub.accent + ", transparent 55%)" } }),
          React.createElement("span", { style: { fontSize: "42px", opacity: 0.25, color: "#fff", position: "relative", zIndex: 1 } }, hub.icon),
          React.createElement("div", { style: { position: "absolute", bottom: "12px", right: "14px", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,.3)", letterSpacing: "0.1em" } }, hub.p)
        ),
        React.createElement("div", { style: { padding: "14px" } },
          React.createElement(PillarPill, { pillar: hub.p }),
          React.createElement("h4", { style: { fontSize: "14px", fontWeight: 700, margin: "8px 0 4px", lineHeight: 1.3 } }, hub.t),
          React.createElement("p", { style: { fontSize: "11.5px", color: "#6B7280", lineHeight: 1.5 } }, hub.d),
          React.createElement("span", { style: { fontSize: "12px", fontWeight: 600, color: "#2563EB", display: "inline-block", marginTop: "10px" } }, "Open Hub →")
        )
      )
    )
  );
}
