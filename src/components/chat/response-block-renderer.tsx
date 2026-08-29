"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { generateMockHistory } from "@/data/mock-stocks"
import type { StockHistory } from "@/types/finance"
import type { ChartBlock, ResponseBlock } from "@/types/chat"
import {
  StockCard,
  FinancialMetrics,
  ChartContainer,
  PriceChart,
  CompanyOverview,
  NewsSection,
} from "@/components/finance"
import { SourceCitation } from "./source-citation"

export interface ResponseBlockRendererProps {
  blocks: ResponseBlock[]
  className?: string
}

/**
 * Maps structured AI response blocks to their finance UI components.
 * AIMessage never has to know these types exist — this is the only place
 * that does.
 */
function ResponseBlockRenderer({ blocks, className }: ResponseBlockRendererProps) {
  if (blocks.length === 0) {
    return <p className="text-caption">No financial data available</p>
  }

  return (
    <div data-slot="response-blocks" className={cn("flex flex-col gap-3", className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            // Message.content is derived from the response's TextBlock(s) and
            // already renders in AIMessage's bubble — re-rendering the first
            // one here would duplicate it. A text block past index 0 (not
            // currently produced by the mock data, but supported) still renders.
            if (index === 0) return null
            return (
              <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                {block.text}
              </p>
            )

          case "stock":
            return <StockCard key={index} stock={block.stock} interactive />

          case "stocks":
            return (
              <div key={index} className="grid gap-3 sm:grid-cols-2">
                {block.stocks.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} interactive />
                ))}
              </div>
            )

          case "metrics":
            return <FinancialMetrics key={index} title={block.title} metrics={block.metrics} />

          case "chart":
            return <ChartBlockView key={index} block={block} />

          case "company":
            return <CompanyOverview key={index} company={block.company} />

          case "news":
            return <NewsSection key={index} news={block.news} focusSymbols={block.symbols} />

          case "sources":
            return (
              <div key={index} className="flex flex-col gap-1.5">
                <p className="text-label">Sources</p>
                <div className="flex flex-wrap gap-1.5">
                  {block.sources.length === 0 ? (
                    <p className="text-caption">No sources available</p>
                  ) : (
                    block.sources.map((source, i) => (
                      <SourceCitation
                        key={source.id}
                        index={i + 1}
                        title={source.title}
                        sourceName={source.sourceName}
                        href={source.url}
                      />
                    ))
                  )}
                </div>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

const RANGES: StockHistory["timeframe"][] = ["1D", "1W", "1M", "3M", "1Y", "5Y"]

/** Chart block with working (mock) time-range switching, generated locally. */
function ChartBlockView({ block }: { block: ChartBlock }) {
  const [range, setRange] = React.useState<StockHistory["timeframe"]>("3M")

  const data = React.useMemo(() => {
    if (!block.symbol) return block.data
    return generateMockHistory(block.symbol, range).dataPoints
  }, [block.symbol, block.data, range])

  return (
    <ChartContainer
      title={block.title}
      subtitle={block.subtitle}
      ranges={block.symbol ? RANGES : []}
      activeRange={range}
      onRangeChange={(r) => setRange(r as StockHistory["timeframe"])}
    >
      <PriceChart data={data} />
    </ChartContainer>
  )
}

export { ResponseBlockRenderer }
