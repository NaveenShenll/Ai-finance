"use client"

import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { Sidebar, SidebarDrawer } from "@/components/sidebar"
import { AppNavContent } from "./app-nav-content"
import { Header, type HeaderProps } from "./header"
import { UserProfileArea } from "./user-profile-area"
import type { ChatHistoryItem, UserProfileData, WatchlistItemData } from "./types"

export interface AppShellProps {
  children: React.ReactNode
  title?: React.ReactNode
  headerActions?: HeaderProps["actions"]
  chats?: ChatHistoryItem[]
  activeChatId?: string
  watchlist?: WatchlistItemData[]
  activeSymbol?: string
  user?: UserProfileData
  onNewChat?: () => void
  newChatHref?: string
}

const Brand = () => (
  <span className="flex items-center gap-2 px-1 text-sm font-semibold text-foreground">
    <SparklesIcon className="size-4 text-primary" />
    Finance AI
  </span>
)

/**
 * Top-level responsive application shell: desktop sidebar rail / mobile
 * drawer (sharing one nav body), a sticky header, and a main content area.
 * Structural only — no chat or finance data logic lives here.
 */
function AppShell({
  children,
  title,
  headerActions,
  chats,
  activeChatId,
  watchlist,
  activeSymbol,
  user,
  onNewChat,
  newChatHref,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const navContent = (
    <AppNavContent
      chats={chats}
      activeChatId={activeChatId}
      watchlist={watchlist}
      activeSymbol={activeSymbol}
      onNewChat={onNewChat}
      newChatHref={newChatHref}
    />
  )

  return (
    <div data-slot="app-shell" className="flex h-dvh w-full overflow-hidden bg-background">
      <Sidebar header={<Brand />} footer={<UserProfileArea user={user} />}>
        {navContent}
      </Sidebar>

      <SidebarDrawer
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        header={<Brand />}
        footer={<UserProfileArea user={user} />}
      >
        {navContent}
      </SidebarDrawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} actions={headerActions} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export { AppShell }
