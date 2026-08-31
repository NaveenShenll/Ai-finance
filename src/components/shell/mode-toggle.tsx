"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const OPTIONS = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
] as const

/**
 * Light / Dark / System theme control for the top nav bar. The trigger icon
 * reflects the resolved theme (`resolvedTheme`, not `theme`) so it shows a
 * sun/moon that matches what's actually on screen even when "System" is
 * selected. Renders a neutral icon until mounted to avoid a hydration
 * mismatch — the correct theme is already applied pre-hydration by
 * ThemeProvider's blocking script.
 */
function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={<Button type="button" variant="ghost" size="icon" aria-label="Change theme" />}
            />
          }
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>
        <TooltipContent>Change theme</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
            <Icon />
            {label}
            {mounted && theme === value && <CheckIcon className="ml-auto size-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ModeToggle }
