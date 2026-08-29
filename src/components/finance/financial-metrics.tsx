import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import type { FinancialMetricData } from "@/types/finance"
import { FinancialMetric } from "./financial-metric"

export interface FinancialMetricsProps extends React.ComponentProps<"div"> {
  title?: string
  metrics: FinancialMetricData[]
}

/**
 * Responsive grid of FinancialMetric entries — 4 columns on desktop,
 * 2 on mobile, per the design system's data-density rules.
 */
function FinancialMetrics({ title, metrics, className, ...props }: FinancialMetricsProps) {
  return (
    <Card className={cn("gap-3 p-4", className)} {...props}>
      {title && <h3 className="text-h4">{title}</h3>}
      {metrics.length === 0 ? (
        <p className="text-caption">No financial data available</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
          {metrics.map((metric) => (
            <FinancialMetric key={metric.label} {...metric} />
          ))}
        </div>
      )}
    </Card>
  )
}

export { FinancialMetrics }
