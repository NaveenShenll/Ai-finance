import * as React from "react"

import { cn } from "@/lib/utils"

export type MarketStatusState = "open" | "closed" | "pre-market" | "after-hours"

export interface MarketStatusProps extends React.ComponentProps<"span"> {
  status: MarketStatusState
}

const STATUS_CONFIG: Record<MarketStatusState, { label: string; className: string; dot: string }> = {
  open: {
    label: "Market open",
    className: "bg-positive-subtle text-positive",
    dot: "bg-positive",
  },
  closed: {
    label: "Market closed",
    className: "bg-neutral-subtle text-neutral",
    dot: "bg-neutral",
  },
  "pre-market": {
    label: "Pre-market",
    className: "bg-info-subtle text-info",
    dot: "bg-info",
  },
  "after-hours": {
    label: "After-hours",
    className: "bg-warning-subtle text-warning",
    dot: "bg-warning",
  },
}

/**
 * Compact indicator of current trading-session state.
 */
function MarketStatus({ status, className, ...props }: MarketStatusProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      data-slot="market-status"
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
      {...props}
    >
      <span className={cn("size-1.5 rounded-full", config.dot, status === "open" && "animate-pulse")} />
      {config.label}
    </span>
  )
}

export { MarketStatus }
