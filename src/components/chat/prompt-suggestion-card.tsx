import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface PromptSuggestionCardProps extends React.ComponentProps<"button"> {
  label: string
  description?: string
  icon?: React.ReactNode
  /** Set to `false` to let the label wrap instead of truncating with an ellipsis. */
  truncateLabel?: boolean
}

/**
 * Clickable suggestion for a next prompt/question, used both as an empty-state
 * "starter" grid and as follow-up suggestions under an AI response.
 */
function PromptSuggestionCard({
  label,
  description,
  icon,
  truncateLabel = true,
  className,
  ...props
}: PromptSuggestionCardProps) {
  return (
    <button
      type="button"
      data-slot="prompt-suggestion-card"
      className={cn(
        "group/suggestion flex w-full items-center gap-2.5 rounded-input border border-border bg-surface px-3 py-2 text-left text-sm text-foreground transition-all hover:border-border-strong hover:bg-primary-subtle/40 hover:shadow-subtle",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-primary">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className={cn("block font-medium", truncateLabel ? "truncate" : "text-pretty")}>{label}</span>
        {description && (
          <span className="text-body-sm block truncate">{description}</span>
        )}
      </span>
      <ArrowUpRightIcon className="size-3.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover/suggestion:opacity-100" />
    </button>
  )
}

export { PromptSuggestionCard }
