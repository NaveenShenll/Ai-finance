export const APP_CONFIG = {
  name: "Finance AI Chat",
  description: "Advanced financial intelligence and trading assistant chat.",
  defaultModel: "anthropic/claude-3.5-sonnet",
  supportedModels: [
    {
      id: "anthropic/claude-3.5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      description: "Best for complex reasoning, financial analysis, and coding."
    },
    {
      id: "google/gemini-2.5-pro",
      name: "Gemini 2.5 Pro",
      provider: "Google",
      description: "High quality text and multi-modal reasoning."
    },
    {
      id: "openai/gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Fast, versatile, and high-performance model."
    }
  ]
};

export const DEFAULT_TICKERS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA"];

export const SYSTEM_PROMPTS = {
  financeAssistant: `You are a professional financial analyst and trading assistant. 
Provide accurate, detailed, and data-driven financial insights. 
When appropriate, format financial data in clean Markdown tables and suggest tickers. 
Always include a clear disclaimer stating that your insights are for informational purposes only and do not constitute financial advice.`
};

export const TIME_FRAMES = {
  "1D": "1 Day",
  "1W": "1 Week",
  "1M": "1 Month",
  "3M": "3 Months",
  "1Y": "1 Year",
  "5Y": "5 Years"
} as const;
