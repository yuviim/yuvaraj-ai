// Verified RSS sources for the AI signal radar.
// Anthropic has no official RSS feed — deliberately excluded from
// auto-ingestion rather than scraping their site. Add manually if needed.

export interface SignalFeedSource {
  source: string;
  url: string;
}

export const SIGNAL_FEEDS: SignalFeedSource[] = [
  { source: "OpenAI", url: "https://openai.com/news/rss.xml" },
  { source: "AWS", url: "https://aws.amazon.com/blogs/machine-learning/feed/" },
  { source: "Databricks", url: "https://www.databricks.com/feed" },
  { source: "LangChain", url: "https://blog.langchain.dev/rss/" },
  { source: "arXiv", url: "https://export.arxiv.org/rss/cs.AI" },
];

// Categories for curated signal items. NEXUSIQ is only for direct, specific
// connections — not every item needs a category at all.
export const SIGNAL_CATEGORIES = [
  { value: "NEXUSIQ", label: "NexusIQ", color: "#0F6E56", bg: "#E1F5EE" },
  { value: "INDUSTRY", label: "Industry", color: "#185FA5", bg: "#E6F1FB" },
  { value: "CAREER", label: "Career", color: "#854F0B", bg: "#FAEEDA" },
] as const;
