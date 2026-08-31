"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Thin wrapper around next-themes, per the official shadcn/ui Next.js
 * pattern (https://ui.shadcn.com/docs/dark-mode/next). Applies the theme
 * via a `dark` class on <html> — matching the `@custom-variant dark
 * (&:is(.dark *))` selector in globals.css — and injects the blocking
 * inline script that sets it before hydration, so there's no flash of the
 * wrong theme on load or refresh.
 */
function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
