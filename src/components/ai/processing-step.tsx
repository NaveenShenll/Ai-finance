import * as React from "react"
import { CheckIcon, Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ProcessingStepProps extends React.ComponentProps<"div"> {
  label: string
  status: "done" | "active"
}

/**
 * One row of AIProcessingState: a completed step (checkmark) or the
 * currently active one (spinner + trailing ellipsis).
 */
function ProcessingStep({ label, status, className, ...props }: ProcessingStepProps) {
  const isActive = status === "active"

  return (
    <div
      data-slot="processing-step"
      data-status={status}
      className={cn("flex items-center gap-2 text-sm", isActive ? "text-ai" : "text-text-secondary", className)}
      {...props}
    >
      {isActive ? (
        <Loader2Icon className="size-3.5 shrink-0 animate-spin motion-reduce:animate-none" />
      ) : (
        <CheckIcon className="size-3.5 shrink-0 text-success" />
      )}
      <span>{isActive ? `${label}…` : label}</span>
    </div>
  )
}

export { ProcessingStep }
