import * as React from "react"
import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FinancialMetricProps extends React.ComponentProps<"div"> {
  label: string
  value: string
  /** Signed delta shown next to the value, e.g. "+2.4%" or "-$1.2B". Sign determines tone. */
  change?: string
  changeTone?: "positive" | "negative" | "neutral"
  description?: string
}

/**
 * Label/value pair for a single financial data point (P/E, market cap,
 * volume, revenue, etc), with an optional signed change indicator.
 */
function FinancialMetric({
  label,
  value,
  change,
  changeTone = "neutral",
  description,
  className,
  ...props
}: FinancialMetricProps) {
  const Icon =
    changeTone === "positive"
      ? ArrowUpRightIcon
      : changeTone === "negative"
        ? ArrowDownRightIcon
        : MinusIcon

  return (
    <div data-slot="financial-metric" className={cn("flex flex-col gap-1", className)} {...props}>
      <span className="text-label">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-financial text-xl">{value}</span>
        {change && (
          <span
            className={cn(
              "text-financial inline-flex items-center gap-0.5 text-xs",
              changeTone === "positive" && "text-positive",
              changeTone === "negative" && "text-negative",
              changeTone === "neutral" && "text-neutral"
            )}
          >
            <Icon className="size-3" />
            {change}
          </span>
        )}
      </div>
      {description && <p className="text-caption">{description}</p>}
    </div>
  )
}

export { FinancialMetric }
