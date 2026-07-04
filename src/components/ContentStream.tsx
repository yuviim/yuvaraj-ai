import React from "react";
import { ContentCard } from "./ContentCard";

interface ContentStreamProps {
  items: Array<{
    id: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    pillar: string;
    source: string;
    format: string;
    readingTimeMin?: number | null;
    publishedAt?: Date | string | null;
  }>;
}

export function ContentStream({ items }: ContentStreamProps) {
  if (items.length === 0) {
    return React.createElement("div", { style: { textAlign: "center", padding: "60px 0", color: "#6B7280" } },
      React.createElement("p", null, "No content published yet. Start writing in the Content Studio.")
    );
  }

  return React.createElement("div", {
    style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "18px" },
  }, items.map((item) => React.createElement(ContentCard, { key: item.id, item })));
}
