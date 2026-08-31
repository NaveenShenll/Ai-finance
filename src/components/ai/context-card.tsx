import * as React from "react"

import { cn } from "@/lib/utils"

export interface ContextCardProps extends React.ComponentProps<"div"> {
  icon: React.ReactNode
  title: string
  description: string
  /** Small trailing fact, e.g. "3 messages" — must reflect real data. */
  meta?: string
}

/**
 * Compact summary of one real source of context the AI used to answer —
 * e.g. the conversation itself. Only ever rendered with data the
 * application actually has; never a stand-in for a source that wasn't used.
 */
function ContextCard({ icon, title, description, meta, className, ...props }: ContextCardProps) {
  return (
    <div
      data-slot="context-card"
      className={cn("flex flex-col gap-1 rounded-input border border-border bg-surface px-3 py-2.5", className)}
      {...props}
    >
      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <span className="text-text-muted">{icon}</span>
        {title}
      </div>
      <p className="text-caption">{description}</p>
      {meta && <span className="text-caption font-medium text-text-secondary">{meta}</span>}
    </div>
  )
}

export { ContextCard }
