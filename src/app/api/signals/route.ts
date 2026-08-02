import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "PENDING";

  const items = await prisma.signalItem.findMany({
    where: { status },
    orderBy: [{ feedPublishedAt: "desc" }, { createdAt: "desc" }],
    take: 100,
  });

  return NextResponse.json(items);
}
