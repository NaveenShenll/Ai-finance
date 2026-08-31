// Application shell: responsive frame (desktop rail / mobile drawer, header,
// main content area) that pages mount their content into. Structural only —
// no chat or finance data logic lives here; callers pass data in as props.
export { AppShell } from "./app-shell";
export type { AppShellProps } from "./app-shell";

export { Header } from "./header";
export type { HeaderProps } from "./header";

export { AIToggle } from "./ai-toggle";

export { ModeToggle } from "./mode-toggle";

export { NewChatAction } from "./new-chat-action";
export type { NewChatActionProps } from "./new-chat-action";

export { ChatHistorySection } from "./chat-history-section";
export type { ChatHistorySectionProps } from "./chat-history-section";

export { WatchlistSection } from "./watchlist-section";
export type { WatchlistSectionProps } from "./watchlist-section";

export { UserProfileArea } from "./user-profile-area";
export type { UserProfileAreaProps } from "./user-profile-area";

export { AppNavContent } from "./app-nav-content";
export type { AppNavContentProps } from "./app-nav-content";

export type { ChatHistoryItem, WatchlistItemData, UserProfileData } from "./types";
