import * as React from "react"
import { PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface NewChatActionProps extends React.ComponentProps<"button"> {
  href?: string
}

/**
 * Primary call-to-action pinned above the chat history list. Purely
 * presentational — wiring up an actual new-session flow is a later phase.
 */
function NewChatAction({ href, className, ...props }: NewChatActionProps) {
  return (
    <Button
      variant="secondary"
      className={cn("w-full justify-start", className)}
      nativeButton={!href}
      render={href ? <a href={href} /> : undefined}
      {...props}
    >
      <PlusIcon />
      New chat
    </Button>
  )
}

export { NewChatAction }
