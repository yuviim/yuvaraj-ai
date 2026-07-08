import React from "react";

const sourceConfig: Record<string, { label: string; bg: string; color: string }> = {
  NATIVE: { label: "Native", bg: "#EFF4FF", color: "#2563EB" },
  MEDIUM: { label: "Medium", bg: "#F3F4F6", color: "#374151" },
  LINKEDIN: { label: "LinkedIn", bg: "#EBF0F8", color: "#0A66C2" },
  YOUTUBE: { label: "YouTube", bg: "#FEE2E2", color: "#DC2626" },
};

export function SourceBadge({ source }: { source: string }) {
  const config = sourceConfig[source] || sourceConfig["NATIVE"];
  return (
    <span
      style={{
        fontSize: "10.5px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: config.color,
        border: `1px solid ${config.color}30`,
        borderRadius: "6px",
        padding: "2px 8px",
        backgroundColor: config.bg,
      }}
    >
      {config.label}
    </span>
  );
}
