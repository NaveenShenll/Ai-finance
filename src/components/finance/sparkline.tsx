import * as React from "react"

import { cn } from "@/lib/utils"

export interface SparklineProps extends React.ComponentProps<"svg"> {
  /** Ordered series of values to plot. Purely presentational — pass whatever data you have. */
  data: number[]
  tone?: "positive" | "negative" | "neutral"
  width?: number
  height?: number
}

/**
 * Minimal inline trend line for compact contexts (stock cards, tables).
 * Not a charting library — for a full interactive chart use ChartContainer.
 */
function Sparkline({
  data,
  tone = "neutral",
  width = 72,
  height = 28,
  className,
  ...props
}: SparklineProps) {
  const toneClass = {
    positive: "stroke-positive",
    negative: "stroke-negative",
    neutral: "stroke-neutral",
  }[tone]

  if (data.length < 2) {
    return (
      <svg
        width={width}
        height={height}
        className={cn("overflow-visible", className)}
        aria-hidden
        {...props}
      />
    )
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  return (
    <svg
      data-slot="sparkline"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={`Trend sparkline, ${tone}`}
      {...props}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={toneClass}
      />
    </svg>
  )
}

export { Sparkline }
