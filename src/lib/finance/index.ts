import { StockQuote, StockHistory, NewsArticle, CompanyOverviewData } from "@/types/finance";
import { MOCK_STOCKS, generateMockHistory } from "@/data/mock-stocks";
import { MOCK_NEWS } from "@/data/mock-news";
import { MOCK_COMPANY_OVERVIEWS } from "@/data/mock-finance-data";

/**
 * Service for fetching market data and stock information.
 * In a production build, these methods should either fetch from a financial API endpoint
 * (e.g. Yahoo Finance, Alpha Vantage, Polygon.io) on the server-side, or call a Next.js API route.
 */
export class FinanceService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.FINANCIAL_API_KEY || "";
  }

  /**
   * Fetches the current stock quote for a specific ticker symbol.
   */
  async getStockQuote(symbol: string): Promise<StockQuote | null> {
    const cleanSymbol = symbol.toUpperCase().trim();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockStock = MOCK_STOCKS[cleanSymbol];
    if (!mockStock) return null;

    // Return mock data for now, keeping API format in place
    return {
      ...mockStock,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Fetches historical price chart data points for a ticker symbol.
   */
  async getStockHistory(symbol: string, timeframe: StockHistory['timeframe'] = '1M'): Promise<StockHistory | null> {
    const cleanSymbol = symbol.toUpperCase().trim();
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!MOCK_STOCKS[cleanSymbol]) return null;
    
    return generateMockHistory(cleanSymbol, timeframe);
  }

  /**
   * Fetches basic company profile information for a ticker symbol.
   */
  async getCompanyOverview(symbol: string): Promise<CompanyOverviewData | null> {
    const cleanSymbol = symbol.toUpperCase().trim();

    await new Promise(resolve => setTimeout(resolve, 300));

    return MOCK_COMPANY_OVERVIEWS[cleanSymbol] ?? null;
  }

  /**
   * Fetches the latest financial news articles, optionally filtered by tickers.
   */
  async getMarketNews(symbols?: string[]): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!symbols || symbols.length === 0) {
      return MOCK_NEWS;
    }

    const cleanSymbols = symbols.map(s => s.toUpperCase().trim());
    return MOCK_NEWS.filter(article => 
      article.relatedSymbols.some(symbol => cleanSymbols.includes(symbol))
    );
  }
}

export const financeService = new FinanceService();
