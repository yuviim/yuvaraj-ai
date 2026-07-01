"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  FileText,
  ImageIcon,
  LayoutDashboard,
  Link2,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  Video,
} from "lucide-react";

type ContentType =
  | "architecture"
  | "article"
  | "medium"
  | "linkedin"
  | "youtube"
  | "note";

type ContentItem = {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  path: string;
  series: string;
  description: string;
  content?: string;
  thumbnail: string;
  diagram?: string;
  url: string;
  mediumUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  slidesUrl?: string;
  readingTime?: string;
  tags: string[];
  featured: boolean;
  status?: "draft" | "published";
  published: string;
};

const emptyForm: ContentItem = {
  id: "",
  type: "architecture",
  title: "",
  slug: "",
  path: "enterprise-ai",
  series: "Enterprise AI Systems",
  description: "",
  content: "",
  thumbnail: "",
  diagram: "",
  url: "",
  mediumUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  githubUrl: "",
  slidesUrl: "",
  readingTime: "8 min read",
  tags: [],
  featured: false,
  status: "draft",
  published: new Date().toISOString(),
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line, index) => {
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="mt-8 text-2xl font-bold text-slate-950">
            {line.replace("### ", "")}
          </h3>
        );
      }

      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="mt-10 text-3xl font-bold text-slate-950">
            {line.replace("## ", "")}
          </h2>
        );
      }

      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="mt-8 text-4xl font-bold text-slate-950">
            {line.replace("# ", "")}
          </h1>
        );
      }

      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-5 list-disc text-slate-700">
            {line.replace("- ", "")}
          </li>
        );
      }

      if (!line.trim()) return <div key={index} className="h-4" />;

      return (
        <p key={index} className="text-[16px] font-medium leading-8 text-slate-700">
          {line}
        </p>
      );
    });
}

