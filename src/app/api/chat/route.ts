import { getOpenRouterCompletion, OpenRouterServiceError } from "@/lib/ai/openrouter-service";
import type { AIResponse, ChatHistoryEntry } from "@/types/chat";

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
}

function isHistoryEntry(value: unknown): value is ChatHistoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (entry.role === "user" || entry.role === "assistant") && typeof entry.content === "string";
}

/**
 * Server-side boundary between the browser and OpenRouter. The client
 * (OpenRouterChatService in src/lib/ai/chat-service.ts) only ever calls
 * this same-origin route — the API key never reaches the browser.
 */
export async function POST(request: Request) {
  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return Response.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history.filter(isHistoryEntry) : [];

  try {
    const text = await getOpenRouterCompletion(message, history);
    const response: AIResponse = {
      id: `resp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      blocks: [{ type: "text", text }],
    };
    return Response.json(response);
  } catch (err) {
    if (err instanceof OpenRouterServiceError) {
      return Response.json({ error: err.message }, { status: err.status });
    }
    console.error("Unexpected /api/chat error:", err);
    return Response.json({ error: "The AI service is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
