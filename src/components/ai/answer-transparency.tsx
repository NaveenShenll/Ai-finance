"use client"

import * as React from "react"
import { ChevronDownIcon, MessageSquareIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ContextCard } from "./context-card"

export interface AnswerTransparencyProps extends React.ComponentProps<"div"> {
  /** The user's question this answer responds to — shown in the "Question" step. */
  question?: string
  /** Count of prior messages available as context when this answer was generated. */
  contextMessageCount?: number
}

const RESPONSE_STEPS = [
  { step: "03", title: "Analysis", description: "Analyzed the relevant information for your question." },
  { step: "04", title: "Response", description: "Organized the findings into a clear response." },
] as const

const MAX_QUESTION_PREVIEW = 90

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

/**
 * User-facing explanation of how the app assembled its answer. Deliberately
 * not a chain-of-thought viewer — the steps are fixed, observable
 * application stages (question → context → analysis → response), never
 * private model reasoning.
 */
function AnswerTransparency({ question, contextMessageCount, className, ...props }: AnswerTransparencyProps) {
  const [expanded, setExpanded] = React.useState(false)
  const panelId = React.useId()

  return (
    <div data-slot="answer-transparency" className={cn("flex flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-fit items-center gap-1.5 rounded-control py-1 text-xs font-medium text-text-secondary transition-colors hover:text-foreground"
      >
        <SparklesIcon className="size-3.5 text-ai" />
        How I arrived at this answer
        <ChevronDownIcon className={cn("size-3.5 text-text-muted transition-transform", expanded && "rotate-180")} />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-2 flex flex-col gap-3 rounded-input border border-border bg-surface p-3">
            <TransparencyStep
              step="01"
              title="Question"
              description={question ? `Understood what you asked: "${truncate(question, MAX_QUESTION_PREVIEW)}"` : "Understood what you asked."}
            />

            <TransparencyStep step="02" title="Context" description="Reviewed the conversation and available context." />
            {typeof contextMessageCount === "number" && contextMessageCount > 0 && (
              <ContextCard
                icon={<MessageSquareIcon className="size-3.5" />}
                title="Conversation"
                description="Relevant messages from this chat"
                meta={`${contextMessageCount} message${contextMessageCount === 1 ? "" : "s"}`}
                className="ml-7"
              />
            )}

            {RESPONSE_STEPS.map((s) => (
              <TransparencyStep key={s.step} {...s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TransparencyStep({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-label w-5 shrink-0 pt-0.5">{step}</span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <p className="text-caption">{description}</p>
      </div>
    </div>
  )
}

export { AnswerTransparency }
