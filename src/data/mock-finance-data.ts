import { formatCurrency, formatLargeNumber } from "@/lib/utils";
import type { CompanyOverviewData, FinancialMetricData, StockQuote } from "@/types/finance";
import type { ResponseBlock, Source } from "@/types/chat";
import { MOCK_STOCKS, generateMockHistory } from "./mock-stocks";
import { MOCK_NEWS } from "./mock-news";

/**
 * All finance-domain mock content — company profiles, canned explanation
 * copy, and the structured ResponseBlock builders the chat resolver calls.
 * Kept separate from both the UI components and the chat intent-matching in
 * mock-chat-responses.ts so any one of the three can change independently.
 */

export const MOCK_COMPANY_OVERVIEWS: Record<string, CompanyOverviewData> = {
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    description:
      "NVIDIA designs and manufactures graphics processing units (GPUs) and system-on-chip units, and has become a leading provider of AI infrastructure hardware and software.",
    sector: "Technology",
    industry: "Semiconductors",
    headquarters: "Santa Clara, California",
    founded: "1993",
    employees: "29,600+",
    website: "nvidia.com",
  },
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    description:
      "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, alongside a growing range of subscription services.",
    sector: "Technology",
    industry: "Consumer Electronics",
    headquarters: "Cupertino, California",
    founded: "1976",
    employees: "164,000+",
    website: "apple.com",
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    description:
      "Microsoft develops, licenses, and supports software, services, devices, and solutions worldwide, spanning productivity software, cloud computing, and gaming.",
    sector: "Technology",
    industry: "Software—Infrastructure",
    headquarters: "Redmond, Washington",
    founded: "1975",
    employees: "228,000+",
    website: "microsoft.com",
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    description:
      "Tesla designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems, and related products and services.",
    sector: "Consumer Cyclical",
    industry: "Auto Manufacturers",
    headquarters: "Austin, Texas",
    founded: "2003",
    employees: "140,000+",
    website: "tesla.com",
  },
};

const DISCLAIMER = "This analysis is for informational purposes only and does not constitute financial advice.";

interface SymbolCopy {
  /** Short one-liner for a bare mention ("Tesla?") — no deep-dive intent. */
  quickMention: string;
  /** Structured explanation for "Analyze X" — short lead + "Why it matters" bullets + a key risk line. */
  analysis: string;
  /** Structured explanation for risk-focused follow-ups ("What are the risks?"). */
  risks: string;
  suggestions: string[];
  riskSuggestions: string[];
}

