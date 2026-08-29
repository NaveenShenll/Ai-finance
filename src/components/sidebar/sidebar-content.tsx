import * as React from "react"

import { cn } from "@/lib/utils"

export interface SidebarContentProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * Shared inner layout (header / scrollable nav area / footer) used by both
 * the persistent desktop rail and the mobile drawer, so the two stay visually
 * identical.
 */
function SidebarContent({ header, footer, children, className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex h-full w-full flex-col gap-4", className)}
      {...props}
    >
      {header && <div className="shrink-0 px-3 pt-3">{header}</div>}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3">{children}</nav>
      {footer && <div className="shrink-0 border-t border-border p-3">{footer}</div>}
    </div>
  )
}

export { SidebarContent }
