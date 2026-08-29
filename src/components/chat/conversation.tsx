"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { Message } from "@/types/chat"
import { ChatComposer } from "./chat-composer"
import { MessageList } from "./message-list"

export interface ConversationProps {
  messages: Message[]
  input: string
  onInputChange: (value: string) => void
  onSubmit: (message: string) => void
  isSubmitting?: boolean
  isResponding?: boolean
  error?: string | null
  onRetry?: () => void
  onRegenerate?: () => void
  className?: string
}

/**
 * Active conversation: scrollable message history with a composer pinned
 * below it. Mounted once the first message exists — ChatHome is the
 * empty-state equivalent.
 */
function Conversation({
  messages,
  input,
  onInputChange,
  onSubmit,
  isSubmitting,
  isResponding,
  error,
  onRetry,
  onRegenerate,
  className,
}: ConversationProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const busy = Boolean(isSubmitting || isResponding)

  const handleSelectSuggestion = (label: string) => {
    onInputChange(label)
    textareaRef.current?.focus()
  }

  return (
    <div data-slot="conversation" className={cn("mx-auto flex h-full w-full max-w-3xl flex-col", className)}>
      <MessageList
        messages={messages}
        isResponding={isResponding}
        error={error}
        onRetry={onRetry}
        onRegenerate={onRegenerate}
        onSelectSuggestion={handleSelectSuggestion}
        className="flex-1"
      />

      <div className="px-4 pb-4">
        <ChatComposer
          ref={textareaRef}
          value={input}
          onValueChange={onInputChange}
          onSubmit={onSubmit}
          disabled={busy}
          loading={isResponding}
        />
      </div>
    </div>
  )
}

export { Conversation }
