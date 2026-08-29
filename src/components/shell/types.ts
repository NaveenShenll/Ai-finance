export interface ChatHistoryItem {
  id: string
  title: string
  href?: string
}

export interface WatchlistItemData {
  symbol: string
  name?: string
  href?: string
}

export interface UserProfileData {
  name: string
  email?: string
  avatarUrl?: string
}
