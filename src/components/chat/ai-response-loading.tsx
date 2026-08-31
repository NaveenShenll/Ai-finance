"use client"

import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AIProcessingState, PROCESSING_STAGES } from "@/components/ai/ai-processing-state"
import type { ProcessingStage } from "@/types/chat"

export interface AIResponseLoadingProps extends React.ComponentProps<"div"> {
  /** The question being answered — used only to pick a plausible skeleton shape. */
  question?: string
}

const STAGE_INTERVAL_MS = 450

/**
 * Rough, honest heuristic for "does this look like it'll come back with
 * finance UI (quote/metrics/chart)" — used only to pick a skeleton shape
 * before the real response is known. Never presented as an actual operation
 * (see AGENTS.md — no "Fetching live market data" style copy).
 */
const FINANCE_HINTS =
  /\b(stock|shares?|ticker|price|market cap|p\/e|valuation|earnings|revenue|dividend|portfolio|invest|analyz|compare|risk|nvda|aapl|msft|tsla|nvidia|apple|microsoft|tesla)\b/i

function looksLikeFinanceQuestion(question: string) {
  return FINANCE_HINTS.test(question)
}

/**
 * Shown in place of the assistant's reply while a request is in flight.
 * Advances through user-facing processing stages on its own clock (there is
 * no real backend signal to key them off yet) and settles on "preparing"
 * until the actual response arrives and this component unmounts.
 */
function AIResponseLoading({ question = "", className, ...props }: AIResponseLoadingProps) {
  const [stage, setStage] = React.useState<ProcessingStage>("understanding")

  React.useEffect(() => {
    const timers = PROCESSING_STAGES.slice(1).map((s, i) =>
      window.setTimeout(() => setStage(s.id), STAGE_INTERVAL_MS * (i + 1))
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  const showFinanceSkeleton = React.useMemo(() => looksLikeFinanceQuestion(question), [question])
  const showSkeleton = stage === "preparing"

  return (
    <div
      data-slot="ai-response-loading"
      aria-busy="true"
      className={cn("flex items-start gap-3", className)}
      {...props}
    >
      <Avatar className="mt-0.5 shrink-0">
        <AvatarFallback className="bg-ai-subtle text-ai">
          <SparklesIcon className="size-3.5" />
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <span className="text-xs font-semibold text-primary">Finance AI</span>

        <AIProcessingState stage={stage} />

        {showSkeleton && (
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-[85%]" />
              <Skeleton className="h-3 w-[55%]" />
              <Skeleton className="h-3 w-[65%]" />
              <Skeleton className="h-3 w-[40%]" />
            </div>

            {showFinanceSkeleton && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2 rounded-card border border-border p-3">
                  <Skeleton className="h-3 w-[70%]" />
                  <Skeleton className="h-3 w-[50%]" />
                  <Skeleton className="h-3 w-[60%]" />
                </div>
                <div className="flex flex-col gap-2 rounded-card border border-border p-3">
                  <Skeleton className="h-3 w-[70%]" />
                  <Skeleton className="h-3 w-[50%]" />
                  <Skeleton className="h-3 w-[60%]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { AIResponseLoading }
