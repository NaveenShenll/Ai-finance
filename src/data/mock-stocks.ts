import { StockQuote, StockHistory } from "@/types/finance";

export const MOCK_STOCKS: Record<string, StockQuote> = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.52,
    change: 1.43,
    changePercent: 0.79,
    high: 183.92,
    low: 180.88,
    open: 181.10,
    volume: 52431200,
    marketCap: 2850000000000,
    peRatio: 29.4,
    dividendYield: 0.53,
    eps: 6.30,
    revenue: 391000000000,
    week52High: 199.62,
    week52Low: 164.08,
    timestamp: new Date().toISOString()
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 415.50,
    change: -2.10,
    changePercent: -0.50,
    high: 418.20,
    low: 413.80,
    open: 417.00,
    volume: 22894500,
    marketCap: 3090000000000,
    peRatio: 35.8,
    dividendYield: 0.72,
    eps: 11.80,
    revenue: 245000000000,
    week52High: 468.35,
    week52Low: 385.58,
    timestamp: new Date().toISOString()
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 153.25,
    change: 1.85,
    changePercent: 1.22,
    high: 154.10,
    low: 151.30,
    open: 151.80,
    volume: 28940100,
    marketCap: 1910000000000,
    peRatio: 25.6,
    dividendYield: 0.52,
    eps: 6.04,
    revenue: 328000000000,
    week52High: 167.20,
    week52Low: 130.67,
    timestamp: new Date().toISOString()
  },
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 127.85,
    change: 4.35,
    changePercent: 3.52,
    high: 128.50,
    low: 123.10,
    open: 123.50,
    volume: 184502100,
    marketCap: 3150000000000,
    peRatio: 68.2,
    dividendYield: 0.03,
    eps: 1.87,
    revenue: 130500000000,
    week52High: 140.76,
    week52Low: 86.62,
    timestamp: new Date().toISOString()
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 175.34,
    change: -5.46,
    changePercent: -3.02,
    high: 182.10,
    low: 174.00,
    open: 181.50,
    volume: 85203400,
    marketCap: 558000000000,
    peRatio: 45.3,
    dividendYield: 0,
    eps: 3.65,
    revenue: 97200000000,
    week52High: 278.98,
    week52Low: 138.80,
    timestamp: new Date().toISOString()
  },
  AMZN: {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.15,
    change: 0.95,
    changePercent: 0.54,
    high: 179.43,
    low: 176.80,
    open: 177.20,
    volume: 38450100,
    marketCap: 1850000000000,
    peRatio: 41.2,
    dividendYield: 0,
    eps: 4.16,
    revenue: 620000000000,
    week52High: 201.20,
    week52Low: 151.61,
    timestamp: new Date().toISOString()
  }
};

// Generates a mock history for a ticker and timeframe
export function generateMockHistory(symbol: string, timeframe: StockHistory['timeframe']): StockHistory {
  const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90;
  const basePrice = MOCK_STOCKS[symbol]?.price || 150;
  const dataPoints = [];

  const now = new Date();
  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    if (timeframe === '1D') {
      date.setHours(now.getHours() - i);
    } else {
      date.setDate(now.getDate() - i);
    }

    // Add some random walk variance
    const variance = (Math.random() - 0.48) * (basePrice * 0.015);
    const dayPrice = Math.max(1, parseFloat((basePrice + variance).toFixed(2)));

    dataPoints.push({
      date: date.toISOString(),
      close: dayPrice,
      volume: Math.floor(Math.random() * 5000000) + 100000
    });
  }

  return {
    symbol,
    timeframe,
    dataPoints
  };
}
