import axios from "axios";
import Parser from "rss-parser";
import { prisma } from "./db";

import slugify from "slugify";

// ===== YOUTUBE SYNC =====
export async function syncYouTubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    throw new Error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID");
  }

  const channelRes = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels",
    {
      params: { part: "contentDetails", id: channelId, key: apiKey },
    }
  );

  const uploadsPlaylistId =
    channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

  const videosRes = await axios.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",
    {
      params: {
        part: "snippet",
        playlistId: uploadsPlaylistId,
        maxResults: 50,
        key: apiKey,
      },
    }
  );

  const videos = videosRes.data.items || [];

  for (const video of videos) {
    const videoId = video.snippet.resourceId.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const publishedAt = new Date(video.snippet.publishedAt);
    const pillar = extractPillarFromText(title + " " + description);

    const existing = await prisma.syncMetadata.findUnique({
      where: { source_sourceId: { source: "YOUTUBE", sourceId: videoId } },
    });

    if (existing) {
      await prisma.contentItem.update({
        where: { id: existing.contentItemId },
        data: { title, body: description, publishedAt, updatedAt: new Date() },
      });
    } else {
      // Guard against duplicates: a manually created item with the same title
      // (e.g. an episode added by hand before sync existed) gets linked, not duplicated.
      const duplicate = await prisma.contentItem.findFirst({
        where: {
          format: "VIDEO",
          title: { equals: title, mode: "insensitive" },
          syncMetadata: null,
        },
      });
      if (duplicate) {
        await prisma.syncMetadata.create({
          data: {
            contentItemId: duplicate.id,
            source: "YOUTUBE",
            sourceId: videoId,
            sourceUrl: "https://www.youtube.com/watch?v=" + videoId,
          },
        });
        await prisma.contentItem.update({
          where: { id: duplicate.id },
          data: { publishedAt: duplicate.publishedAt || publishedAt },
        });
        continue;
      }
      const slug = slugify(title, { lower: true, strict: true });
      await prisma.contentItem.create({
        data: {
          title,
          slug: slug + "-" + videoId.slice(0, 6),
          body: description,
          format: "VIDEO",
          source: "YOUTUBE",
          pillar,
          sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
          publishedAt,
          status: "PUBLISHED",
          syncMetadata: {
            create: {
              source: "YOUTUBE",
              sourceId: videoId,
              sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
            },
          },
        },
      });
      console.log(`[YouTube] Synced: ${title}`);
    }
  }

  return { success: true, synced: videos.length };
}

// ===== MEDIUM SYNC =====
export async function syncMediumArticles() {
  const mediumRssUrl = process.env.MEDIUM_RSS_URL;
  if (!mediumRssUrl) throw new Error("Missing MEDIUM_RSS_URL");

  const parser = new Parser();
  const feed = await parser.parseURL(mediumRssUrl);

  for (const item of feed.items || []) {
    const title = item.title || "Untitled";
    const description = item.content || item.contentSnippet || "";
    const link = item.link || "";
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
    const pillar = extractPillarFromText(title + " " + description);
    const mediumId = link.split("/").pop()?.split("?")[0] || "";

    const existing = await prisma.syncMetadata.findUnique({
      where: { source_sourceId: { source: "MEDIUM", sourceId: mediumId } },
    });

    if (existing) {
      await prisma.contentItem.update({
        where: { id: existing.contentItemId },
        data: { title, body: description, publishedAt: pubDate, updatedAt: new Date() },
      });
    } else {
      const slug = slugify(title, { lower: true, strict: true });
      await prisma.contentItem.create({
        data: {
          title,
          slug: slug + "-" + mediumId.slice(0, 6),
          body: description,
          format: "ARTICLE",
          source: "MEDIUM",
          pillar,
          sourceUrl: link,
          publishedAt: pubDate,
          status: "PUBLISHED",
          syncMetadata: {
            create: { source: "MEDIUM", sourceId: mediumId, sourceUrl: link },
          },
        },
      });
      console.log(`[Medium] Synced: ${title}`);
    }
  }

  return { success: true, synced: feed.items?.length || 0 };
}

// ===== LINKEDIN IMPORT =====
export async function importFromLinkedInUrl(
  url: string,
  title: string,
  excerpt: string,
  pillar: string
) {
  const slug = slugify(title, { lower: true, strict: true });
  const item = await prisma.contentItem.create({
    data: {
      title,
      slug: slug + "-" + Date.now().toString(36),
      body: excerpt,
      format: "ARTICLE",
      source: "LINKEDIN",
      pillar,
      sourceUrl: url,
      publishedAt: new Date(),
      status: "PUBLISHED",
      syncMetadata: {
        create: { source: "LINKEDIN", sourceId: url, sourceUrl: url },
      },
    },
  });
  return item;
}

// ===== HELPERS =====
function extractPillarFromText(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("nexusiq") || lower.includes("nexus iq")) return "ES";
  if (lower.includes("know exasol") || lower.includes("exasol") || lower.includes("mpp")) return "KX";
  if (lower.includes("agentic") || lower.includes("agent memory") || lower.includes("llm")) return "AA";
  if (lower.includes("sovereign") || lower.includes("residency")) return "SV";
  if (lower.includes("enterprise ai") || lower.includes("gateway") || lower.includes("governance")) return "ES";
  if (lower.includes("data platform") || lower.includes("lakehouse") || lower.includes("warehouse")) return "DP";
  return "DP";
}

export function calculateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}
