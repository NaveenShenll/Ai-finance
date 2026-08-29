"use client"

import * as React from "react"
import {
  ActivityIcon,
  BarChart3Icon,
  LineChartIcon,
  NewspaperIcon,
  SparklesIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ChatComposer } from "./chat-composer"
import { PromptSuggestions, type PromptSuggestionItem } from "./prompt-suggestions"

const DEFAULT_PROMPTS: PromptSuggestionItem[] = [
  { label: "Analyze NVIDIA's recent performance", icon: <TrendingUpIcon className="size-4" /> },
  { label: "Compare Apple and Microsoft", icon: <BarChart3Icon className="size-4" /> },
  { label: "What is moving the market today?", icon: <ActivityIcon className="size-4" /> },
  { label: "Explain today's market sentiment", icon: <LineChartIcon className="size-4" /> },
  { label: "Analyze Tesla's financial outlook", icon: <NewspaperIcon className="size-4" /> },
  { label: "What should I know before investing in a stock?", icon: <WalletIcon className="size-4" /> },
]

export interface ChatHomeProps {
  /** Called with the composed message. No submission logic runs here. */
  onSubmit?: (message: string) => void
  prompts?: PromptSuggestionItem[]
  disabled?: boolean
  loading?: boolean
  className?: string
}

/**
 * Primary empty-state screen: greeting, composer, and starter prompts.
 * Selecting a prompt fills the composer — it does not auto-submit.
 */
function ChatHome({ onSubmit, prompts = DEFAULT_PROMPTS, disabled, loading, className }: ChatHomeProps) {
  const [input, setInput] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSelectPrompt = (label: string) => {
    setInput(label)
    textareaRef.current?.focus()
  }

  return (
    <div
      data-slot="chat-home"
      className={cn(
        "mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6 md:px-8",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-ai-subtle text-ai">
          <SparklesIcon className="size-5" />
        </span>
        <span className="text-sm font-semibold text-primary">Finance AI</span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-h1">What would you like to research today?</h1>
          <p className="text-body max-w-md text-text-secondary">
            Get AI-powered insights on stocks, markets, companies, and financial data.
          </p>
        </div>
      </div>

      <ChatComposer
        ref={textareaRef}
        value={input}
        onValueChange={setInput}
        onSubmit={(message) => onSubmit?.(message)}
        disabled={disabled}
        loading={loading}
        className="w-full"
      />

      <PromptSuggestions items={prompts} onSelect={handleSelectPrompt} className="w-full" />
    </div>
  )
}

export { ChatHome }
