import { NextRequest, NextResponse } from "next/server";
import { syncMediumArticles } from "@/lib/sync-handlers";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const result = await syncMediumArticles();
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Medium Sync]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
