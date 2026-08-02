// Verified RSS sources for the AI signal radar.
// Anthropic and Perplexity have no official RSS feed — deliberately excluded
// from auto-ingestion rather than scraping their site. Add manually if needed.

export interface SignalFeedSource {
  source: string;
  url: string;
}

export const SIGNAL_FEEDS: SignalFeedSource[] = [
  { source: "OpenAI", url: "https://openai.com/news/rss.xml" },
  { source: "Google DeepMind", url: "https://deepmind.google/blog/feed/basic/" },
  { source: "Hugging Face", url: "https://huggingface.co/blog/feed.xml" },
  { source: "AWS", url: "https://aws.amazon.com/blogs/machine-learning/feed/" },
  { source: "Google Cloud", url: "https://cloud.google.com/blog/products/ai-machine-learning/rss" },
  { source: "Azure", url: "https://azure.microsoft.com/en-us/blog/feed/" },
  { source: "Snowflake", url: "https://www.snowflake.com/en/blog/feed/" },
];

// Categories for curated signal items. NEXUSIQ is only for direct, specific
// connections — not every item needs a category at all.
export const SIGNAL_CATEGORIES = [
  { value: "NEXUSIQ", label: "NexusIQ", color: "#0F6E56", bg: "#E1F5EE" },
  { value: "INDUSTRY", label: "Industry", color: "#185FA5", bg: "#E6F1FB" },
  { value: "CAREER", label: "Career", color: "#854F0B", bg: "#FAEEDA" },
] as const;
