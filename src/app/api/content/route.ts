import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import slugify from "slugify";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pillar = searchParams.get("pillar");
    const format = searchParams.get("format");
    const source = searchParams.get("source");
    const status = searchParams.get("status");

    const items = await prisma.contentItem.findMany({
      where: {
        ...(pillar && { pillar: pillar as any }),
        ...(format && { format: format as any }),
        ...(source && { source: source as any }),
        ...(status && { status: status as any }),
      },
      orderBy: { updatedAt: "desc" },
      include: { syncMetadata: true, series: true },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[GET /api/content]", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, any>;

    if (!body.title || !body.pillar || !body.format) {
      return NextResponse.json(
        { error: "Missing required fields: title, pillar, format" },
        { status: 400 }
      );
    }

    const slug = slugify(body.title, { lower: true, strict: true }) + "-" + Date.now().toString(36);
    const readingTime = body.body ? Math.ceil(body.body.split(/\s+/).length / 200) : undefined;

    const item = await prisma.contentItem.create({
      data: {
        title: body.title,
        slug,
        subtitle: body.subtitle || null,
        body: body.body || null,
        pillar: body.pillar,
        format: body.format,
        seriesId: body.seriesId || null,
        tags: Array.isArray(body.tags) ? body.tags.join(",") : (body.tags || null),
        coverImage: body.coverImage || null,
        status: body.status || "DRAFT",
        readingTimeMin: readingTime,
        publishedAt: body.status === "PUBLISHED" ? new Date() : null,
      },
      include: { series: true },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[POST /api/content]", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}
