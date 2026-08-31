"use client";

import * as React from "react";
import { DatabaseIcon, SparklesIcon } from "lucide-react";
import { useAIProvider } from "@/context/ai-provider-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AIToggle() {
  const { provider, setProvider, mounted } = useAIProvider();

  // Defer showing active styling until mounted to prevent SSR mismatches
  const isMockActive = mounted ? provider === "mock" : true;
  const isOpenRouterActive = mounted ? provider === "openrouter" : false;

  return (
    <div className="relative inline-grid grid-cols-2 items-center rounded-full bg-muted p-1 border border-border/40 shadow-subtle select-none">
      {/* Dynamic sliding pill background */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-surface border border-border/20 shadow-sm transition-transform duration-200 ease-out",
          isOpenRouterActive ? "translate-x-full" : "translate-x-0"
        )}
      />

      {/* Mock AI Toggle option */}
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={() => setProvider("mock")}
              className={cn(
                "relative z-10 flex h-7 w-full min-w-7 sm:min-w-[92px] items-center justify-center gap-1.5 rounded-full px-2 sm:px-3 text-xs font-semibold cursor-pointer outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/50",
                isMockActive
                  ? "text-foreground"
                  : "text-text-muted hover:text-text-secondary"
              )}
            />
          }
        >
          <DatabaseIcon className={cn("size-3.5 shrink-0 transition-transform duration-200", isMockActive && "scale-105")} />
          <span className="hidden sm:inline">Mock AI</span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-center font-medium">Local Mock responses (Offline/Fast)</p>
        </TooltipContent>
      </Tooltip>

      {/* OpenRouter Toggle option */}
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={() => setProvider("openrouter")}
              className={cn(
                "relative z-10 flex h-7 w-full min-w-7 sm:min-w-[92px] items-center justify-center gap-1.5 rounded-full px-2 sm:px-3 text-xs font-semibold cursor-pointer outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/50",
                isOpenRouterActive
                  ? "text-primary dark:text-primary-hover"
                  : "text-text-muted hover:text-text-secondary"
              )}
            />
          }
        >
          <SparklesIcon className={cn("size-3.5 shrink-0 transition-transform duration-200", isOpenRouterActive && "scale-105 text-primary")} />
          <span className="hidden sm:inline">OpenRouter</span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-center font-medium">Live AI model queries via OpenRouter API</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