const SYMBOL_COPY: Record<string, SymbolCopy> = {
  NVDA: {
    quickMention:
      "NVIDIA (NVDA) is trading around $127.85 today, up 3.52%, on continued AI-infrastructure demand.",
    analysis:
      "NVIDIA remains one of the strongest AI infrastructure companies in the market right now.\n\nWhy it matters\n• Continued demand for its Blackwell architecture, with hyperscalers reportedly placing record orders\n• Revenue grew 94% year-over-year last quarter to $35.1B\n• Data-center revenue continues to expand as the primary growth driver\n\nKey risk\nExpectations are already high, and supply constraints on Blackwell could delay revenue recognition into future quarters.",
    risks:
      "Key risks for NVIDIA (NVDA):\n• Elevated valuation (P/E ~68x) leaves little room for growth disappointment\n• Customer concentration among a handful of hyperscalers\n• Supply constraints on the Blackwell architecture could delay revenue recognition\n• Intensifying competition from custom AI silicon built in-house by major cloud providers",
    suggestions: [
      "What are NVIDIA's biggest risks?",
      "Compare NVIDIA with AMD",
      "Show NVIDIA revenue growth",
      "What is NVIDIA's valuation?",
    ],
    riskSuggestions: [
      "How does NVDA's valuation compare to peers?",
      "Compare NVIDIA with AMD",
      "What is moving the market today?",
    ],
  },
  AAPL: {
    quickMention: "Apple (AAPL) is trading around $182.52 today, up 0.79%, with a market cap near $2.85T.",
    analysis:
      "Apple continues to lean on Services growth and steady hardware demand, with a strong balance sheet backing continued buybacks.\n\nWhy it matters\n• Services revenue keeps expanding as a higher-margin, more predictable growth driver\n• Apple is reportedly expanding into new smart-home devices to broaden its hardware ecosystem\n• A large buyback program continues to support earnings per share\n\nKey risk\nRegulatory scrutiny around App Store practices remains a background risk to Services economics.",
    risks:
      "Key risks for Apple (AAPL):\n• Slowing hardware upgrade cycles in a maturing smartphone market\n• Regulatory scrutiny around App Store practices and antitrust actions\n• Heavy reliance on China for both manufacturing and a meaningful share of revenue\n• Currency headwinds given Apple's global revenue mix",
    suggestions: [
      "How is Apple's Services segment growing?",
      "What's Apple's exposure to App Store regulation?",
      "Compare Apple and Microsoft",
    ],
    riskSuggestions: [
      "What's Apple's exposure to App Store regulation?",
      "Compare Apple and Microsoft",
      "What is Apple's current position?",
    ],
  },
  MSFT: {
    quickMention: "Microsoft (MSFT) is trading around $415.50 today, down 0.50%, on a large cap near $3.09T.",
    analysis:
      "Microsoft's growth story is increasingly tied to Azure and AI-infrastructure demand, alongside steady strength in its productivity software suite.\n\nWhy it matters\n• Azure and cloud services continue to be the primary growth engine\n• Copilot and AI features are being layered across the Microsoft 365 suite\n• A diversified revenue base spans cloud, software, and gaming\n\nKey risk\nThe elevated valuation (P/E ~36x) is priced for continued AI-driven growth, raising the bar for execution.",
    risks:
      "Key risks for Microsoft (MSFT):\n• Elevated valuation (P/E ~35.8x) priced for continued AI-driven growth\n• Heavy capital expenditure required to build out AI and cloud infrastructure\n• Regulatory attention around cloud and AI market concentration\n• Execution risk in translating AI investment into durable Azure and Copilot revenue",
    suggestions: ["How fast is Azure growing?", "Compare Apple and Microsoft", "What's driving AI infrastructure stocks today?"],
    riskSuggestions: ["How fast is Azure growing?", "Compare Apple and Microsoft", "What is moving the market today?"],
  },
  TSLA: {
    quickMention:
      "Tesla (TSLA) is trading around $175.34 today, down 3.02%, pressured by regulatory delays around Cybercab.",
    analysis:
      "Tesla's near-term sentiment is mixed.\n\nWhy it matters\n• Production capacity keeps expanding across existing vehicle lines\n• The Cybercab robotaxi rollout continues to face regulatory delays for self-driving permits\n• Tesla remains one of the more volatile large-cap names\n\nKey risk\nA relatively high valuation (P/E ~45.3x) raises sensitivity to any growth disappointment, so position sizing and time horizon matter more than usual here.",
    risks:
      "Key risks for Tesla (TSLA):\n• Execution risk on new products like the Cybercab, which still faces regulatory hurdles for self-driving permits\n• Margin pressure from price competition in the EV market\n• A relatively high valuation (P/E ~45.3x) that raises sensitivity to any growth disappointment\n• Outsized dependence on leadership decisions and public communications",
    suggestions: [
      "What are the key risks of investing in Tesla?",
      "How does Tesla's delivery growth look this year?",
      "Compare Tesla to other EV makers",
    ],
    riskSuggestions: [
      "How does Tesla's margin compare to legacy automakers?",
      "What's the timeline for Cybercab regulatory approval?",
      "How volatile has TSLA been over the past year?",
    ],
  },
};

function buildMetrics(stock: StockQuote): FinancialMetricData[] {
  const metrics: FinancialMetricData[] = [
    { label: "Market Cap", value: `$${formatLargeNumber(stock.marketCap)}` },
    { label: "P/E Ratio", value: stock.peRatio ? stock.peRatio.toFixed(1) : "—" },
  ];
  if (stock.eps !== undefined) metrics.push({ label: "EPS", value: formatCurrency(stock.eps) });
  if (stock.revenue !== undefined) {
    metrics.push({ label: "Revenue (TTM)", value: `$${formatLargeNumber(stock.revenue)}` });
  }
  metrics.push({ label: "Volume", value: formatLargeNumber(stock.volume) });
  if (stock.week52High !== undefined) metrics.push({ label: "52W High", value: formatCurrency(stock.week52High) });
  if (stock.week52Low !== undefined) metrics.push({ label: "52W Low", value: formatCurrency(stock.week52Low) });
  if (stock.dividendYield !== undefined) {
    metrics.push({ label: "Dividend Yield", value: `${stock.dividendYield.toFixed(2)}%` });
  }
  return metrics;
}

