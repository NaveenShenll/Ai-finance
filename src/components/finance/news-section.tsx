import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import type { NewsArticle } from "@/types/finance"
import { NewsItem } from "./news-item"

export interface NewsSectionProps extends React.ComponentProps<"div"> {
  title?: string
  news: NewsArticle[]
  /** Symbol(s) this response is about — picks the most relevant category badge per article. */
  focusSymbols?: string[]
}

function formatRelativeTime(iso: string) {
  const hours = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 3600000))
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`
}

/**
 * Grouped list of related news for a finance AI response. Wraps the
 * existing NewsItem atom rather than re-implementing a news row.
 */
function NewsSection({ title = "Related news", news, focusSymbols, className, ...props }: NewsSectionProps) {
  return (
    <Card className={cn("gap-2 p-3", className)} {...props}>
      <h3 className="text-h4 px-1 pt-1">{title}</h3>
      {news.length === 0 ? (
        <p className="text-caption px-1 pb-1">No related news available</p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {news.map((article) => {
            const category =
              article.relatedSymbols.find((s) => focusSymbols?.includes(s)) ?? article.relatedSymbols[0]
            return (
              <NewsItem
                key={article.id}
                source={article.source}
                headline={article.title}
                timestamp={formatRelativeTime(article.timePublished)}
                category={category}
                href={article.url}
              />
            )
          })}
        </div>
      )}
    </Card>
  )
}

export { NewsSection }