export default function ContentStudioPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [form, setForm] = useState<ContentItem>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadContent() {
    const res = await fetch("/api/content", { cache: "no-store" });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    loadContent();
  }, []);

  const stats = useMemo(
    () => ({
      total: items.length,
      architectures: items.filter((x) => x.type === "architecture").length,
      articles: items.filter((x) =>
        ["article", "medium", "linkedin", "note"].includes(x.type)
      ).length,
      videos: items.filter((x) => x.type === "youtube").length,
    }),
    [items]
  );

  const filtered = items.filter((item) =>
    `${item.title} ${item.series} ${item.path}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  function updateField(field: keyof ContentItem, value: any) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.id) next.slug = slugify(value);
      return next;
    });
  }

  async function saveContent(status: "draft" | "published") {
    setSaving(true);

    const finalSlug = form.slug || slugify(form.title);

    const payload: ContentItem = {
      ...form,
      id: form.id || crypto.randomUUID(),
      slug: finalSlug,
      status,
      url:
        form.url ||
        form.mediumUrl ||
        form.linkedinUrl ||
        form.youtubeUrl ||
        `/library/${form.path}/${finalSlug}`,
      tags: tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      published: form.published || new Date().toISOString(),
    };

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      alert("Save failed");
      return;
    }

    setForm(emptyForm);
    setTagInput("");
    await loadContent();
  }

  function editItem(item: ContentItem) {
    setForm({ ...emptyForm, ...item });
    setTagInput(item.tags?.join(", ") || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this content?")) return;
    await fetch(`/api/content?id=${id}`, { method: "DELETE" });
    await loadContent();
  }

  const previewHref = `/library/${form.path}/${form.slug || slugify(form.title)}`;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_45%,#eef3f8_100%)] text-slate-950">
      <div className="mx-auto max-w-[1700px] px-8 py-8">
        <header className="mb-8 flex items-center justify-between rounded-[28px] border border-slate-200 bg-white/90 px-6 py-5 shadow-sm backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
              Yuvaraj AI
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em]">
              Content Studio
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setForm(emptyForm);
                setTagInput("");
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20"
            >
              <Plus className="h-4 w-4" />
              New Article
            </button>

            <Link
              href="/"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm"
            >
              Back to site →
            </Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <StatCard icon={LayoutDashboard} label="Total content" value={stats.total} />
          <StatCard icon={ImageIcon} label="Architecture pages" value={stats.architectures} />
          <StatCard icon={FileText} label="Engineering notes" value={stats.articles} />
          <StatCard icon={Video} label="Videos" value={stats.videos} />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
          <section className="rounded-[34px] border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                  Editor
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">
                  Architecture Editor
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => saveContent("draft")}
                  disabled={saving || !form.title}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>

                <a
                  href={previewHref}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </a>

                <button
                  onClick={() => saveContent("published")}
                  disabled={saving || !form.title}
                  className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  Publish →
                </button>
              </div>
            </div>

            <input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Untitled architecture page"
              className="w-full border-none bg-transparent text-6xl font-bold leading-tight tracking-[-0.065em] text-slate-950 outline-none placeholder:text-slate-300"
            />

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Write a short description for the page, cards, and SEO..."
              className="mt-6 min-h-24 w-full resize-none border-none bg-transparent text-xl font-medium leading-9 text-slate-700 outline-none placeholder:text-slate-400"
            />

            <div className="my-10 grid gap-5 md:grid-cols-2">
              <ImageInput
                label="Cover image"
                value={form.thumbnail}
                placeholder="/images/library/ai-gateway.png"
                onChange={(value) => updateField("thumbnail", value)}
              />

              <ImageInput
                label="Architecture diagram"
                value={form.diagram || ""}
                placeholder="/images/library/ai-gateway-diagram.png"
                onChange={(value) => updateField("diagram", value)}
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">
                    Markdown editor
                  </p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                    Write
                  </span>
                </div>

                <textarea
                  value={form.content || ""}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder={`## Overview

Explain the architecture here.

## How it works

## Key components

- Gateway
- Policy engine
- Agent runtime
- Knowledge layer
- Data platform

## When to use it

## Common mistakes

## Reference implementation

Explain how this connects to NexusIQ.`}
                  className="min-h-[900px] w-full resize-y rounded-2xl border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800 outline-none focus:border-blue-300"
                />
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">
                    Live preview
                  </p>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    Preview
                  </span>
                </div>

                <article className="prose prose-slate max-w-none">
                  <h1 className="text-4xl font-bold tracking-[-0.05em] text-slate-950">
                    {form.title || "Untitled architecture page"}
                  </h1>

                  {form.description && (
                    <p className="mt-4 text-lg font-medium leading-8 text-slate-700">
                      {form.description}
                    </p>
                  )}

                  {form.diagram && (
                    <img
                      src={form.diagram}
                      alt={form.title}
                      className="mt-8 rounded-3xl border border-slate-200 shadow-sm"
                    />
                  )}

                  <div className="mt-8 space-y-2">
                    {renderMarkdown(form.content || "")}
                  </div>
                </article>
              </section>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[34px] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                Publishing
              </p>

              <div className="space-y-4">
                <Field label="Content type">
                  <select
                    value={form.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    className="input"
                  >
                    <option value="architecture">Architecture Page</option>
                    <option value="article">Website Article</option>
                    <option value="note">Engineering Note</option>
                    <option value="medium">Medium Article</option>
                    <option value="linkedin">LinkedIn Post</option>
                    <option value="youtube">YouTube Video</option>
                  </select>
                </Field>

                <Field label="Library path">
                  <select
                    value={form.path}
                    onChange={(e) => updateField("path", e.target.value)}
                    className="input"
                  >
                    <option value="enterprise-ai">enterprise-ai</option>
                    <option value="agentic-ai">agentic-ai</option>
                    <option value="data-platforms">data-platforms</option>
                    <option value="sovereign-ai">sovereign-ai</option>
                    <option value="know-exasol">know-exasol</option>
                    <option value="nexusiq">nexusiq</option>
                    <option value="architecture-notes">architecture-notes</option>
                  </select>
                </Field>

                <Field label="Slug">
                  <input
                    value={form.slug}
                    onChange={(e) => updateField("slug", slugify(e.target.value))}
                    className="input"
                    placeholder="ai-gateway"
                  />
                </Field>

                <Field label="Series">
                  <input
                    value={form.series}
                    onChange={(e) => updateField("series", e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="Reading time">
                  <input
                    value={form.readingTime || ""}
                    onChange={(e) => updateField("readingTime", e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="Tags">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="input"
                    placeholder="AI Gateway, Security, RAG"
                  />
                </Field>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => updateField("featured", e.target.checked)}
                  />
                  Feature on homepage
                </label>
              </div>
            </section>

            <section className="rounded-[34px] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                Links
              </p>

              <div className="space-y-4">
                <Field label="Medium URL">
                  <input
                    value={form.mediumUrl || ""}
                    onChange={(e) => updateField("mediumUrl", e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="LinkedIn URL">
                  <input
                    value={form.linkedinUrl || ""}
                    onChange={(e) => updateField("linkedinUrl", e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="YouTube URL">
                  <input
                    value={form.youtubeUrl || ""}
                    onChange={(e) => updateField("youtubeUrl", e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="GitHub URL">
                  <input
                    value={form.githubUrl || ""}
                    onChange={(e) => updateField("githubUrl", e.target.value)}
                    className="input"
                  />
                </Field>
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-8 rounded-[34px] border border-slate-200 bg-white/95 p-7 shadow-sm backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                Library database
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">
                Published content
              </h2>
            </div>

            <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search content..."
                className="w-full bg-transparent text-sm font-medium outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filtered.map((item) => {
              const href = `/library/${item.path}/${item.slug}`;
              const image = item.thumbnail || item.diagram;

              return (
                <div
                  key={item.id}
                  className="grid gap-5 rounded-[28px] border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white md:grid-cols-[220px_1fr_auto]"
                >
                  <div className="h-32 overflow-hidden rounded-2xl bg-slate-200">
                    {image ? (
                      <img
                        src={image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <ImageIcon className="h-7 w-7" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 py-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                      {item.type} · {item.series}
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <p className="mt-3 text-xs font-bold text-slate-500">
                      {href}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={href}
                      target="_blank"
                      className="rounded-xl border border-slate-200 bg-white p-3 text-slate-700"
                    >
                      <Link2 className="h-4 w-4" />
                    </a>

                    <button
                      onClick={() => editItem(item)}
                      className="rounded-xl border border-slate-200 bg-white p-3 text-slate-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="rounded-xl border border-red-200 bg-white p-3 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
    return (
    <div className="flex items-center gap-4 rounded-[22px] border border-slate-200 bg-white/95 p-5 shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" />
        </div>
        <div>
        <p className="text-3xl font-bold tracking-[-0.06em] text-slate-950">
            {value}
        </p>
        <p className="text-sm font-bold text-slate-500">{label}</p>
        </div>
    </div>
    );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <p className="mb-2 text-sm font-bold text-slate-700">{label}</p>
      {children}
    </label>
  );
}

function ImageInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
      <p className="mb-3 text-sm font-bold text-slate-700">{label}</p>

      <div className="mb-3 h-52 overflow-hidden rounded-2xl bg-slate-200">
        {value ? (
          <img src={value} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImageIcon className="mb-2 h-8 w-8" />
            <p className="text-xs font-bold">Upload or paste image path</p>
          </div>
        )}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        placeholder={placeholder}
      />
    </div>
  );
}