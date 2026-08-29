import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ReasoningIndicatorProps extends React.ComponentProps<"div"> {
  /** Text shown next to the animated dots, e.g. "Researching markets…" */
  label?: string
}

/**
 * Loading affordance shown while the AI is thinking/retrieving data,
 * before any streamed content has arrived.
 */
function ReasoningIndicator({
  label = "Thinking",
  className,
  ...props
}: ReasoningIndicatorProps) {
  return (
    <div
      data-slot="reasoning-indicator"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-ai-subtle py-1.5 pr-3 pl-2 text-sm text-ai",
        className
      )}
      {...props}
    >
      <SparklesIcon className="size-3.5 animate-pulse" />
      <span>{label}</span>
      <span className="flex items-center gap-0.5">
        <span className="size-1 animate-bounce rounded-full bg-ai [animation-delay:-0.3s]" />
        <span className="size-1 animate-bounce rounded-full bg-ai [animation-delay:-0.15s]" />
        <span className="size-1 animate-bounce rounded-full bg-ai" />
      </span>
    </div>
  )
}

export { ReasoningIndicator }
