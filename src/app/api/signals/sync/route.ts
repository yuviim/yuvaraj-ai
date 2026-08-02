import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";
import { prisma } from "@/lib/db";
import { SIGNAL_FEEDS } from "@/lib/signalFeeds";

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "Mozilla/5.0 (compatible; yuvarajai-signal-bot/1.0)" },
});

// Cap how many items we pull per feed per run — feeds are checked every few
// hours, so recent items are enough; this avoids flooding on the first run.
const MAX_ITEMS_PER_FEED = 15;

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  if (process.env.CRON_SECRET && authHeader === "Bearer " + process.env.CRON_SECRET) return true;
  if (process.env.ADMIN_PASSWORD && authHeader === "Bearer " + process.env.ADMIN_PASSWORD) return true;
  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, { added: number; error?: string }> = {};

  for (const feed of SIGNAL_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      const items = (parsed.items || []).slice(0, MAX_ITEMS_PER_FEED);
      let added = 0;

      for (const item of items) {
        const url = item.link;
        if (!url) continue;

        const existing = await prisma.signalItem.findUnique({ where: { url } });
        if (existing) continue;

        const rawSummary = item.contentSnippet || item.content || item.summary || null;
        const summary = rawSummary ? rawSummary.slice(0, 400).trim() : null;

        const feedPublishedAt = item.isoDate
          ? new Date(item.isoDate)
          : item.pubDate
          ? new Date(item.pubDate)
          : null;

        await prisma.signalItem.create({
          data: {
            title: item.title || "Untitled",
            url,
            source: feed.source,
            summary,
            status: "PENDING",
            feedPublishedAt,
          },
        });
        added++;
      }

      results[feed.source] = { added };
    } catch (err) {
      results[feed.source] = { added: 0, error: err instanceof Error ? err.message : "Unknown error" };
    }
  }

  return NextResponse.json({ synced: new Date().toISOString(), results });
}
