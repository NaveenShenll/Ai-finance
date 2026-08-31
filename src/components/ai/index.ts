// AI-transparency components: processing-stage UI and the answer
// transparency disclosure. Presentational only — see src/types/chat.ts for
// ProcessingStage and src/components/chat/ai-response-loading.tsx for the
// stage-driving loading state that composes AIProcessingState.
export { ProcessingStep } from "./processing-step";
export type { ProcessingStepProps } from "./processing-step";

export { AIProcessingState, PROCESSING_STAGES } from "./ai-processing-state";
export type { AIProcessingStateProps } from "./ai-processing-state";

export { ContextCard } from "./context-card";
export type { ContextCardProps } from "./context-card";

export { AnswerTransparency } from "./answer-transparency";
export type { AnswerTransparencyProps } from "./answer-transparency";
