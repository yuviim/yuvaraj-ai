import { NextRequest, NextResponse } from "next/server";
import { importFromLinkedInUrl } from "@/lib/sync-handlers";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { url, title, excerpt, pillar } = body;

    if (!url || !title || !pillar) {
      return NextResponse.json(
        { error: "Missing required fields: url, title, pillar" },
        { status: 400 }
      );
    }

    const item = await importFromLinkedInUrl(url, title, excerpt || "", pillar);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[LinkedIn Import]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
