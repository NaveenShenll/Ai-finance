// AI conversation components: visual foundations (Phase 0), the empty-state
// experience (Phase 2), and the live conversation flow (Phase 3), wired to
// the mock chat state in src/hooks/use-chat.ts.
export { UserMessage } from "./user-message";
export type { UserMessageProps } from "./user-message";

export { AIMessage } from "./ai-message";
export type { AIMessageProps } from "./ai-message";

export { ReasoningIndicator } from "./reasoning-indicator";
export type { ReasoningIndicatorProps } from "./reasoning-indicator";

export { SourceCitation } from "./source-citation";
export type { SourceCitationProps } from "./source-citation";

export { AIActionButton } from "./ai-action-button";
export type { AIActionButtonProps } from "./ai-action-button";

export { PromptSuggestionCard } from "./prompt-suggestion-card";
export type { PromptSuggestionCardProps } from "./prompt-suggestion-card";

export { ChatComposer } from "./chat-composer";
export type { ChatComposerProps } from "./chat-composer";

export { PromptSuggestions } from "./prompt-suggestions";
export type { PromptSuggestionsProps, PromptSuggestionItem } from "./prompt-suggestions";

export { ChatHome } from "./chat-home";
export type { ChatHomeProps } from "./chat-home";

export { MessageActions } from "./message-actions";
export type { MessageActionsProps } from "./message-actions";

export { MessageList } from "./message-list";
export type { MessageListProps } from "./message-list";

export { Conversation } from "./conversation";
export type { ConversationProps } from "./conversation";

export { ChatPageContent } from "./chat-page-content";
export type { ChatPageContentProps } from "./chat-page-content";
