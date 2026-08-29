import * as React from "react"

import { NewChatAction } from "./new-chat-action"
import { ChatHistorySection } from "./chat-history-section"
import { WatchlistSection } from "./watchlist-section"
import type { ChatHistoryItem, WatchlistItemData } from "./types"

export interface AppNavContentProps {
  chats?: ChatHistoryItem[]
  activeChatId?: string
  watchlist?: WatchlistItemData[]
  activeSymbol?: string
  onNewChat?: () => void
  newChatHref?: string
}

/**
 * The sidebar's nav body (new-chat action + chat history + watchlist),
 * shared verbatim between the desktop rail and the mobile drawer.
 */
function AppNavContent({
  chats,
  activeChatId,
  watchlist,
  activeSymbol,
  onNewChat,
  newChatHref,
}: AppNavContentProps) {
  return (
    <div data-slot="app-nav-content" className="flex flex-col gap-1">
      <NewChatAction onClick={onNewChat} href={newChatHref} />
      <ChatHistorySection chats={chats} activeChatId={activeChatId} />
      <WatchlistSection items={watchlist} activeSymbol={activeSymbol} />
    </div>
  )
}

export { AppNavContent }
