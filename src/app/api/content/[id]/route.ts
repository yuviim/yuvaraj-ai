import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.contentItem.findUnique({
      where: { id: params.id },
      include: { syncMetadata: true, series: true },
    });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json() as Record<string, any>;
    const readingTime = body.body ? Math.ceil(body.body.split(/\s+/).length / 200) : undefined;

    const item = await prisma.contentItem.update({
      where: { id: params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.body && { body: body.body }),
        ...(body.pillar && { pillar: body.pillar }),
        ...(body.format && { format: body.format }),
        ...(body.seriesId !== undefined && { seriesId: body.seriesId }),
        ...(body.tags && { tags: body.tags }),
        ...(body.coverImage && { coverImage: body.coverImage }),
        ...(body.status && { status: body.status }),
        ...(body.publishedAt !== undefined && {
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        }),
        ...(readingTime && { readingTimeMin: readingTime }),
      },
      include: { series: true },
    });

    await prisma.contentAudit.create({
      data: {
        contentItemId: params.id,
        action: "update",
        status: item.status,
        pillar: item.pillar,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("[PUT /api/content/[id]]", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contentItem.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
