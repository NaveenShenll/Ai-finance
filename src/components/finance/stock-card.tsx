import * as React from "react"
import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Stock } from "@/types/finance"
import { Sparkline } from "./sparkline"

export interface StockCardProps extends React.ComponentProps<"div"> {
  stock: Stock
  /** Optional recent price series for the mini trend chart. */
  history?: number[]
  interactive?: boolean
}

/**
 * Compact quote summary: symbol, company name, price, change, and an
 * optional mini trend line. The atomic building block for watchlists,
 * search results, finance AI responses, and inline ticker mentions.
 */
function StockCard({ stock, history, interactive = false, className, ...props }: StockCardProps) {
  const { symbol, name, price, change, changePercent, currency = "USD" } = stock
  const tone = change > 0 ? "positive" : change < 0 ? "negative" : "neutral"
  const Icon = change > 0 ? ArrowUpRightIcon : change < 0 ? ArrowDownRightIcon : MinusIcon

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  return (
    <Card
      interactive={interactive}
      className={cn("gap-3 p-4", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar size="sm" className="shrink-0">
            <AvatarFallback className="bg-primary-subtle text-xs font-semibold text-primary">
              {symbol.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-heading truncate text-sm font-semibold text-foreground">
              {symbol}
            </p>
            <p className="text-body-sm truncate">{name}</p>
          </div>
        </div>
        {history && history.length > 1 && (
          <Sparkline data={history} tone={tone} className="shrink-0" />
        )}
      </div>

      <div className="flex items-end justify-between gap-3">
        {/* Level 2 in the response hierarchy: the stock's price is the single
            most prominent number in a finance response, so it must read
            larger than any FinancialMetric value (text-xl). */}
        <span className="text-financial text-2xl">{formattedPrice}</span>
        <span
          className={cn(
            "text-financial inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs",
            tone === "positive" && "bg-positive-subtle text-positive",
            tone === "negative" && "bg-negative-subtle text-negative",
            tone === "neutral" && "bg-neutral-subtle text-neutral"
          )}
        >
          <Icon className="size-3" />
          {Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
        </span>
      </div>
    </Card>
  )
}

export { StockCard }
