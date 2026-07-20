import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

// The article page never displays an image wider than this (see MarkdownRenderer's
// max-width: 960px for diagrams). Storing anything wider is pure waste — bigger
// files, slower loads, and a mismatch between how big the image looks in the
// Content Studio editor vs. how it actually renders once published.
const MAX_WIDTH = 1600; // 2x the display cap, for retina screens
const JPEG_QUALITY = 82;

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

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 15MB." }, { status: 400 });
    }

    const originalBytes = Buffer.from(await file.arrayBuffer());
    let outputBuffer: Buffer = originalBytes;
    let outputExt = (file.name.split(".").pop() || "png").toLowerCase();
    let outputContentType = file.type;

    // SVGs and GIFs pass through untouched — resizing/re-encoding would break
    // animation (GIF) or vector scaling (SVG).
    const isResizable = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/webp";

    if (isResizable) {
      try {
        const image = sharp(originalBytes, { failOn: "none" });
        const metadata = await image.metadata();
        const needsResize = (metadata.width || 0) > MAX_WIDTH;

        let pipeline = image;
        if (needsResize) {
          pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
        }

        // Diagrams and screenshots (PNG source) have fine text and thin lines —
        // JPEG's lossy compression visibly softens that. Only re-encode as JPEG
        // when the source was ALREADY a JPEG (i.e. a photo, not a diagram).
        // PNG sources always stay PNG, regardless of whether they have transparency.
        const wasJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
        if (wasJpeg) {
          outputBuffer = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
          outputExt = "jpg";
          outputContentType = "image/jpeg";
        } else {
          outputBuffer = await pipeline.png({ compressionLevel: 9 }).toBuffer();
          outputExt = "png";
          outputContentType = "image/png";
        }
      } catch (resizeErr) {
        // If sharp fails for any reason (corrupt file, unsupported variant),
        // fall back to storing the original rather than blocking the upload.
        console.error("[Image resize skipped]", resizeErr);
        outputBuffer = originalBytes;
      }
    }

    const timestamp = Date.now().toString(36);
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase()
      .slice(0, 50);
    const filename = safeName + "-" + timestamp + "." + outputExt;

    // Production (Vercel): filesystem is read-only, so use Vercel Blob storage.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put("images/" + filename, outputBuffer, {
        access: "public",
        contentType: outputContentType,
      });
      return NextResponse.json({
        url: blob.url,
        filename,
        originalSize: file.size,
        finalSize: outputBuffer.length,
      });
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
    await writeFile(path.join(uploadDir, filename), outputBuffer);

    return NextResponse.json({
      url: "/images/" + filename,
      filename,
      originalSize: file.size,
      finalSize: outputBuffer.length,
    });
  } catch (error) {
    console.error("[Upload Error]", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
