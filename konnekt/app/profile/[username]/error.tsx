"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        An unexpected error occurred. You can try refreshing the page or go back and try again.
      </p>

      <Button
        variant="default"
        onClick={() => reset()}
        className="flex items-center gap-2"
      >
        <RefreshCwIcon className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  );
}
