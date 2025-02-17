"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2>{error.message}</h2>
      <div className="flex items-center gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button asChild variant="ghost">
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    </div>
  );
}
