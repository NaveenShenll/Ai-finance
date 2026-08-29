"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ChatService, OpenRouterChatService, MockChatService } from "@/lib/ai/chat-service";

export type AIProviderType = "mock" | "openrouter";

interface AIProviderContextType {
  provider: AIProviderType;
  setProvider: (provider: AIProviderType) => void;
  chatService: ChatService;
  mounted: boolean;
}

const AIProviderContext = createContext<AIProviderContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProviderState] = useState<AIProviderType>("mock");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage on the client after mounting
    const stored = localStorage.getItem("ai-provider");
    let active: AIProviderType = "mock";
    if (stored === "mock" || stored === "openrouter") {
      active = stored;
    } else {
      // Fallback to environment variable default
      const defaultProvider = (process.env.NEXT_PUBLIC_AI_PROVIDER || "mock").toLowerCase();
      if (defaultProvider === "openrouter" || defaultProvider === "mock") {
        active = defaultProvider as AIProviderType;
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProviderState(active);
    setMounted(true);
  }, []);

  const setProvider = (newProvider: AIProviderType) => {
    setProviderState(newProvider);
    localStorage.setItem("ai-provider", newProvider);
  };

  const chatServiceInstance = useMemo(() => {
    return provider === "openrouter" ? new OpenRouterChatService() : new MockChatService();
  }, [provider]);

  return (
    <AIProviderContext.Provider
      value={{
        provider,
        setProvider,
        chatService: chatServiceInstance,
        mounted,
      }}
    >
      {children}
    </AIProviderContext.Provider>
  );
}

export function useAIProvider() {
  const context = useContext(AIProviderContext);
  if (!context) {
    throw new Error("useAIProvider must be used within an AIProvider");
  }
  return context;
}
