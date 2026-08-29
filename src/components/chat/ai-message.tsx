import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export interface AIMessageProps extends React.ComponentProps<"div"> {
  content: string
  timestamp?: string
  /** Renders a blinking caret at the end of the content while tokens are still arriving. */
  isStreaming?: boolean
  /** Actions row (e.g. AIActionButton copy/regenerate) rendered below the content. */
  actions?: React.ReactNode
  /** Source citations rendered below the content. */
  sources?: React.ReactNode
  /** Prompt suggestion cards rendered below the content. */
  suggestions?: React.ReactNode
  /** Structured response content (e.g. from ResponseBlockRenderer), rendered below the text. */
  blocks?: React.ReactNode
}

/**
 * Left-aligned AI response bubble. Supports an in-progress streaming state,
 * plus optional citations/suggestions/block/action rows beneath the text.
 * Has no awareness of what `blocks` contains — that's ResponseBlockRenderer's job.
 */
function AIMessage({
  content,
  timestamp,
  isStreaming = false,
  actions,
  sources,
  suggestions,
  blocks,
  className,
  ...props
}: AIMessageProps) {
  return (
    <div
      data-slot="ai-message"
      className={cn("flex items-start gap-3", className)}
      {...props}
    >
      <Avatar className="mt-0.5 shrink-0">
        <AvatarFallback className="bg-ai-subtle text-ai">
          <SparklesIcon className="size-3.5" />
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-3",
          blocks ? "max-w-full" : "max-w-[85%] sm:max-w-[75%]"
        )}
      >
        <div className="rounded-card rounded-tl-sm border border-border bg-surface px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-foreground shadow-subtle">
          {content}
          {isStreaming && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-ai"
            />
          )}
        </div>

        {blocks}

        {sources && <div className="flex flex-wrap gap-1.5">{sources}</div>}
        {suggestions && <div className="flex flex-col gap-1.5">{suggestions}</div>}

        {(actions || timestamp) && (
          <div className="flex items-center gap-2">
            {actions}
            {timestamp && <span className="text-caption">{timestamp}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export { AIMessage }
