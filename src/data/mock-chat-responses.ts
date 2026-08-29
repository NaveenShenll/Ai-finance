import type { AIResponse, ChatContext, ResponseBlock } from "@/types/chat";
import {
  buildAnalysisResponse,
  buildComparisonResponse,
  buildQuickMentionResponse,
  buildRiskResponse,
  buildTextResponse,
  type ResolvedResponse,
} from "./mock-finance-data";

export type { ChatContext };

interface MockRule {
  match: (query: string, context?: ChatContext) => boolean;
  resolve: (query: string, context?: ChatContext) => ResolvedResponse;
}

/**
 * Typing this exact phrase deliberately triggers the error path, so the
 * error/retry UI can be exercised without relying on random flakiness.
 */
const ERROR_TRIGGER = "force error";

/** "Analyze NVIDIA", "What is Apple's current position?", "AAPL overview", etc. */
const ANALYSIS_INTENT = /(analyze|position|overview)/;

const TICKER_PATTERNS: Record<string, RegExp> = {
  NVDA: /(nvidia|nvda)/,
  AAPL: /(apple|aapl)/,
  MSFT: /(microsoft|msft)/,
  TSLA: /(tesla|tsla)/,
};

function mentionedSymbol(query: string): string | undefined {
  return Object.keys(TICKER_PATTERNS).find((symbol) => TICKER_PATTERNS[symbol].test(query));
}

const RULES: MockRule[] = [
  {
    match: (q) => /compare/.test(q) && /(apple|aapl)/.test(q) && /(microsoft|msft)/.test(q),
    resolve: () => {
      const explanation =
        "Apple (AAPL) trades near $182.52, up 0.79% today, at a P/E of roughly 29.4x. Microsoft (MSFT) trades near $415.50, down 0.50% today, at a P/E of roughly 35.8x. Microsoft carries the larger market cap, driven mostly by Azure and enterprise software growth, while Apple's story leans more on hardware refresh cycles and Services margin expansion.";
      return buildComparisonResponse(["AAPL", "MSFT"], explanation)!;
    },
  },

  // "Analyze <ticker>" / "<ticker>'s current position" / "<ticker> overview" — one rule per known symbol.
  ...Object.keys(TICKER_PATTERNS).map(
    (symbol): MockRule => ({
      match: (q) => ANALYSIS_INTENT.test(q) && TICKER_PATTERNS[symbol].test(q),
      resolve: () => buildAnalysisResponse(symbol)!,
    })
  ),

  // Analysis intent for a company we don't have mock data for — empty state, not silent degradation.
  {
    match: (q) => ANALYSIS_INTENT.test(q),
    resolve: () => ({
      blocks: [],
      suggestions: ["Analyze NVIDIA's recent performance", "What is Apple's current position?", "Compare Apple and Microsoft"],
    }),
  },

  // Explicit "<ticker> ... risk" mentions.
  ...Object.keys(TICKER_PATTERNS).map(
    (symbol): MockRule => ({
      match: (q) => /risk/.test(q) && TICKER_PATTERNS[symbol].test(q),
      resolve: () => buildRiskResponse(symbol)!,
    })
  ),

  // Context-only risk follow-up: "What are the main risks?" with no ticker in this message,
  // resolved against whichever symbol the conversation was last about.
  {
    match: (q, ctx) => /risk/.test(q) && !mentionedSymbol(q) && Boolean(ctx?.lastSymbol),
    resolve: (_q, ctx) => buildRiskResponse(ctx!.lastSymbol!) ?? buildTextResponse("I don't have risk data for that yet.", [], []),
  },

  // Bare ticker mentions with no particular intent — a quick quote, not a full analysis.
  ...Object.keys(TICKER_PATTERNS).map(
    (symbol): MockRule => ({
      match: (q) => TICKER_PATTERNS[symbol].test(q),
      resolve: () => buildQuickMentionResponse(symbol)!,
    })
  ),

  {
    match: (q) => /(market|sentiment|moving)/.test(q),
    resolve: () =>
      buildTextResponse(
        "Markets are broadly cautious today. Federal Reserve officials signaled a slower pace of interest rate cuts, citing sticky inflation and resilient labor data, which has weighed on rate-sensitive sectors. On the other hand, AI infrastructure names like NVIDIA are seeing continued strength on hyperscaler demand — so breadth is mixed rather than a clean risk-on or risk-off day.",
        [
          {
            id: "src-fed-rates",
            title: "Federal Reserve Hints at Slower Interest Rate Cuts in Q3 Meeting",
            url: "https://example.com/finance/news/fed-rate-cuts-update",
            sourceName: "Reuters (Mock)",
          },
        ],
        ["How are rate-sensitive sectors reacting?", "What's driving AI infrastructure stocks today?", "Explain today's market sentiment"]
      ),
  },

  // Scenario D — a general finance question with no specific stock in view. Text + sources only.
  {
    match: (q) => /(portfolio|invest|technology stocks|tech stocks)/.test(q),
    resolve: () =>
      buildTextResponse(
        "Before investing in any individual stock, it's worth anchoring on a few basics.\n\nWhy it matters\n• Your time horizon and how the position fits your overall diversification\n• The company's valuation relative to its growth and margins\n• How much volatility you can tolerate without changing your plan\n\nKey risk\nConcentrating too heavily in one sector — technology, for example — can amplify both gains and drawdowns.",
        [
          {
            id: "src-investing-basics",
            title: "A Beginner's Guide to Stock Valuation",
            url: "https://example.com/finance/education/valuation-basics",
            sourceName: "Investor Education (Mock)",
          },
        ],
        ["How can I diversify a tech-heavy portfolio?", "What should I know before investing in a stock?", "Explain today's market sentiment"]
      ),
  },
];

const FALLBACK: ResolvedResponse = {
  blocks: [
    {
      type: "text",
      text: "I can help with questions about specific stocks, market trends, or general investing concepts. Try asking about a company like NVIDIA or Tesla, or ask what's moving the market today.\n\nThis analysis is for informational purposes only and does not constitute financial advice.",
    },
  ],
  suggestions: ["Analyze NVIDIA's recent performance", "What is moving the market today?", "Compare Apple and Microsoft"],
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Frontend-only mock chat resolver: given a query (and optional lightweight
 * context), picks a canned, finance-flavored structured response and
 * resolves after a short simulated "thinking" delay. No network access.
 */
export async function getMockResponse(userMessage: string, context?: ChatContext): Promise<AIResponse> {
  const query = userMessage.toLowerCase();

  await wait(900 + Math.random() * 700);

  if (query.includes(ERROR_TRIGGER)) {
    throw new Error("The mock AI service couldn't generate a response. Please try again.");
  }

  const rule = RULES.find((r) => r.match(query, context));
  const resolved = rule ? rule.resolve(query, context) : FALLBACK;

  return {
    id: `resp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    blocks: resolved.blocks,
    suggestions: resolved.suggestions,
  };
}

/** Plain-text rendering of a response's blocks — used for Message.content (Copy, a11y fallback). */
export function deriveContent(blocks: ResponseBlock[]): string {
  return blocks
    .filter((b): b is Extract<ResponseBlock, { type: "text" }> => b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}

/** The symbol a response was primarily about, if any — feeds ChatContext for the next turn. */
export function extractPrimarySymbol(blocks: ResponseBlock[]): string | undefined {
  for (const block of blocks) {
    if (block.type === "stock") return block.stock.symbol;
    if (block.type === "company") return block.company.symbol;
    if (block.type === "stocks" && block.stocks.length > 0) return block.stocks[0].symbol;
  }
  return undefined;
}