export function buildSources(symbols: string[]): Source[] {
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const article of MOCK_NEWS) {
    if (!symbols.some((s) => article.relatedSymbols.includes(s))) continue;
    if (seen.has(article.id)) continue;
    seen.add(article.id);
    sources.push({
      id: `src-${article.id}`,
      title: article.title,
      url: article.url,
      sourceName: article.source,
      publishDate: new Date(article.timePublished).toLocaleDateString(),
    });
  }
  return sources;
}

export interface ResolvedResponse {
  blocks: ResponseBlock[];
  suggestions?: string[];
}

/** Full "Analyze X" response: explanation, quote, metrics, chart, company profile, news, sources. */
export function buildAnalysisResponse(symbol: string): ResolvedResponse | null {
  const stock = MOCK_STOCKS[symbol];
  const copy = SYMBOL_COPY[symbol];
  if (!stock || !copy) return null;

  const company = MOCK_COMPANY_OVERVIEWS[symbol];
  const history = generateMockHistory(symbol, "3M");
  const news = MOCK_NEWS.filter((n) => n.relatedSymbols.includes(symbol)).slice(0, 3);

  const blocks: ResponseBlock[] = [
    { type: "text", text: `${copy.analysis}\n\n${DISCLAIMER}` },
    { type: "stock", stock },
    { type: "metrics", title: "Key metrics", metrics: buildMetrics(stock) },
    { type: "chart", title: `${symbol} price`, subtitle: "Last 3 months", symbol, data: history.dataPoints },
  ];
  if (company) blocks.push({ type: "company", company });
  if (news.length > 0) blocks.push({ type: "news", news, symbols: [symbol] });
  blocks.push({ type: "sources", sources: buildSources([symbol]) });

  return { blocks, suggestions: copy.suggestions };
}

/** Lighter response for a bare ticker mention — quote + short blurb, no full analysis. */
export function buildQuickMentionResponse(symbol: string): ResolvedResponse | null {
  const stock = MOCK_STOCKS[symbol];
  const copy = SYMBOL_COPY[symbol];
  if (!stock || !copy) return null;

  return {
    blocks: [
      { type: "text", text: `${copy.quickMention}\n\n${DISCLAIMER}` },
      { type: "stock", stock },
      { type: "sources", sources: buildSources([symbol]) },
    ],
    suggestions: copy.suggestions,
  };
}

/** Risk-focused follow-up ("What are the risks?"), text + sources only — no stock card needed. */
export function buildRiskResponse(symbol: string): ResolvedResponse | null {
  const copy = SYMBOL_COPY[symbol];
  if (!copy) return null;

  return {
    blocks: [
      { type: "text", text: `${copy.risks}\n\n${DISCLAIMER}` },
      { type: "sources", sources: buildSources([symbol]) },
    ],
    suggestions: copy.riskSuggestions,
  };
}

/** Structured finance response comparing two or more tickers. */
export function buildComparisonResponse(symbols: string[], explanation: string): ResolvedResponse | null {
  const stocks = symbols.map((s) => MOCK_STOCKS[s]).filter((s): s is StockQuote => Boolean(s));
  if (stocks.length < 2) return null;

  const blocks: ResponseBlock[] = [
    { type: "text", text: `${explanation}\n\n${DISCLAIMER}` },
    { type: "stocks", stocks },
    ...stocks.map(
      (stock): ResponseBlock => ({
        type: "metrics",
        title: `${stock.symbol} key metrics`,
        metrics: buildMetrics(stock),
      })
    ),
  ];

  const news = MOCK_NEWS.filter((n) => symbols.some((s) => n.relatedSymbols.includes(s))).slice(0, 3);
  if (news.length > 0) blocks.push({ type: "news", news, symbols });
  blocks.push({ type: "sources", sources: buildSources(symbols) });

  return { blocks, suggestions: ["Which has stronger free cash flow?", "Compare their dividend yields", "What is moving the market today?"] };
}

/** Text-first response for questions that don't concern a specific tracked stock (Scenario D). */
export function buildTextResponse(explanation: string, sources: Source[], suggestions: string[]): ResolvedResponse {
  const blocks: ResponseBlock[] = [{ type: "text", text: `${explanation}\n\n${DISCLAIMER}` }];
  if (sources.length > 0) blocks.push({ type: "sources", sources });
  return { blocks, suggestions };
}
