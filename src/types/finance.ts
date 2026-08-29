export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  currency?: string;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  marketCap: number;
  peRatio?: number;
  dividendYield?: number;
  eps?: number;
  revenue?: number;
  week52High?: number;
  week52Low?: number;
  timestamp: string;
}

/**
 * Minimal quote shape StockCard actually needs. Deliberately not aliased to
 * StockQuote (which requires high/low/open/volume/marketCap/timestamp) —
 * every StockQuote already satisfies this structurally, so MOCK_STOCKS
 * entries pass straight through with no cast.
 */
export interface Stock {
  symbol: string;
  name: string;
  exchange?: string;
  price: number;
  currency?: string;
  change: number;
  changePercent: number;
}

export interface FinancialMetricData {
  label: string;
  value: string;
  description?: string;
  change?: string;
  changeTone?: 'positive' | 'negative' | 'neutral';
}

/**
 * Named `...Data` (not `CompanyOverview`) to avoid colliding with the
 * `CompanyOverview` component, which is imported alongside it.
 */
export interface CompanyOverviewData {
  symbol: string;
  name: string;
  description: string;
  sector?: string;
  industry?: string;
  headquarters?: string;
  founded?: string;
  employees?: string;
  website?: string;
}

export interface HistoricalPrice {
  date: string;
  close: number;
  volume?: number;
}

export interface StockHistory {
  symbol: string;
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';
  dataPoints: HistoricalPrice[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  timePublished: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  relatedSymbols: string[];
  imageUrl?: string;
}
