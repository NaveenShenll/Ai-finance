"use client";

import { useState, useCallback } from "react";
import { StockQuote, StockHistory, NewsArticle } from "@/types/finance";
import { financeService } from "@/lib/finance";

export function useFinance() {
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [history, setHistory] = useState<StockHistory | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch quote for a specific ticker symbol.
   */
  const fetchQuote = useCallback(async (symbol: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await financeService.getStockQuote(symbol);
      setQuote(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch quote for ${symbol}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch historical price points for charts.
   */
  const fetchHistory = useCallback(async (symbol: string, timeframe: StockHistory['timeframe']) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await financeService.getStockHistory(symbol, timeframe);
      setHistory(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch history for ${symbol}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch news filtered by symbol list.
   */
  const fetchNews = useCallback(async (symbols?: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await financeService.getMarketNews(symbols);
      setNews(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market news");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    quote,
    history,
    news,
    isLoading,
    error,
    fetchQuote,
    fetchHistory,
    fetchNews
  };
}
