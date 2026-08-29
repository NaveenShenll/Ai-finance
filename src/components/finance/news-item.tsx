import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface NewsItemProps extends React.ComponentProps<"a"> {
  source: string
  headline: string
  timestamp: string
  category?: string
}

/**
 * Single row in a news/headlines feed: source, headline, relative timestamp,
 * and an optional category tag.
 */
function NewsItem({
  source,
  headline,
  timestamp,
  category,
  className,
  href = "#",
  ...props
}: NewsItemProps) {
  return (
    <a
      data-slot="news-item"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex flex-col gap-1 rounded-input px-2.5 py-2 transition-colors hover:bg-muted",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-caption">
        <span className="font-medium text-text-secondary">{source}</span>
        <span aria-hidden>·</span>
        <span>{timestamp}</span>
        {category && (
          <Badge variant="outline" className="ml-auto">
            {category}
          </Badge>
        )}
      </div>
      <p className="text-sm leading-snug font-medium text-foreground">{headline}</p>
    </a>
  )
}

export { NewsItem }
