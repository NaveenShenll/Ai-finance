import { ChatSession } from "@/types/chat";

export const MOCK_CHATS: ChatSession[] = [
  {
    id: "session-1",
    title: "Nvidia Q3 Earnings Analysis",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Can you summarize Nvidia's latest Q3 earnings reports and stock reaction?",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "NVIDIA (NVDA) reported outstanding Q3 results, beating revenue and EPS expectations. Revenue rose 94% year-over-year to $35.1 billion, driven by surging demand for Hopper and Blackwell AI architectures. Net income grew to $19.3 billion. Despite the beat, the stock experienced a mild 2-3% drop in after-hours trading due to exceptionally high market expectations and supply constraints for Blackwell chips.",
        timestamp: new Date(Date.now() - 3600000 * 23.9).toISOString(),
        sources: [
          {
            id: "src-nvda-1",
            title: "NVIDIA Announces Financial Results for Third Quarter Fiscal 2025",
            url: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2025",
            sourceName: "NVIDIA Investor Relations",
            publishDate: "2025-11-20"
          },
          {
            id: "src-nvda-2",
            title: "NVDA Earnings: Nvidia beats expectations, revenue grows 94%",
            url: "https://finance.yahoo.com/news/nvda-earnings-nvidia-beats-expectations-212015096.html",
            sourceName: "Yahoo Finance",
            publishDate: "2025-11-20"
          }
        ],
        suggestions: [
          "What is the guidance for Blackwell revenue next quarter?",
          "How did NVDA's data center division perform specifically?",
          "Show me NVDA's gross margins trend."
        ]
      }
    ]
  },
  {
    id: "session-2",
    title: "Portfolio Diversification Ideas",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 3600000 * 47).toISOString(),
    messages: [
      {
        id: "msg-3",
        role: "user",
        content: "I have 80% of my portfolio in tech stocks. How can I diversify into other sectors?",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "Having 80% in technology leaves your portfolio highly sensitive to sector-specific drawdowns and interest rate cycles. To diversify, you might consider allocating to:\n\n1. **Healthcare (XLV)**: Defensive growth, driven by aging demographics.\n2. **Financials (XLF)**: Tends to perform well in higher-interest environments.\n3. **Consumer Staples (XLP)**: Defensive sector that maintains demand during recessions.\n4. **Energy (XLE) / Industrials (XLI)**: Good hedges for physical asset inflation.\n\nA typical balanced allocation might reduce tech to 25-30% and distribute the rest among these sectors and fixed income.",
        timestamp: new Date(Date.now() - 3600000 * 47.9).toISOString(),
        suggestions: [
          "Compare XLK vs XLV performance over 5 years",
          "What are the top holdings in consumer staples ETFs?",
          "How does fixed income fit into a high-inflation portfolio?"
        ]
      }
    ]
  }
];
