import { NewsArticle } from "@/types/finance";

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    title: "NVIDIA Blackwell Chips Face Massive Cloud Provider Demand",
    summary: "Hyperscalers like Microsoft, Google, and Amazon are placing record orders for Nvidia's next-generation Blackwell architecture, leading to supply constraint concerns.",
    url: "https://example.com/finance/news/nvda-blackwell-demand",
    source: "Financial Times (Mock)",
    timePublished: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
    sentiment: "positive",
    relatedSymbols: ["NVDA", "MSFT", "GOOGL", "AMZN"]
  },
  {
    id: "news-2",
    title: "Apple Explares Next-Gen Smart Home Screens Amid Hardware Growth Goals",
    summary: "Apple is ramping up development on a brand-new home operating system and screen-based devices to compete with Amazon Echo Show and Google Nest Hub.",
    url: "https://example.com/finance/news/aapl-smart-home",
    source: "Bloomberg (Mock)",
    timePublished: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
    sentiment: "neutral",
    relatedSymbols: ["AAPL", "AMZN"]
  },
  {
    id: "news-3",
    title: "Federal Reserve Hints at Slower Interest Rate Cuts in Q3 Meeting",
    summary: "Federal Reserve officials expressed caution regarding future rate cuts, citing sticky inflation and strong labor metrics, pushing stock futures slightly downward.",
    url: "https://example.com/finance/news/fed-rate-cuts-update",
    source: "Reuters (Mock)",
    timePublished: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    sentiment: "negative",
    relatedSymbols: ["AAPL", "MSFT", "GOOGL", "NVDA", "TSLA", "AMZN"]
  },
  {
    id: "news-4",
    title: "Tesla Cybercab Production Schedule Faces Technical Regulatory Hurdles",
    summary: "Tesla is working closely with state regulatory commissions to secure self-driving permits for its robotaxi fleet, but timelines remain ambitious.",
    url: "https://example.com/finance/news/tsla-cybercab-status",
    source: "WSJ (Mock)",
    timePublished: new Date(Date.now() - 3600000 * 20).toISOString(), // 20 hours ago
    sentiment: "neutral",
    relatedSymbols: ["TSLA"]
  }
];
