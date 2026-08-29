import type { AIResponse, ChatContext } from "@/types/chat";
import { getMockResponse } from "@/data/mock-chat-responses";

export type { ChatContext };

/**
 * The boundary between chat UI/state and however a response actually gets
 * generated. `useChat` only ever talks to this interface, so swapping the
 * mock implementation for a real one is a one-line change, not a rewrite.
 * Client-safe — neither implementation touches the OpenRouter API key.
 */
export interface ChatService {
  sendMessage(message: string, context?: ChatContext): Promise<AIResponse>;
}

/** Frontend-only implementation backed by src/data/mock-chat-responses.ts. No network calls. */
export class MockChatService implements ChatService {
  async sendMessage(message: string, context?: ChatContext): Promise<AIResponse> {
    return getMockResponse(message, context);
  }
}

/**
 * Calls our own Next.js API route (src/app/api/chat/route.ts) — never talks
 * to OpenRouter directly from the browser. That route holds the actual
 * server-only OpenRouter client and the API key.
 */
export class OpenRouterChatService implements ChatService {
  async sendMessage(message: string, context?: ChatContext): Promise<AIResponse> {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: context?.history ?? [] }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const reason = data && typeof data === "object" && "error" in data ? String(data.error) : undefined;
      throw new Error(reason || "The AI service is temporarily unavailable. Please try again.");
    }
    return data as AIResponse;
  }
}

/**
 * NEXT_PUBLIC_ is required here (not just AI_PROVIDER) because this file is
 * bundled into the client — a bare `process.env.AI_PROVIDER` would always
 * read as undefined in the browser. This value only picks which ChatService
 * implementation the UI talks to; it is not a secret, unlike the API key.
 */
const provider = (process.env.NEXT_PUBLIC_AI_PROVIDER || "mock").toLowerCase();

export const chatService: ChatService = provider === "openrouter" ? new OpenRouterChatService() : new MockChatService();
