"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, RefreshCwIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import { AIActionButton } from "./ai-action-button"

export interface MessageActionsProps {
  content: string
  onRegenerate?: () => void
  regenerateDisabled?: boolean
}

/**
 * Action row under an AI message: copy (real, local clipboard write),
 * regenerate (re-requests a reply via the caller), and feedback (visual,
 * local-only toggle — no persistence).
 */
function MessageActions({ content, onRegenerate, regenerateDisabled }: MessageActionsProps) {
  const [copied, setCopied] = React.useState(false)
  const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable — non-critical affordance, fail silently.
    }
  }

  return (
    <div data-slot="message-actions" className="flex items-center gap-1">
      <AIActionButton
        icon={copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
        label={copied ? "Copied" : "Copy"}
        onClick={handleCopy}
      />
      {onRegenerate && (
        <AIActionButton
          icon={<RefreshCwIcon className="size-3.5" />}
          label="Regenerate"
          onClick={onRegenerate}
          disabled={regenerateDisabled}
        />
      )}
      <AIActionButton
        icon={<ThumbsUpIcon className="size-3.5" />}
        label="Good response"
        active={feedback === "up"}
        onClick={() => setFeedback((f) => (f === "up" ? null : "up"))}
      />
      <AIActionButton
        icon={<ThumbsDownIcon className="size-3.5" />}
        label="Bad response"
        active={feedback === "down"}
        onClick={() => setFeedback((f) => (f === "down" ? null : "down"))}
      />
    </div>
  )
}

export { MessageActions }
