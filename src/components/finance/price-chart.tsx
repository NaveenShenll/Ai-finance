import * as React from "react"

import { cn } from "@/lib/utils"
import type { HistoricalPrice } from "@/types/finance"

export interface PriceChartProps extends React.ComponentProps<"svg"> {
  data: HistoricalPrice[]
}

/**
 * Lightweight inline SVG area/line chart — the "real chart implementation"
 * slot inside ChartContainer, without pulling in a charting library.
 */
function PriceChart({ data, className, ...props }: PriceChartProps) {
  const width = 600
  const height = 200

  if (data.length < 2) return null

  const values = data.map((d) => d.close)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const tone = values[values.length - 1] >= values[0] ? "positive" : "negative"
  const strokeClass = tone === "positive" ? "stroke-positive" : "stroke-negative"
  const fillId = tone === "positive" ? "price-chart-positive" : "price-chart-negative"

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d.close - min) / range) * height
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ")
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <svg
      data-slot="price-chart"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-full w-full overflow-visible", className)}
      role="img"
      aria-label={`Price trend, ${tone}`}
      {...props}
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            className={tone === "positive" ? "text-positive" : "text-negative"}
            stopColor="currentColor"
            stopOpacity={0.18}
          />
          <stop
            offset="100%"
            className={tone === "positive" ? "text-positive" : "text-negative"}
            stopColor="currentColor"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${fillId})`} stroke="none" />
      <path d={linePath} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={strokeClass} />
    </svg>
  )
}

export { PriceChart }
