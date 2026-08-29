/** Shapes for the OpenRouter chat-completions boundary. Server-only. */

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterChatCompletionResponse {
  id?: string;
  model?: string;
  choices?: {
    message?: {
      role?: string;
      content?: string;
    };
  }[];
  error?: {
    message?: string;
    code?: string | number;
  };
}
