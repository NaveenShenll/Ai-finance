import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarContent, type SidebarContentProps } from "./sidebar-content"

export interface SidebarProps extends Omit<React.ComponentProps<"aside">, "children"> {
  header?: SidebarContentProps["header"]
  footer?: SidebarContentProps["footer"]
  children?: SidebarContentProps["children"]
}

/**
 * Persistent left navigation rail for desktop/tablet. Hidden below `md`
 * — use SidebarDrawer for the mobile equivalent.
 */
function Sidebar({ header, footer, children, className, ...props }: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex",
        className
      )}
      {...props}
    >
      <SidebarContent header={header} footer={footer}>
        {children}
      </SidebarContent>
    </aside>
  )
}

export { Sidebar }
