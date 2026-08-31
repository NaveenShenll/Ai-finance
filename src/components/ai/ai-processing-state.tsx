import * as React from "react"

import { cn } from "@/lib/utils"
import type { ProcessingStage } from "@/types/chat"
import { ProcessingStep } from "./processing-step"

export const PROCESSING_STAGES: { id: ProcessingStage; label: string }[] = [
  { id: "understanding", label: "Understanding your question" },
  { id: "context", label: "Reviewing relevant context" },
  { id: "analysis", label: "Analyzing the information" },
  { id: "preparing", label: "Preparing your answer" },
]

export interface AIProcessingStateProps extends React.ComponentProps<"div"> {
  stage: ProcessingStage
}

/**
 * Progressive list of user-facing processing stages. This is an observable,
 * application-level status (not a simulation of the model's private
 * reasoning) — only stages reached so far are shown, and they never claim to
 * expose internal thoughts. `aria-atomic="false"` so screen readers announce
 * just the newly added stage rather than re-reading the whole list.
 */
function AIProcessingState({ stage, className, ...props }: AIProcessingStateProps) {
  const activeIndex = PROCESSING_STAGES.findIndex((s) => s.id === stage)

  return (
    <div
      data-slot="ai-processing-state"
      role="status"
      aria-live="polite"
      aria-atomic="false"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {PROCESSING_STAGES.slice(0, activeIndex + 1).map((s, i) => (
        <ProcessingStep key={s.id} label={s.label} status={i === activeIndex ? "active" : "done"} />
      ))}
    </div>
  )
}

export { AIProcessingState }
