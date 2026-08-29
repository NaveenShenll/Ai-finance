"use client"

import * as React from "react"
import { ArrowUpIcon, Loader2Icon, PaperclipIcon, SearchIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export interface ChatComposerProps {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  className?: string
}

/**
 * Reusable message composer: auto-growing textarea, attach/search/finance
 * affordances, and a send button. Enter submits, Shift+Enter inserts a
 * newline. No submission logic runs here — `onSubmit` is left to the caller.
 */
const ChatComposer = React.forwardRef<HTMLTextAreaElement, ChatComposerProps>(
  (
    {
      value,
      onValueChange,
      onSubmit,
      placeholder = "Ask about stocks, markets...",
      disabled = false,
      loading = false,
      className,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [webSearchEnabled, setWebSearchEnabled] = React.useState(true)
    const [financeMode, setFinanceMode] = React.useState(true)

    const isInteractive = !disabled && !loading
    const canSubmit = isInteractive && value.trim().length > 0

    const submit = () => {
      if (!canSubmit) return
      onSubmit(value.trim())
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
        event.preventDefault()
        submit()
      }
    }

    return (
      <div
        data-slot="chat-composer"
        data-focused={isFocused || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "flex flex-col gap-2 rounded-container border border-border bg-surface p-3 shadow-card transition-shadow",
          isFocused && "border-primary/50 shadow-elevated",
          disabled && "opacity-60",
          className
        )}
      >
        <Textarea
          ref={ref}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={!isInteractive}
          rows={2}
          className="min-h-16 resize-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Attach file" disabled={!isInteractive}>
              <PaperclipIcon />
            </Button>

            <Button
              type="button"
              variant={webSearchEnabled ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={webSearchEnabled}
              onClick={() => setWebSearchEnabled((v) => !v)}
              disabled={!isInteractive}
            >
              <SearchIcon />
              Search
            </Button>

            <Button
              type="button"
              variant={financeMode ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={financeMode}
              onClick={() => setFinanceMode((v) => !v)}
              disabled={!isInteractive}
            >
              <TrendingUpIcon />
              Finance
            </Button>
          </div>

          <Button
            type="button"
            size="icon"
            aria-label="Send message"
            onClick={submit}
            disabled={!canSubmit}
            className="rounded-full"
          >
            {loading ? <Loader2Icon className="animate-spin" /> : <ArrowUpIcon />}
          </Button>
        </div>
      </div>
    )
  }
)
ChatComposer.displayName = "ChatComposer"

export { ChatComposer }
