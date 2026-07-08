import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only images allowed" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "png";
    const timestamp = Date.now().toString(36);
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase()
      .slice(0, 50);
    const filename = safeName + "-" + timestamp + "." + ext;

    // Production (Vercel): filesystem is read-only, so use Vercel Blob storage.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put("images/" + filename, file, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url, filename });
    }

    // On Vercel without a Blob token: fail with a clear, actionable message.
    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: "Blob storage not configured. In Vercel: Storage \u2192 Create \u2192 Blob \u2192 connect to this project, then redeploy so BLOB_READ_WRITE_TOKEN is available." },
        { status: 501 }
      );
    }

    // Local dev fallback: write to public/images
    const uploadDir = path.join(process.cwd(), "public", "images");
    await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

    return NextResponse.json({ url: "/images/" + filename, filename });
  } catch (error) {
    console.error("[Upload Error]", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
