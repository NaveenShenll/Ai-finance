"use client"

import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Message } from "@/types/chat"
import { UserMessage } from "./user-message"
import { AIMessage } from "./ai-message"
import { AIResponseLoading } from "./ai-response-loading"
import { SourceCitation } from "./source-citation"
import { PromptSuggestionCard } from "./prompt-suggestion-card"
import { MessageActions } from "./message-actions"
import { ResponseBlockRenderer } from "./response-block-renderer"
import { AnswerTransparency } from "@/components/ai/answer-transparency"

export interface MessageListProps {
  messages: Message[]
  isResponding?: boolean
  error?: string | null
  onRetry?: () => void
  onRegenerate?: () => void
  onSelectSuggestion?: (label: string) => void
  className?: string
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

/**
 * Scrollable message history. Auto-scrolls to the latest message unless the
 * viewer has manually scrolled up to read earlier content.
 */
function MessageList({
  messages,
  isResponding,
  error,
  onRetry,
  onRegenerate,
  onSelectSuggestion,
  className,
}: MessageListProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = React.useRef(true)

  React.useEffect(() => {
    if (shouldAutoScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages.length, isResponding, error])

  const handleScroll = () => {
    const el = containerRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    shouldAutoScrollRef.current = distanceFromBottom < 120
  }

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant")
  const lastMessage = messages[messages.length - 1]
  const isAwaitingReply = Boolean(isResponding && lastMessage?.role === "user")

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      data-slot="message-list"
      className={cn("flex flex-col gap-5 overflow-y-auto px-4 py-6", className)}
    >
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessage key={message.id} content={message.content} timestamp={formatTime(message.timestamp)} />
        ) : (
          <AIMessage
            key={message.id}
            content={message.content}
            timestamp={formatTime(message.timestamp)}
            actions={
              <MessageActions
                content={message.content}
                onRegenerate={message.id === lastAssistantMessage?.id ? onRegenerate : undefined}
                regenerateDisabled={isResponding}
              />
            }
            blocks={
              // `undefined` means "plain text reply"; `[]` means "tried to
              // build a structured response but had no data" — both are
              // meaningfully different, so check presence, not length.
              message.blocks ? <ResponseBlockRenderer blocks={message.blocks} /> : undefined
            }
            transparency={
              <AnswerTransparency
                question={[...messages.slice(0, index)].reverse().find((m) => m.role === "user")?.content}
                contextMessageCount={index}
              />
            }
            sources={
              // Blocks-bearing messages carry their own "sources" block instead.
              !message.blocks && message.sources && message.sources.length > 0 ? (
                <>
                  {message.sources.map((source, i) => (
                    <SourceCitation
                      key={source.id}
                      index={i + 1}
                      title={source.title}
                      sourceName={source.sourceName}
                      href={source.url}
                    />
                  ))}
                </>
              ) : undefined
            }
            suggestions={
              message.id === lastAssistantMessage?.id &&
              message.suggestions &&
              message.suggestions.length > 0 &&
              !isResponding ? (
                <>
                  {message.suggestions.map((suggestion) => (
                    <PromptSuggestionCard
                      key={suggestion}
                      label={suggestion}
                      truncateLabel={false}
                      onClick={() => onSelectSuggestion?.(suggestion)}
                    />
                  ))}
                </>
              ) : undefined
            }
          />
        )
      )}

      {isAwaitingReply && <AIResponseLoading key={lastMessage?.id} question={lastMessage?.content} />}

      {error && (
        <div className="flex items-start gap-3">
          <Avatar className="mt-0.5 shrink-0">
            <AvatarFallback className="bg-ai-subtle text-ai">
              <SparklesIcon className="size-3.5" />
            </AvatarFallback>
          </Avatar>
          <div
            role="alert"
            className="flex flex-1 flex-col items-start gap-2 rounded-card rounded-tl-sm border border-error-subtle bg-error-subtle/60 px-4 py-3 text-sm text-error"
          >
            <p>{error}</p>
            {onRetry && (
              <Button type="button" variant="destructive" size="sm" onClick={onRetry}>
                Try again
              </Button>
            )}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export { MessageList }
