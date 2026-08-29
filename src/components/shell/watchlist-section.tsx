import * as React from "react"
import { StarIcon } from "lucide-react"

import { NavItem } from "@/components/ui/nav-item"
import type { WatchlistItemData } from "./types"

export interface WatchlistSectionProps {
  items?: WatchlistItemData[]
  activeSymbol?: string
}

/**
 * List of tracked tickers in the sidebar. Renders an empty state until real
 * watchlist data is wired up — never seeded with mock tickers here.
 */
function WatchlistSection({ items = [], activeSymbol }: WatchlistSectionProps) {
  return (
    <div data-slot="watchlist-section" className="flex flex-col gap-0.5">
      <p className="text-label px-2.5 pt-3 pb-1">Watchlist</p>

      {items.length === 0 ? (
        <p className="text-caption px-2.5 py-1.5">No tickers added yet</p>
      ) : (
        items.map((item) => (
          <NavItem
            key={item.symbol}
            href={item.href ?? `/stocks/${item.symbol}`}
            active={item.symbol === activeSymbol}
            icon={<StarIcon className="size-4" />}
          >
            {item.symbol}
            {item.name && <span className="ml-1.5 text-text-muted">{item.name}</span>}
          </NavItem>
        ))
      )}
    </div>
  )
}

export { WatchlistSection }
