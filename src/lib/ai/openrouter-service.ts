import { FINANCE_SYSTEM_PROMPT } from "./prompts/finance-system-prompt";
import type { OpenRouterChatCompletionResponse, OpenRouterMessage } from "./types";
import type { ChatHistoryEntry } from "@/types/chat";

/**
 * Server-only. Touches process.env.OPENROUTER_API_KEY — must never be
 * imported from a "use client" component. Only src/app/api/chat/route.ts
 * should import this.
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openrouter/free";
const MAX_HISTORY_MESSAGES = 10;

export class OpenRouterServiceError extends Error {
  /** HTTP status the API route should respond with. */
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "OpenRouterServiceError";
    this.status = status;
  }
}

/**
 * Sends the finance system prompt + trimmed conversation history + the new
 * message to OpenRouter, and returns the assistant's plain-text reply.
 * Throws OpenRouterServiceError with a UI-safe message on any failure.
 */
export async function getOpenRouterCompletion(message: string, history: ChatHistoryEntry[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new OpenRouterServiceError("OpenRouter API key is not configured.", 500);
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  const messages: OpenRouterMessage[] = [
    { role: "system", content: FINANCE_SYSTEM_PROMPT },
    ...history.slice(-MAX_HISTORY_MESSAGES).map((entry) => ({ role: entry.role, content: entry.content })),
    { role: "user", content: message },
  ];

  let response: Response;
  try {
    response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Finance AI Chat",
      },
      body: JSON.stringify({ model, messages }),
    });
  } catch {
    throw new OpenRouterServiceError("Could not reach the AI service. Check your connection and try again.", 503);
  }

  if (response.status === 401 || response.status === 403) {
    throw new OpenRouterServiceError("OpenRouter rejected the request — check the configured API key.", 401);
  }
  if (response.status === 429) {
    throw new OpenRouterServiceError("The AI service is receiving too many requests right now. Please try again shortly.", 429);
  }
  if (!response.ok) {
    throw new OpenRouterServiceError("The AI service is temporarily unavailable. Please try again.", 502);
  }

  let data: OpenRouterChatCompletionResponse;
  try {
    data = await response.json();
  } catch {
    throw new OpenRouterServiceError("Received an invalid response from the AI service.", 502);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new OpenRouterServiceError("The AI service returned an empty response.", 502);
  }

  return stripMarkdown(content);
}

/**
 * The system prompt asks the model not to use markdown, but compliance is
 * model-dependent — observed in testing that some models emit `**bold**`
 * anyway. Our message bubble renders plain text, so left uncleaned this
 * shows literal asterisks. Strip the common cases defensively rather than
 * trusting every model to follow the instruction perfectly.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(?<!\*)\*(?!\*)(.+?)\*(?!\*)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "");
}
