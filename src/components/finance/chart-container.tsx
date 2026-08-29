import * as React from "react"
import { LineChartIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  title: string
  subtitle?: string
  ranges?: string[]
  activeRange?: string
  onRangeChange?: (range: string) => void
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  /** Chart area content — plug in a charting library here. Falls back to a placeholder. */
  children?: React.ReactNode
}

/**
 * Layout shell for a price/metric chart: header, time-range selector, and a
 * chart area with loading/empty/error states. Does not fetch chart data.
 */
function ChartContainer({
  title,
  subtitle,
  ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"],
  activeRange,
  onRangeChange,
  loading = false,
  error,
  onRetry,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <Card className={cn("gap-4 p-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-h4">{title}</h3>
          {subtitle && <p className="text-body-sm">{subtitle}</p>}
        </div>

        {ranges.length > 0 && (
          <div
            role="tablist"
            aria-label="Time range"
            className="flex items-center gap-0.5 rounded-control bg-muted p-0.5"
          >
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                role="tab"
                aria-selected={range === activeRange}
                onClick={() => onRangeChange?.(range)}
                disabled={loading}
                className={cn(
                  "rounded-[calc(var(--radius-control)-2px)] px-2 py-1 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                  range === activeRange
                    ? "bg-surface text-foreground shadow-subtle"
                    : "text-text-secondary hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chart area */}
      <div
        className={cn(
          "relative flex h-56 w-full items-center justify-center overflow-hidden rounded-input border bg-background/50 p-3",
          children && !loading && !error ? "border-border" : "border-dashed border-border"
        )}
      >
        {loading ? (
          <Skeleton className="h-full w-full rounded-input" />
        ) : error ? (
          <div className="flex flex-col items-center gap-2 text-center text-error">
            <span className="text-sm font-medium">{error}</span>
            {onRetry && (
              <Button type="button" variant="destructive" size="sm" onClick={onRetry}>
                Try again
              </Button>
            )}
          </div>
        ) : (
          (children ?? (
            <div className="flex flex-col items-center gap-2 text-text-muted">
              <LineChartIcon className="size-6" />
              <span className="text-caption">Chart data not connected</span>
            </div>
          ))
        )}
      </div>

      {/* Tooltip area — chart implementations render their hover tooltip here */}
      <div data-slot="chart-tooltip-area" className="min-h-4" />
    </Card>
  )
}

export { ChartContainer }
