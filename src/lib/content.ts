import { prisma } from "./db";

export async function getContentByPillar(pillar: string, limit?: number) {
  return prisma.contentItem.findMany({
    where: { pillar, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getLatestContent(limit: number = 20) {
  return prisma.contentItem.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getVideoSeries() {
  return prisma.series.findMany({
    where: {
      items: { some: { format: "VIDEO", status: "PUBLISHED" } },
    },
    include: {
      items: {
        where: { format: "VIDEO", status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      },
    },
  });
}

export async function getContentBySlug(slug: string) {
  return prisma.contentItem.findUnique({ where: { slug } });
}

export async function getPillarStats() {
  const pillars = ["DP", "ES", "AA", "SV", "KX"];
  const stats = await Promise.all(
    pillars.map(async (pillar) => ({
      pillar,
      count: await prisma.contentItem.count({
        where: { pillar, status: "PUBLISHED" },
      }),
    }))
  );
  return stats;
}


export async function getAllVideos() {
  return prisma.contentItem.findMany({
    where: { format: "VIDEO", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
}
