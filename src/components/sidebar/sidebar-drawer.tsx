"use client"

import * as React from "react"

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { SidebarContent, type SidebarContentProps } from "./sidebar-content"

export interface SidebarDrawerProps extends SidebarContentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Mobile equivalent of Sidebar: the same nav content rendered inside a
 * left-side Sheet/drawer. Visibility is controlled by the consumer (e.g. a
 * hamburger button in the app header).
 */
function SidebarDrawer({ open, onOpenChange, header, footer, children }: SidebarDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 gap-0 bg-sidebar p-0 text-sidebar-foreground">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarContent header={header} footer={footer} className="pt-3">
          {children}
        </SidebarContent>
      </SheetContent>
    </Sheet>
  )
}

export { SidebarDrawer }
