import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <main className="flex w-full max-w-xl flex-col items-center gap-6 rounded-container border border-border bg-surface p-10 text-center shadow-card">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1">Finance AI Chat</h1>
          <p className="text-body-sm">Frontend architecture initialized</p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex flex-col items-center gap-4">
          <p className="text-body">
            The design system foundation is in place. Review the{" "}
            <Link href="/showcase" className="font-medium text-primary hover:underline">
              Design System Showcase (/showcase)
            </Link>{" "}
            or see the{" "}
            <Link href="/style-guide" className="font-medium text-primary hover:underline">
              Style Guide (/style-guide)
            </Link>{" "}
            for the full set of tokens and component foundations.
          </p>

          <Button size="lg" nativeButton={false} render={<Link href="/chat/session-1" />}>
            Launch chat session
          </Button>
        </div>
      </main>
    </div>
  );
}
