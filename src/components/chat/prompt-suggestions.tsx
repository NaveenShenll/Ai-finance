import * as React from "react"

import { cn } from "@/lib/utils"
import { PromptSuggestionCard } from "./prompt-suggestion-card"

export interface PromptSuggestionItem {
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface PromptSuggestionsProps {
  items: PromptSuggestionItem[]
  /** Called with the prompt's label — populate the composer, don't submit. */
  onSelect: (label: string) => void
  className?: string
}

/**
 * Responsive grid of clickable starter prompts. Data-agnostic — the finance
 * example prompts live with the caller (ChatHome), not in here.
 */
function PromptSuggestions({ items, onSelect, className }: PromptSuggestionsProps) {
  return (
    <div
      data-slot="prompt-suggestions"
      className={cn("grid grid-cols-1 gap-2 sm:grid-cols-2", className)}
    >
      {items.map((item) => (
        <PromptSuggestionCard
          key={item.label}
          label={item.label}
          description={item.description}
          icon={item.icon}
          truncateLabel={false}
          onClick={() => onSelect(item.label)}
        />
      ))}
    </div>
  )
}

export { PromptSuggestions }
