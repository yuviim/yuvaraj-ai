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

    const uploadDir = path.join(process.cwd(), "public", "images");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ url: "/images/" + filename, filename });
  } catch (error) {
    console.error("[Upload Error]", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}