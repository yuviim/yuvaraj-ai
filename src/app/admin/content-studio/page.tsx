"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const pillarColors: Record<string, string> = {
  DP: "#2563EB", ES: "#7C3AED", AA: "#F59E0B", SV: "#10B981", KX: "#00B894",
};
const pillarBgs: Record<string, string> = {
  DP: "#EFF4FF", ES: "#F3EEFE", AA: "#FEF6E7", SV: "#E9FAF3", KX: "#E6FAF4",
};
const pillarLabels: Record<string, string> = {
  DP: "Data Platforms", ES: "Enterprise AI - NexusIQ", AA: "Agentic AI", SV: "Sovereign AI", KX: "Know Exasol",
};

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  pillar: string;
  format: string;
  source: string;
  status: string;
  publishedAt: string | null;
  readingTimeMin: number | null;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?\s]+)/,
    /youtube\.com\/embed\/([^?\s]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

export default function ContentStudio() {
  const [view, setView] = useState<"editor" | "library">("editor");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [library, setLibrary] = useState<ContentItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"publish" | "sources">("publish");
  const [content, setContent] = useState({
    title: "",
    body: "",
    pillar: "DP",
    format: "ARTICLE",
    status: "DRAFT",
    publishDate: new Date().toISOString().split("T")[0],
  });

  const fetchLibrary = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) setLibrary(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchLibrary(); }, [fetchLibrary]);

  const handleSave = async (publishStatus: string) => {
    if (content.title.trim().length === 0) {
      if (typeof window !== "undefined") window.alert("Title is required");
      return;
    }
    setSaving(true);
    try {
      const endpoint = editingId ? "/api/content/" + editingId : "/api/content";
      const method = editingId ? "PUT" : "POST";
      const payload: Record<string, unknown> = {
        ...content,
        status: publishStatus,
      };
      if (content.publishDate) {
        payload.publishedAt = new Date(content.publishDate).toISOString();
      }
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        if (typeof window !== "undefined") window.alert(publishStatus === "PUBLISHED" ? "Published!" : "Saved as draft!");
        setContent({ title: "", body: "", pillar: "DP", format: "ARTICLE", status: "DRAFT", publishDate: new Date().toISOString().split("T")[0] });
        setEditingId(null);
        fetchLibrary();
      } else {
        const err = await res.json();
        if (typeof window !== "undefined") window.alert("Error: " + (err.error || "Unknown"));
      }
    } catch (e) {
      if (typeof window !== "undefined") window.alert("Error: " + e);
    }
    setSaving(false);
  };

  const handleEdit = (item: ContentItem) => {
    setContent({
      title: item.title,
      body: item.body || "",
      pillar: item.pillar,
      format: item.format,
      status: item.status,
      publishDate: item.publishedAt ? new Date(item.publishedAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    });
    setEditingId(item.id);
    setView("editor");
    setPreview(false);
  };

  const handleDelete = async (id: string) => {
    if (typeof window !== "undefined" && window.confirm("Delete this content?") === false) return;
    try {
      const res = await fetch("/api/content/" + id, { method: "DELETE" });
      if (res.ok) fetchLibrary();
    } catch (e) {
      if (typeof window !== "undefined") window.alert("Error: " + e);
    }
  };

  const handleNew = () => {
    setContent({ title: "", body: "", pillar: "DP", format: "ARTICLE", status: "DRAFT", publishDate: new Date().toISOString().split("T")[0] });
    setEditingId(null);
    setView("editor");
    setPreview(false);
  };

  const insertAtCursor = useCallback((text: string) => {
    setContent(prev => {
      if (typeof document === "undefined") return { ...prev, body: prev.body + text };
      const ta = document.getElementById("editor-body") as HTMLTextAreaElement | null;
      if (!ta) return { ...prev, body: prev.body + text };
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const updated = prev.body.substring(0, start) + text + prev.body.substring(end);
      setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + text.length; }, 0);
      return { ...prev, body: updated };
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        const defaultAlt = file.name.replace(/\.\w+$/, "").replace(/[-_]/g, " ");
        const altText = typeof window !== "undefined"
          ? (window.prompt("Image description (tip: include 'architecture' or 'diagram' for full-width display):", defaultAlt) || defaultAlt)
          : defaultAlt;
        insertAtCursor("\n![" + altText + "](" + data.url + ")\n");
      } else {
        const err = await res.json();
        if (typeof window !== "undefined") window.alert("Upload failed: " + (err.error || "Unknown"));
      }
    } catch (err) {
      if (typeof window !== "undefined") window.alert("Upload failed: " + err);
    }
    setUploading(false);
    e.target.value = "";
  };

  const insertMarkdown = (syntax: string) => {
    if (typeof document === "undefined") return;
    const ta = document.getElementById("editor-body") as HTMLTextAreaElement | null;
    const start = ta ? ta.selectionStart : 0;
    const end = ta ? ta.selectionEnd : 0;
    const selected = content.body.substring(start, end);

    switch (syntax) {
      case "bold":
        insertAtCursor("**" + (selected || "bold text") + "**");
        break;
      case "italic":
        insertAtCursor("*" + (selected || "italic text") + "*");
        break;
      case "h1":
        insertAtCursor("\n# " + (selected || "Heading 1") + "\n");
        break;
      case "h2":
        insertAtCursor("\n## " + (selected || "Heading 2") + "\n");
        break;
      case "ul":
        insertAtCursor("\n- " + (selected || "List item"));
        break;
      case "ol":
        insertAtCursor("\n1. " + (selected || "List item"));
        break;
      case "code":
        if (selected && selected.includes("\n")) {
          insertAtCursor("\n```\n" + selected + "\n```\n");
        } else {
          insertAtCursor("`" + (selected || "code") + "`");
        }
        break;
      case "quote":
        insertAtCursor("\n> " + (selected || "Quote text") + "\n");
        break;
      case "link": {
        const linkUrl = window.prompt("Enter URL:", "https://");
        if (linkUrl) {
          const linkText = selected || window.prompt("Link text:", "Click here") || "Link";
          insertAtCursor("[" + linkText + "](" + linkUrl + ")");
        }
        break;
      }
      case "image": {
        const fi = document.getElementById("image-upload") as HTMLInputElement | null;
        if (fi) fi.click();
        break;
      }
      case "youtube": {
        const ytUrl = window.prompt("Paste YouTube URL or video ID:");
        if (ytUrl) {
          const videoId = extractYouTubeId(ytUrl);
          if (videoId) {
            insertAtCursor("\nhttps://www.youtube.com/watch?v=" + videoId + "\n");
          } else {
            window.alert("Could not extract YouTube video ID.");
          }
        }
        break;
      }
      case "diagram": {
        const dName = window.prompt("Diagram name:", "architecture-overview") || "diagram";
        insertAtCursor("\n[diagram:" + dName + "]\n");
        break;
      }
    }
  };

  const toolbarButtons = [
    { label: "B", cmd: "bold" }, { label: "I", cmd: "italic" },
    { label: "H1", cmd: "h1" }, { label: "H2", cmd: "h2" },
    { label: "\u2022 List", cmd: "ul" }, { label: "1. List", cmd: "ol" },
    { label: "</> Code", cmd: "code" }, { label: "\u275D Quote", cmd: "quote" },
    { label: "\uD83D\uDD17 Link", cmd: "link" }, { label: "\uD83D\uDDBC Upload Image", cmd: "image" },
  ];

  const specialButtons = [
    { label: "\u25B6 YouTube Embed", cmd: "youtube" },
    { label: "\u25E8 Diagram", cmd: "diagram" },
  ];

  const renderPreviewLine = (line: string, i: number) => {
    if (line.trim().length === 0) return <br key={i} />;
    if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: "22px", fontWeight: 800, margin: "28px 0 12px" }}>{line.slice(3)}</h2>;
    if (line.startsWith("# ")) return <h1 key={i} style={{ fontSize: "28px", fontWeight: 800, margin: "28px 0 12px" }}>{line.slice(2)}</h1>;
    if (line.startsWith("- ")) return <li key={i} style={{ marginLeft: "20px", marginBottom: "6px" }}>{renderInline(line.slice(2))}</li>;
    if (line.startsWith("> ")) return <blockquote key={i} style={{ borderLeft: "3px solid #2563EB", paddingLeft: "16px", color: "#6B7280", margin: "16px 0" }}>{line.slice(2)}</blockquote>;

    const ytId = extractYouTubeId(line.trim());
    if (ytId && line.trim().length < 100) {
      return (
        <div key={i} style={{ margin: "20px 0", borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9", maxWidth: "640px" }}>
          <iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + ytId} style={{ border: "none" }} allowFullScreen />
        </div>
      );
    }

    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return (
        <div key={i} style={{ margin: "16px 0" }}>
          <img src={imgMatch[2]} alt={imgMatch[1]} style={{ maxWidth: "100%", borderRadius: "10px", border: "1px solid #E7EAF0" }} />
          {imgMatch[1] && <div style={{ fontSize: "12px", color: "#9AA3B2", marginTop: "6px", textAlign: "center" }}>{imgMatch[1]}</div>}
        </div>
      );
    }

    const diagMatch = line.trim().match(/^\[diagram:([^\]]+)\]/);
    if (diagMatch) {
      return (
        <div key={i} style={{ background: "#F8FAFC", border: "2px dashed #E7EAF0", borderRadius: "12px", padding: "24px", textAlign: "center", margin: "16px 0", color: "#9AA3B2" }}>
          <div style={{ fontSize: "13px", fontWeight: 600 }}>Architecture Diagram: {diagMatch[1]}</div>
        </div>
      );
    }

    return <p key={i} style={{ marginBottom: "14px" }}>{renderInline(line)}</p>;
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      const boldIdx = remaining.indexOf("**");
      if (boldIdx !== -1) {
        const endBold = remaining.indexOf("**", boldIdx + 2);
        if (endBold !== -1) {
          if (boldIdx > 0) parts.push(remaining.substring(0, boldIdx));
          parts.push(<strong key={key++}>{remaining.substring(boldIdx + 2, endBold)}</strong>);
          remaining = remaining.substring(endBold + 2);
          continue;
        }
      }
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch && linkMatch.index !== undefined) {
        if (linkMatch.index > 0) parts.push(remaining.substring(0, linkMatch.index));
        parts.push(<a key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", fontWeight: 600 }}>{linkMatch[1]}</a>);
        remaining = remaining.substring(linkMatch.index + linkMatch[0].length);
        continue;
      }
      const codeMatch = remaining.match(/`([^`]+)`/);
      if (codeMatch && codeMatch.index !== undefined) {
        if (codeMatch.index > 0) parts.push(remaining.substring(0, codeMatch.index));
        parts.push(<code key={key++} style={{ background: "#F3F4F6", padding: "2px 6px", borderRadius: "4px", fontSize: "0.9em", fontFamily: "monospace" }}>{codeMatch[1]}</code>);
        remaining = remaining.substring(codeMatch.index + codeMatch[0].length);
        continue;
      }
      const italicMatch = remaining.match(/\*([^*]+)\*/);
      if (italicMatch && italicMatch.index !== undefined) {
        if (italicMatch.index > 0) parts.push(remaining.substring(0, italicMatch.index));
        parts.push(<em key={key++}>{italicMatch[1]}</em>);
        remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
        continue;
      }
      parts.push(remaining);
      break;
    }
    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  return (
    <div>
      <header style={{ background: "#fff", borderBottom: "1px solid #E7EAF0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "54px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px" }}>Y</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", lineHeight: 1.2 }}>YuvarajAI CMS</div>
              <div style={{ fontSize: "10.5px", color: "#6B7280" }}>Architecture Publishing</div>
            </div>
          </Link>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "99px", background: editingId ? "#FEF6E7" : "#E5E7EB", color: editingId ? "#B45309" : "#4B5563" }}>
              {editingId ? "EDITING" : "NEW"}
            </span>
            {view === "editor" && (
              <button onClick={() => setPreview(!preview)} className="btn btn-sec" style={{ fontSize: "12px", padding: "8px 14px" }}>
                {preview ? "\u270E Edit" : "\uD83D\uDC41 Preview"}
              </button>
            )}
            <button onClick={() => handleSave("DRAFT")} disabled={saving} className="btn btn-sec" style={{ fontSize: "12px", padding: "8px 14px" }}>Save draft</button>
            <button onClick={() => handleSave("PUBLISHED")} disabled={saving} className="btn btn-pri" style={{ fontSize: "12px", padding: "8px 16px" }}>
              {saving ? "Saving..." : "Publish \u2192"}
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 280px", gap: 0, borderTop: "1px solid #E7EAF0", minHeight: "calc(100vh - 54px)", background: "#F8FAFC" }}>
        {/* LEFT SIDEBAR */}
        <aside style={{ background: "#fff", borderRight: "1px solid #E7EAF0", padding: "20px 14px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9AA3B2", padding: "14px 10px 6px" }}>Create</div>
          <div onClick={handleNew} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 10px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: view === "editor" && !editingId ? "#fff" : "#6B7280", background: view === "editor" && !editingId ? "#2563EB" : "transparent", cursor: "pointer", marginBottom: "2px" }}>
            &#9998; New Article
          </div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9AA3B2", padding: "20px 10px 6px" }}>Library</div>
          <div onClick={() => { setView("library"); fetchLibrary(); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: "8px", fontSize: "13px", fontWeight: view === "library" ? 600 : 500, color: view === "library" ? "#111827" : "#6B7280", background: view === "library" ? "#F3F4F6" : "transparent", cursor: "pointer" }}>
            <span>All Content</span>
            <span style={{ fontSize: "11px", color: "#9AA3B2", fontWeight: 600 }}>{library.length}</span>
          </div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9AA3B2", padding: "20px 10px 6px" }}>Topic Hubs</div>
          {Object.keys(pillarLabels).map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", fontSize: "13px", color: "#6B7280", cursor: "pointer" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: pillarColors[p] }} />
              {pillarLabels[p]}
            </div>
          ))}
        </aside>

        {/* CENTER */}
        <main style={{ padding: "22px 28px", overflowY: "auto" }}>
          {view === "library" ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 800 }}>All Content</h2>
                <button onClick={handleNew} className="btn btn-pri" style={{ fontSize: "12px", padding: "8px 16px" }}>+ New Article</button>
              </div>
              {library.length === 0 ? (
                <p style={{ color: "#6B7280", textAlign: "center", padding: "40px 0" }}>No content yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {library.map((item) => (
                    <div key={item.id} className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: pillarBgs[item.pillar] || "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: pillarColors[item.pillar] || "#6B7280", flexShrink: 0 }}>
                        {item.format.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                        <div style={{ fontSize: "11.5px", color: "#9AA3B2", marginTop: "3px", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ padding: "1px 6px", borderRadius: "4px", background: pillarBgs[item.pillar], color: pillarColors[item.pillar], fontWeight: 700, fontSize: "10px" }}>{item.pillar}</span>
                          <span>{item.format.toLowerCase()}</span>
                          <span>{item.source.toLowerCase()}</span>
                          <span style={{ padding: "1px 6px", borderRadius: "4px", background: item.status === "PUBLISHED" ? "#E9FAF3" : "#F3F4F6", color: item.status === "PUBLISHED" ? "#047857" : "#6B7280", fontWeight: 600, fontSize: "10px", textTransform: "uppercase" }}>{item.status}</span>
                          {item.publishedAt && (
                            <span>{new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        <a href={"/" + item.slug} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", padding: "6px 12px", borderRadius: "8px", border: "1px solid #E7EAF0", background: "#fff", textDecoration: "none" }}>View</a>
                        <button onClick={() => handleEdit(item)} style={{ fontSize: "12px", fontWeight: 600, color: "#2563EB", padding: "6px 12px", borderRadius: "8px", border: "1px solid #C7D7FE", background: "#EFF4FF", cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={{ fontSize: "12px", fontWeight: 600, color: "#EF4444", padding: "6px 12px", borderRadius: "8px", border: "1px solid #FECACA", background: "#FEF2F2", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "16px" }}>
                Content Studio / <b>{editingId ? "Edit Article" : "New Article"}</b>
              </div>
              {preview ? (
                <div className="card" style={{ padding: "32px 36px", maxWidth: "780px" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "99px", background: pillarBgs[content.pillar], color: pillarColors[content.pillar], fontSize: "11px", fontWeight: 700 }}>{content.pillar}</span>
                    <span style={{ fontSize: "11px", color: "#9AA3B2", padding: "3px 8px", border: "1px solid #E7EAF0", borderRadius: "6px" }}>{content.format}</span>
                    <span style={{ fontSize: "11px", color: "#9AA3B2", padding: "3px 8px", border: "1px solid #E7EAF0", borderRadius: "6px" }}>{content.publishDate}</span>
                  </div>
                  <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "20px", lineHeight: 1.2 }}>{content.title || "Untitled"}</h1>
                  <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151" }}>
                    {content.body.split("\n").map((line, i) => renderPreviewLine(line, i))}
                  </div>
                </div>
              ) : (
                <div className="card" style={{ padding: "28px 32px" }}>
                  <input type="text" value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} placeholder="Article title..." style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em", border: "none", outline: "none", width: "100%", fontFamily: "inherit", color: "#111827", marginBottom: "6px", background: "transparent" }} />
                  <div style={{ fontSize: "12px", color: "#9AA3B2", marginBottom: "20px" }}>
                    Will appear in the <b style={{ color: pillarColors[content.pillar] }}>{pillarLabels[content.pillar]}</b> hub automatically
                  </div>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", borderRadius: "10px", padding: "6px", background: "#F8FAFC", marginBottom: "20px", border: "1px solid #E7EAF0" }}>
                    {toolbarButtons.map((t) => (
                      <button key={t.cmd} onClick={() => insertMarkdown(t.cmd)} style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", padding: "5px 11px", borderRadius: "7px", background: "#fff", border: "1px solid #E7EAF0", cursor: "pointer", fontFamily: "inherit" }}>{t.label}</button>
                    ))}
                    {specialButtons.map((t) => (
                      <button key={t.cmd} onClick={() => insertMarkdown(t.cmd)} style={{ fontSize: "12px", fontWeight: 600, color: "#2563EB", padding: "5px 11px", borderRadius: "7px", background: "#EFF4FF", border: "1px solid #C7D7FE", cursor: "pointer", fontFamily: "inherit" }}>{t.label}</button>
                    ))}
                  </div>
                  <input type="file" id="image-upload" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                  {uploading && (
                    <div style={{ padding: "12px 16px", background: "#EFF4FF", borderRadius: "8px", marginBottom: "12px", fontSize: "13px", color: "#2563EB", fontWeight: 600 }}>
                      Uploading image...
                    </div>
                  )}
                  <textarea id="editor-body" value={content.body} onChange={(e) => setContent({ ...content, body: e.target.value })} placeholder={"Write in markdown...\n\n# Heading\n## Subheading\n**bold** *italic*\n- bullet points\n> blockquote\n\nClick Upload Image or YouTube Embed in toolbar."} style={{ fontSize: "14.5px", color: "#374151", lineHeight: 1.8, border: "none", outline: "none", width: "100%", fontFamily: "inherit", maxWidth: "680px", minHeight: "400px", resize: "vertical", background: "transparent" }} />
                </div>
              )}
            </div>
          )}
        </main>

        {/* RIGHT PANEL */}
        <aside style={{ background: "#fff", borderLeft: "1px solid #E7EAF0", padding: "20px 18px", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: "4px", background: "#F8FAFC", border: "1px solid #E7EAF0", borderRadius: "9px", padding: "3px", marginBottom: "18px" }}>
            {(["publish", "sources"] as const).map((tab) => (
              <span key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, textAlign: "center", fontSize: "11.5px", fontWeight: 600, color: activeTab === tab ? "#111827" : "#6B7280", padding: "6px 0", borderRadius: "7px", background: activeTab === tab ? "#fff" : "transparent", boxShadow: activeTab === tab ? "0 1px 2px rgba(16,24,40,.06)" : "none", cursor: "pointer", textTransform: "capitalize" }}>{tab}</span>
            ))}
          </div>
          {activeTab === "publish" ? (
            <div>
              {/* Format */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "6px" }}>Format</div>
                <select value={content.format} onChange={(e) => setContent({ ...content, format: e.target.value })} style={{ width: "100%", border: "1px solid #E7EAF0", borderRadius: "9px", padding: "9px 12px", fontSize: "12.5px", fontWeight: 500, background: "#fff", fontFamily: "inherit" }}>
                  <option value="ARTICLE">Article</option>
                  <option value="VIDEO">Video</option>
                  <option value="NOTE">Note</option>
                  <option value="DIAGRAM">Diagram</option>
                  <option value="RESEARCH">Research</option>
                </select>
              </div>

              {/* Topic Hub */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "6px" }}>Topic Hub <span style={{ color: "#EF4444" }}>*</span></div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {Object.keys(pillarColors).map((p) => (
                    <div key={p} onClick={() => setContent({ ...content, pillar: p })} style={{ padding: "4px 12px", borderRadius: "99px", background: content.pillar === p ? pillarBgs[p] : "#fff", border: content.pillar === p ? `2px solid ${pillarColors[p]}` : "1px solid #E7EAF0", fontSize: "11px", fontWeight: 700, color: content.pillar === p ? pillarColors[p] : "#6B7280", cursor: "pointer" }}>
                      {p} &mdash; {pillarLabels[p]}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "6px" }}>Status</div>
                <select value={content.status} onChange={(e) => setContent({ ...content, status: e.target.value })} style={{ width: "100%", border: "1px solid #E7EAF0", borderRadius: "9px", padding: "9px 12px", fontSize: "12.5px", fontWeight: 500, background: "#fff", fontFamily: "inherit" }}>
                  <option value="DRAFT">Draft</option>
                  <option value="WORKING">Working</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>

              {/* Publish Date */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "6px" }}>Publish Date</div>
                <input
                  type="date"
                  value={content.publishDate}
                  onChange={(e) => setContent({ ...content, publishDate: e.target.value })}
                  style={{ width: "100%", border: "1px solid #E7EAF0", borderRadius: "9px", padding: "9px 12px", fontSize: "12.5px", fontWeight: 500, background: "#fff", fontFamily: "inherit" }}
                />
              </div>

              {/* Markdown Tips */}
              <div style={{ marginTop: "24px", padding: "14px", background: "#F8FAFC", borderRadius: "10px", border: "1px solid #E7EAF0" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: "8px" }}>Markdown Tips</div>
                <div style={{ fontSize: "11.5px", color: "#6B7280", lineHeight: 1.7 }}>
                  <div><code style={{ background: "#E5E7EB", padding: "1px 4px", borderRadius: "3px", fontSize: "10px" }}>**bold**</code> for <strong>bold</strong></div>
                  <div><code style={{ background: "#E5E7EB", padding: "1px 4px", borderRadius: "3px", fontSize: "10px" }}>*italic*</code> for <em>italic</em></div>
                  <div><code style={{ background: "#E5E7EB", padding: "1px 4px", borderRadius: "3px", fontSize: "10px" }}># Heading</code> for headings</div>
                  <div><code style={{ background: "#E5E7EB", padding: "1px 4px", borderRadius: "3px", fontSize: "10px" }}>- item</code> for bullets</div>
                  <div><code style={{ background: "#E5E7EB", padding: "1px 4px", borderRadius: "3px", fontSize: "10px" }}>[text](url)</code> for links</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "10px 0", color: "#6B7280", fontSize: "13px" }}>
              <p style={{ marginBottom: "12px" }}>Use <strong>Upload Image</strong> to add images from your computer.</p>
              <p style={{ marginBottom: "12px" }}>Use <strong>YouTube Embed</strong> to paste a YouTube URL.</p>
              <p>Use <strong>Link</strong> to add clickable links.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}