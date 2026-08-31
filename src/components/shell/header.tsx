"use client"

import * as React from "react"
import { MenuIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AIToggle } from "./ai-toggle"
import { ModeToggle } from "./mode-toggle"

export interface HeaderProps {
  title?: React.ReactNode
  onMenuClick?: () => void
  /** Right-aligned slot for page-specific actions. Empty by default. */
  actions?: React.ReactNode
}

/**
 * Sticky top bar for the main content column. Shows the mobile nav trigger
 * and brand below `md`; shows the page title on larger screens (the brand
 * already lives in the desktop sidebar there).
 */
function Header({ title, onMenuClick, actions }: HeaderProps) {
  return (
    <header
      data-slot="app-header"
      className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur-md"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="md:hidden"
      >
        <MenuIcon />
      </Button>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground md:hidden">
          <SparklesIcon className="size-4 text-primary" />
          Finance AI
        </span>
        {title && <h1 className="hidden truncate text-h4 md:block">{title}</h1>}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <AIToggle />
        <ModeToggle />
        {actions && <div className="flex items-center gap-1.5">{actions}</div>}
      </div>
    </header>
  )
}

export { Header }
