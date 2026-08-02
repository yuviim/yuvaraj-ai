import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !process.env.ADMIN_PASSWORD) return false;
  return authHeader === "Bearer " + process.env.ADMIN_PASSWORD;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const data: Record<string, unknown> = {};

  if (body.category !== undefined) data.category = body.category || null;
  if (body.whyMatters !== undefined) data.whyMatters = body.whyMatters || null;
  if (body.status !== undefined) {
    data.status = body.status;
    if (body.status === "PUBLISHED") data.publishedAt = new Date();
  }

  const updated = await prisma.signalItem.update({
    where: { id: params.id },
    data,
  });

  // Publishing/unpublishing changes what /radar shows — bust the
  // ISR cache immediately instead of waiting up to 5 minutes.
  if (body.status !== undefined) revalidatePath("/radar");

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.signalItem.delete({ where: { id: params.id } });
  revalidatePath("/radar");
  return NextResponse.json({ deleted: true });
}
