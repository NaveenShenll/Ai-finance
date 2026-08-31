"use client"

import * as React from "react"
import { ArrowUpIcon, FileIcon, Loader2Icon, PaperclipIcon, SearchIcon, TrendingUpIcon, XIcon } from "lucide-react"

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
    const [attachments, setAttachments] = React.useState<File[]>([])
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const isInteractive = !disabled && !loading
    const canSubmit = isInteractive && value.trim().length > 0

    const submit = () => {
      if (!canSubmit) return
      onSubmit(value.trim())
      // No upload pipeline yet — attachments are a local-only affordance for now.
      setAttachments([])
    }

    const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? [])
      if (files.length > 0) setAttachments((prev) => [...prev, ...files])
      event.target.value = ""
    }

    const removeAttachment = (index: number) => {
      setAttachments((prev) => prev.filter((_, i) => i !== index))
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

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {attachments.map((file, index) => (
              <span
                key={`${file.name}-${index}`}
                className="flex items-center gap-1.5 rounded-input border border-border bg-muted py-1 pr-1 pl-2 text-xs text-text-secondary"
              >
                <FileIcon className="size-3.5 shrink-0 text-text-muted" />
                <span className="max-w-40 truncate">{file.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeAttachment(index)}
                  disabled={!isInteractive}
                  className="flex size-4 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-border-strong hover:text-foreground"
                >
                  <XIcon className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFilesSelected}
              className="hidden"
              tabIndex={-1}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Attach file"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isInteractive}
            >
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
