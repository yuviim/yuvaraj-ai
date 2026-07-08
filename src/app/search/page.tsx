import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import { ContentStream } from "@/components/ContentStream";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim();

  const results = q.length > 0
    ? await prisma.contentItem.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { subtitle: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
            { tags: { contains: q, mode: "insensitive" } },
            { body: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { publishedAt: "desc" },
        take: 40,
      })
    : [];

  return (
    <div>
      <SiteHeader active="none" />
      <main className="wrap" style={{ paddingTop: "48px", paddingBottom: "72px" }}>
        <div className="eyebrow">Search</div>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
          {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search the library"}
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "24px" }}>
          {q
            ? results.length + (results.length === 1 ? " item" : " items") + " found across articles, videos, notes, and diagrams."
            : "Type a keyword in the search bar above — e.g. federation, governance, MCP, virtual schema."}
        </p>

        {q && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p>No results for &ldquo;{q}&rdquo;. Try a broader term, or browse the <Link href="/" style={{ color: "#2563EB", fontWeight: 600 }}>Architecture Library</Link>.</p>
          </div>
        )}

        <ContentStream items={results} />
      </main>
    </div>
  );
}
