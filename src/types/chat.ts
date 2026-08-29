import type { CompanyOverviewData, FinancialMetricData, HistoricalPrice, NewsArticle, Stock } from './finance';

export interface Source {
  id: string;
  title: string;
  url: string;
  snippet?: string;
  sourceName?: string;
  publishDate?: string;
}

export type MessageStatus = 'sending' | 'streaming' | 'complete' | 'error';

/**
 * Structured pieces an AI response can be made of. `blocks` is always the
 * authoritative rendering for an assistant message; a message's plain-text
 * `content` is derived from the TextBlock(s) within it (for Copy/a11y), not
 * authored separately — see deriveContent() in mock-chat-responses.ts.
 */
export interface TextBlock {
  type: 'text';
  text: string;
}

export interface StockBlock {
  type: 'stock';
  stock: Stock;
}

export interface StockGroupBlock {
  type: 'stocks';
  stocks: Stock[];
}

export interface MetricsBlock {
  type: 'metrics';
  title?: string;
  metrics: FinancialMetricData[];
}

export interface ChartBlock {
  type: 'chart';
  title: string;
  subtitle?: string;
  symbol?: string;
  data: HistoricalPrice[];
}

export interface CompanyOverviewBlock {
  type: 'company';
  company: CompanyOverviewData;
}

export interface NewsBlock {
  type: 'news';
  news: NewsArticle[];
  /** Symbol(s) this response is about, used to pick the most relevant category badge per article. */
  symbols?: string[];
}

export interface SourcesBlock {
  type: 'sources';
  sources: Source[];
}

export type ResponseBlock =
  | TextBlock
  | StockBlock
  | StockGroupBlock
  | MetricsBlock
  | ChartBlock
  | CompanyOverviewBlock
  | NewsBlock
  | SourcesBlock;

/**
 * A resolved AI turn, as produced by the chat service (mock or, later, a
 * real one) — before it becomes a persisted `Message`. One response per
 * message in this app, so there's no separate `messageId`; `id` doubles as
 * the eventual message id.
 */
export interface AIResponse {
  id: string;
  blocks: ResponseBlock[];
  suggestions?: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  status?: MessageStatus;
  sources?: Source[];
  suggestions?: string[];
  /** Structured finance-response blocks. Renders via ResponseBlockRenderer when present. */
  blocks?: ResponseBlock[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

/** A prior turn, trimmed down for whatever backend the ChatService talks to. */
export interface ChatHistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Lightweight context passed alongside each new message. `lastSymbol` is
 * what the mock resolver uses to interpret shorthand follow-ups;
 * `history` is what a real AI backend (Phase 6) uses to preserve
 * conversational context — the mock resolver ignores it.
 */
export interface ChatContext {
  lastSymbol?: string;
  history?: ChatHistoryEntry[];
}
