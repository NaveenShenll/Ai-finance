import * as React from "react"

import { cn } from "@/lib/utils"

export interface UserMessageProps extends React.ComponentProps<"div"> {
  content: string
  timestamp?: string
}

/**
 * Right-aligned bubble representing a message sent by the user.
 */
function UserMessage({ content, timestamp, className, ...props }: UserMessageProps) {
  return (
    <div
      data-slot="user-message"
      className={cn("flex flex-col items-end gap-1", className)}
      {...props}
    >
      <div className="max-w-[85%] rounded-card rounded-tr-sm bg-primary px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-primary-foreground shadow-subtle sm:max-w-[70%]">
        {content}
      </div>
      {timestamp && (
        <span className="text-caption pr-1">{timestamp}</span>
      )}
    </div>
  )
}

export { UserMessage }
