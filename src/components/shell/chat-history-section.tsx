import * as React from "react"
import { MessageSquareIcon } from "lucide-react"

import { NavItem } from "@/components/ui/nav-item"
import type { ChatHistoryItem } from "./types"

export interface ChatHistorySectionProps {
  chats?: ChatHistoryItem[]
  activeChatId?: string
}

/**
 * List of recent conversations in the sidebar. Renders an empty state until
 * real chat data is wired up — never seeded with mock content here.
 */
function ChatHistorySection({ chats = [], activeChatId }: ChatHistorySectionProps) {
  return (
    <div data-slot="chat-history-section" className="flex flex-col gap-0.5">
      <p className="text-label px-2.5 pt-3 pb-1">Chats</p>

      {chats.length === 0 ? (
        <p className="text-caption px-2.5 py-1.5">No conversations yet</p>
      ) : (
        chats.map((chat) => (
          <NavItem
            key={chat.id}
            href={chat.href ?? `/chat/${chat.id}`}
            active={chat.id === activeChatId}
            icon={<MessageSquareIcon className="size-4" />}
          >
            {chat.title}
          </NavItem>
        ))
      )}
    </div>
  )
}

export { ChatHistorySection }
