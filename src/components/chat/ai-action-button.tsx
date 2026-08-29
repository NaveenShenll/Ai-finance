import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export interface AIActionButtonProps extends React.ComponentProps<"button"> {
  icon: React.ReactNode
  label: string
  active?: boolean
}

/**
 * Small icon-only action attached to an AI message (copy, regenerate,
 * like/dislike, etc). Always labeled for accessibility via a tooltip.
 */
function AIActionButton({ icon, label, active, className, ...props }: AIActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            aria-pressed={active}
            className={cn(
              "text-text-muted hover:text-foreground",
              active && "bg-primary-subtle text-primary hover:text-primary",
              className
            )}
            {...props}
          />
        }
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export { AIActionButton }
