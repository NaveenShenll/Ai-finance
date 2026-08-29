import * as React from "react"
import { ExternalLinkIcon, GlobeIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SourceCitationProps extends React.ComponentProps<"a"> {
  index?: number
  title: string
  sourceName?: string
}

/**
 * A single citation referencing where AI-provided information came from.
 * Rendered inline as a small pill or stacked as a list.
 */
function SourceCitation({
  index,
  title,
  sourceName,
  className,
  href = "#",
  ...props
}: SourceCitationProps) {
  return (
    <a
      data-slot="source-citation"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/citation flex items-center gap-2 rounded-input border border-border bg-surface px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-foreground",
        className
      )}
      {...props}
    >
      {typeof index === "number" ? (
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-text-secondary group-hover/citation:bg-primary-subtle group-hover/citation:text-primary">
          {index}
        </span>
      ) : (
        <GlobeIcon className="size-3.5 shrink-0 text-text-muted" />
      )}
      <span className="max-w-48 truncate">{title}</span>
      {sourceName && (
        <span className="shrink-0 text-text-muted">· {sourceName}</span>
      )}
      <ExternalLinkIcon className="size-3 shrink-0 text-text-muted opacity-0 transition-opacity group-hover/citation:opacity-100" />
    </a>
  )
}

export { SourceCitation }
