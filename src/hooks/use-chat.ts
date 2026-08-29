"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatHistoryEntry, ChatSession, Message } from "@/types/chat";
import { useAIProvider } from "@/context/ai-provider-context";
import { deriveContent, extractPrimarySymbol } from "@/data/mock-chat-responses";

const MAX_HISTORY_MESSAGES = 10;

function createEmptySession(id?: string, title = "New chat"): ChatSession {
  const now = new Date().toISOString();
  return {
    id: id ?? `session-${Date.now()}`,
    title,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export interface UseChatOptions {
  /** Session id to seed the conversation with (e.g. from the route). */
  initialSessionId?: string;
}

/**
 * Frontend-only chat state: manages one or more conversation sessions and
 * drives the send → user message → AI "thinking" → mock reply flow via
 * getMockAssistantReply. No network calls; see src/data/mock-chat-responses.ts
 * for the mock reply data.
 */
export function useChat({ initialSessionId }: UseChatOptions = {}) {
  const { chatService } = useAIProvider();
  const [initialSession] = useState<ChatSession>(() => createEmptySession(initialSessionId));
  const [sessions, setSessions] = useState<ChatSession[]>([initialSession]);
  const [activeSessionId, setActiveSessionId] = useState<string>(initialSession.id);

  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastUserMessageRef = useRef<string>("");
  /** Ticker the conversation was last about — lets shorthand follow-ups ("what are the risks?") resolve without repeating it. */
  const lastSymbolRef = useRef<string | undefined>(undefined);
  /** Mirrors `sessions` so requestAssistantReply can read fresh state without being redefined on every message. */
  const sessionsRef = useRef<ChatSession[]>(sessions);
  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages ?? [];

  const appendMessage = useCallback((sessionId: string, message: Message) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, messages: [...session.messages, message], updatedAt: new Date().toISOString() }
          : session
      )
    );
  }, []);

  const requestAssistantReply = useCallback(
    async (sessionId: string, userContent: string) => {
      setIsResponding(true);
      setError(null);

      try {
        const allMessages = sessionsRef.current.find((s) => s.id === sessionId)?.messages ?? [];
        const last = allMessages[allMessages.length - 1];
        // Exclude a trailing copy of the message we're requesting a reply for
        // (the normal send/retry case) — it's sent separately, not as history.
        const priorMessages =
          last && last.role === "user" && last.content === userContent ? allMessages.slice(0, -1) : allMessages;
        const history: ChatHistoryEntry[] = priorMessages
          .slice(-MAX_HISTORY_MESSAGES)
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await chatService.sendMessage(userContent, { lastSymbol: lastSymbolRef.current, history });
        lastSymbolRef.current = extractPrimarySymbol(response.blocks) ?? lastSymbolRef.current;
        appendMessage(sessionId, {
          id: response.id,
          role: "assistant",
          content: deriveContent(response.blocks),
          timestamp: response.createdAt,
          status: "complete",
          suggestions: response.suggestions,
          blocks: response.blocks,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setIsResponding(false);
      }
    },
    [appendMessage, chatService]
  );

  /**
   * Sends `content` (or the current `input` if omitted). Validates,
   * appends the user message, clears the composer, then requests the
   * mock AI reply.
   */
  const sendMessage = useCallback(
    async (content?: string) => {
      const text = (content ?? input).trim();
      if (!text || isSubmitting || isResponding) return;

      setIsSubmitting(true);
      const sessionId = activeSessionId;

      appendMessage(sessionId, {
        id: `msg-${Date.now()}-u`,
        role: "user",
        content: text,
        timestamp: new Date().toISOString(),
        status: "complete",
      });
      lastUserMessageRef.current = text;
      setInput("");
      setIsSubmitting(false);

      await requestAssistantReply(sessionId, text);
    },
    [activeSessionId, appendMessage, input, isResponding, isSubmitting, requestAssistantReply]
  );

  /** Re-requests a reply for the last user message, without re-adding it. */
  const retryLastMessage = useCallback(() => {
    if (!lastUserMessageRef.current || isResponding) return;
    void requestAssistantReply(activeSessionId, lastUserMessageRef.current);
  }, [activeSessionId, isResponding, requestAssistantReply]);

  /** Drops the trailing assistant reply and requests a fresh one. */
  const regenerateLastResponse = useCallback(() => {
    if (!lastUserMessageRef.current || isResponding) return;

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== activeSessionId) return session;
        const trimmed = [...session.messages];
        while (trimmed.length && trimmed[trimmed.length - 1].role === "assistant") {
          trimmed.pop();
        }
        return { ...session, messages: trimmed };
      })
    );
    void requestAssistantReply(activeSessionId, lastUserMessageRef.current);
  }, [activeSessionId, isResponding, requestAssistantReply]);

  const clearConversation = useCallback(() => {
    setError(null);
    lastUserMessageRef.current = "";
    lastSymbolRef.current = undefined;
    setInput("");
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? { ...session, messages: [], updatedAt: new Date().toISOString() }
          : session
      )
    );
  }, [activeSessionId]);

  /** Starts a brand new, separate session and switches to it. */
  const createNewSession = useCallback((title?: string) => {
    const newSession = createEmptySession(undefined, title);
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInput("");
    setError(null);
    return newSession.id;
  }, []);

  const deleteSession = useCallback(
    (id: string) => {
      const remaining = sessions.filter((s) => s.id !== id);
      setSessions(remaining);
      if (activeSessionId === id) {
        setActiveSessionId(remaining[0]?.id ?? "");
      }
    },
    [activeSessionId, sessions]
  );

  return {
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
    // Multi-session surface, kept for future phases (sidebar chat history).
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createNewSession,
    deleteSession,
  };
}
