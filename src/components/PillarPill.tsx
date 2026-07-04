import React from "react";

const pillarConfig: Record<string, { label: string; bg: string; color: string }> = {
  DP: { label: "Modern AI Data Platforms", bg: "#EFF4FF", color: "#2563EB" },
  ES: { label: "Enterprise AI Systems", bg: "#F3EEFE", color: "#7C3AED" },
  AA: { label: "Enterprise Agentic AI", bg: "#FEF6E7", color: "#F59E0B" },
  SV: { label: "Sovereign AI Systems", bg: "#E9FAF3", color: "#10B981" },
  KX: { label: "Know Exasol", bg: "#E6FAF4", color: "#00B894" },
};

export function PillarPill({ pillar }: { pillar: string }) {
  const config = pillarConfig[pillar] || pillarConfig["DP"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: "99px",
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: config.color,
        }}
      />
      {pillar}
    </span>
  );
}
