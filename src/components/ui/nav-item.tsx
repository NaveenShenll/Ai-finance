import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export interface NavItemProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  icon?: React.ReactNode
  /** Preferred way to set the row's text. Falls back to `children` if omitted. */
  label?: React.ReactNode
  children?: React.ReactNode
  active?: boolean
  trailing?: React.ReactNode
  /** Convenience for a trailing numeric badge (e.g. unread count). Ignored if `trailing` is set. */
  count?: number
  /** Renders the row as a Next.js Link instead of a button. */
  href?: string
}

/**
 * Single row in a nav/sidebar list. Covers default, hover, active, and
 * disabled states. Renders as a `<button>` by default, or as a `next/link`
 * when `href` is provided.
 */
function NavItem({
  icon,
  label,
  children,
  active = false,
  trailing,
  count,
  href,
  className,
  disabled,
  onClick,
  ...props
}: NavItemProps) {
  const content = label ?? children
  const trailingContent =
    trailing ??
    (typeof count === "number" ? (
      <span className="ml-auto flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-medium text-text-secondary group-data-active/nav-item:bg-primary/15 group-data-active/nav-item:text-primary">
        {count}
      </span>
    ) : undefined)

  const sharedClassName = cn(
    "group/nav-item flex w-full items-center gap-2.5 rounded-control px-2.5 py-1.5 text-sm font-medium text-text-secondary transition-colors",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    active && "bg-primary-subtle text-primary hover:bg-primary-subtle hover:text-primary",
    className
  )

  const inner = (
    <>
      {icon && (
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center text-text-muted group-hover/nav-item:text-foreground",
            active && "text-primary"
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-left">{content}</span>
      {trailingContent}
    </>
  )

  if (href && !disabled) {
    return (
      <Link
        href={href}
        data-slot="nav-item"
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={sharedClassName}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type="button"
      data-slot="nav-item"
      data-active={active || undefined}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={sharedClassName}
      onClick={onClick}
      {...props}
    >
      {inner}
    </button>
  )
}

export { NavItem }
