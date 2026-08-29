import { ChatPageContent } from "@/components/chat";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  return <ChatPageContent sessionId={id} />;
}
