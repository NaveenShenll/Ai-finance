"use client"

import * as React from "react"

import { AppShell } from "@/components/shell"
import { useChat } from "@/hooks/use-chat"
import { ChatHome } from "./chat-home"
import { Conversation } from "./conversation"

export interface ChatPageContentProps {
  sessionId: string
}

/**
 * Wires the application shell to useChat's mock conversation flow: shows
 * ChatHome until the first message is sent, then swaps to Conversation.
 * The sidebar's "New chat" action clears the active conversation.
 */
function ChatPageContent({ sessionId }: ChatPageContentProps) {
  const {
    messages,
    input,
    setInput,
    isSubmitting,
    isResponding,
    error,
    sendMessage,
    retryLastMessage,
    regenerateLastResponse,
    clearConversation,
  } = useChat({ initialSessionId: sessionId })

  return (
    <AppShell title="Chat" activeChatId={sessionId} onNewChat={clearConversation}>
      {messages.length === 0 ? (
        <ChatHome onSubmit={(message) => void sendMessage(message)} />
      ) : (
        <Conversation
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSubmit={(message) => void sendMessage(message)}
          isSubmitting={isSubmitting}
          isResponding={isResponding}
          error={error}
          onRetry={retryLastMessage}
          onRegenerate={regenerateLastResponse}
        />
      )}
    </AppShell>
  )
}

export { ChatPageContent }
