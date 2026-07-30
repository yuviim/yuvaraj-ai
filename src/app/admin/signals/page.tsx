"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SIGNAL_CATEGORIES } from "@/lib/signalFeeds";

interface SignalItem {
  id: string;
  title: string;
  url: string;
  source: string;
  summary: string | null;
  category: string | null;
  whyMatters: string | null;
  status: string;
  feedPublishedAt: string | null;
  publishedAt: string | null;
}

interface ToastMsg {
  id: number;
  text: string;
  type: "success" | "error";
}

export default function SignalAdminPage() {
  const [pending, setPending] = useState<SignalItem[]>([]);
  const [published, setPublished] = useState<SignalItem[]>([]);
  const [tab, setTab] = useState<"pending" | "published">("pending");
  const [drafts, setDrafts] = useState<Record<string, { category: string; whyMatters: string }>>({});
  const [syncing, setSyncing] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [collapsedSources, setCollapsedSources] = useState<Record<string, boolean>>({});

  const toggleSource = (source: string) => {
    setCollapsedSources((prev) => ({ ...prev, [source]: !prev[source] }));
  };

  const showToast = useCallback((text: string, type: ToastMsg["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  const getPassword = () => {
    let pw = sessionStorage.getItem("signal_admin_pw");
    if (!pw) {
      pw = window.prompt("Admin password:") || "";
      if (pw) sessionStorage.setItem("signal_admin_pw", pw);
    }
    return pw;
  };

  const fetchItems = useCallback(async () => {
    const [p, pub] = await Promise.all([
      fetch("/api/signals?status=PENDING").then((r) => r.json()),
      fetch("/api/signals?status=PUBLISHED").then((r) => r.json()),
    ]);
    setPending(p);
    setPublished(pub);
    const nextDrafts: Record<string, { category: string; whyMatters: string }> = {};
    [...p, ...pub].forEach((item: SignalItem) => {
      nextDrafts[item.id] = { category: item.category || "", whyMatters: item.whyMatters || "" };
    });
    setDrafts(nextDrafts);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSyncNow = async () => {
    setSyncing(true);
    try {
      const pw = getPassword();
      const res = await fetch("/api/signals/sync", {
        headers: { Authorization: "Bearer " + pw },
      });
      if (res.ok) {
        const data = await res.json();
        const totalAdded = Object.values(data.results as Record<string, { added: number }>).reduce(
          (sum, r) => sum + r.added,
          0
        );
        showToast(`Synced — ${totalAdded} new item${totalAdded === 1 ? "" : "s"} added`, "success");
        fetchItems();
      } else {
        sessionStorage.removeItem("signal_admin_pw");
        showToast("Sync failed — check password", "error");
      }
    } catch (err) {
      showToast("Sync error: " + err, "error");
    }
    setSyncing(false);
  };

  const updateDraft = (id: string, field: "category" | "whyMatters", value: string) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const patchItem = async (id: string, data: Record<string, unknown>) => {
    const pw = getPassword();
    const res = await fetch("/api/signals/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + pw },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      sessionStorage.removeItem("signal_admin_pw");
      showToast("Action failed — check password", "error");
      return false;
    }
    return true;
  };

  const handlePublish = async (id: string) => {
    const draft = drafts[id] || { category: "", whyMatters: "" };
    const ok = await patchItem(id, { category: draft.category, whyMatters: draft.whyMatters, status: "PUBLISHED" });
    if (ok) {
      showToast("Published to radar", "success");
      fetchItems();
    }
  };

  const handleUnpublish = async (id: string) => {
    const ok = await patchItem(id, { status: "PENDING" });
    if (ok) {
      showToast("Moved back to pending", "success");
      fetchItems();
    }
  };

  const handleDiscard = async (id: string) => {
    const pw = getPassword();
    const res = await fetch("/api/signals/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + pw },
    });
    if (res.ok) {
      showToast("Discarded", "success");
      fetchItems();
    } else {
      sessionStorage.removeItem("signal_admin_pw");
      showToast("Action failed — check password", "error");
    }
  };

  const list = tab === "pending" ? pending : published;

  // Group by source so a large pending queue reads as sections
  // (AWS, OpenAI, etc.) instead of one long undifferentiated list.
  const grouped = list.reduce<Record<string, SignalItem[]>>((acc, item) => {
    (acc[item.source] = acc[item.source] || []).push(item);
    return acc;
  }, {});
  const sourceOrder = Object.keys(grouped).sort((a, b) => grouped[b].length - grouped[a].length);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F3EC" }}>
      <header style={{ background: "linear-gradient(135deg, #0E1B33, #142943)", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>AI Signal Radar</div>
          <div style={{ color: "#6C7A99", fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace" }}>CURATION</div>
        </div>
        <button
          onClick={handleSyncNow}
          disabled={syncing}
          style={{
            fontSize: "13px", fontWeight: 700, padding: "9px 18px", borderRadius: "9px",
            background: "linear-gradient(135deg, #63C7DE, #2C8FAD)", color: "#0A1628",
            border: "none", cursor: syncing ? "default" : "pointer", opacity: syncing ? 0.6 : 1,
          }}
        >
          {syncing ? "Syncing..." : "Sync now"}
        </button>
      </header>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button
            onClick={() => setTab("pending")}
            style={{
              fontSize: "13px", fontWeight: 700, padding: "8px 16px", borderRadius: "8px", border: "1px solid #E7EAF0",
              background: tab === "pending" ? "#0E1B33" : "#fff", color: tab === "pending" ? "#fff" : "#374151", cursor: "pointer",
            }}
          >
            Pending review ({pending.length})
          </button>
          <button
            onClick={() => setTab("published")}
            style={{
              fontSize: "13px", fontWeight: 700, padding: "8px 16px", borderRadius: "8px", border: "1px solid #E7EAF0",
              background: tab === "published" ? "#0E1B33" : "#fff", color: tab === "published" ? "#fff" : "#374151", cursor: "pointer",
            }}
          >
            Published ({published.length})
          </button>
        </div>

        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9AA3B2" }}>
            {tab === "pending" ? "Nothing pending — click Sync now to check feeds." : "Nothing published yet."}
          </div>
        )}

        {sourceOrder.map((source) => {
          const items = grouped[source];
          const collapsed = !!collapsedSources[source];
          return (
            <div key={source} style={{ marginBottom: "22px" }}>
              <button
                onClick={() => toggleSource(source)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", width: "100%",
                  background: "none", border: "none", cursor: "pointer", padding: "0 0 10px 0",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "11px", color: "#9AA3B2", transform: collapsed ? "rotate(-90deg)" : "none", display: "inline-block", transition: "transform .15s" }}>▾</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E1B33", textTransform: "uppercase", letterSpacing: "0.05em" }}>{source}</span>
                <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#6B7280", background: "#EDEEF2", borderRadius: "99px", padding: "2px 9px" }}>{items.length}</span>
              </button>

              {!collapsed && items.map((item) => {
                const draft = drafts[item.id] || { category: "", whyMatters: "" };
                return (
                  <div key={item.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E7EAF0", padding: "18px 20px", marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "12px", marginBottom: "8px" }}>
                      <div>
                        {item.feedPublishedAt && (
                          <span style={{ fontSize: "11px", color: "#9AA3B2" }}>
                            {new Date(item.feedPublishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "15px", fontWeight: 700, color: "#111827", lineHeight: 1.4, display: "block", marginBottom: "6px" }}>
                      {item.title}
                    </a>
                    {item.summary && (
                      <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.6, marginBottom: "14px" }}>{item.summary}</p>
                    )}

                    {tab === "pending" ? (
                      <>
                        <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
                          <button
                            onClick={() => updateDraft(item.id, "category", "")}
                            style={{
                              fontSize: "11.5px", fontWeight: 600, padding: "5px 12px", borderRadius: "99px",
                              border: draft.category === "" ? "1px solid #111827" : "1px solid #E7EAF0",
                              background: draft.category === "" ? "#111827" : "#fff",
                              color: draft.category === "" ? "#fff" : "#6B7280", cursor: "pointer",
                            }}
                          >
                            No tag
                          </button>
                          {SIGNAL_CATEGORIES.map((cat) => (
                            <button
                              key={cat.value}
                              onClick={() => updateDraft(item.id, "category", cat.value)}
                              style={{
                                fontSize: "11.5px", fontWeight: 600, padding: "5px 12px", borderRadius: "99px",
                                border: draft.category === cat.value ? `1px solid ${cat.color}` : "1px solid #E7EAF0",
                                background: draft.category === cat.value ? cat.bg : "#fff",
                                color: draft.category === cat.value ? cat.color : "#6B7280", cursor: "pointer",
                              }}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={draft.whyMatters}
                          onChange={(e) => updateDraft(item.id, "whyMatters", e.target.value)}
                          placeholder="Why this matters (optional, one line)..."
                          style={{
                            width: "100%", fontSize: "13px", padding: "9px 12px", borderRadius: "8px",
                            border: "1px solid #E7EAF0", fontFamily: "inherit", resize: "vertical", minHeight: "44px", marginBottom: "10px",
                          }}
                        />
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handlePublish(item.id)}
                            style={{ fontSize: "12.5px", fontWeight: 700, padding: "7px 16px", borderRadius: "8px", border: "none", background: "#0E1B33", color: "#fff", cursor: "pointer" }}
                          >
                            Publish
                          </button>
                          <button
                            onClick={() => handleDiscard(item.id)}
                            style={{ fontSize: "12.5px", fontWeight: 600, padding: "7px 16px", borderRadius: "8px", border: "1px solid #FECACA", background: "#FEF2F2", color: "#EF4444", cursor: "pointer" }}
                          >
                            Discard
                          </button>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                        <span style={{ fontSize: "11.5px", color: "#9AA3B2" }}>
                          {item.category ? SIGNAL_CATEGORIES.find((c) => c.value === item.category)?.label : "No tag"}
                          {item.whyMatters ? " — " + item.whyMatters : ""}
                        </span>
                        <button
                          onClick={() => handleUnpublish(item.id)}
                          style={{ fontSize: "11.5px", fontWeight: 600, padding: "5px 12px", borderRadius: "7px", border: "1px solid #E7EAF0", background: "#fff", color: "#6B7280", cursor: "pointer" }}
                        >
                          Unpublish
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ position: "fixed", bottom: "22px", right: "22px", zIndex: 200, display: "flex", flexDirection: "column", gap: "8px" }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "12px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
              color: t.type === "error" ? "#991B1B" : "#065F46",
              background: t.type === "error" ? "#FEF2F2" : "#ECFDF5",
              border: "1px solid " + (t.type === "error" ? "#FECACA" : "#A7F3D0"),
              boxShadow: "0 8px 24px rgba(14,27,51,.12)", maxWidth: "320px",
            }}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
