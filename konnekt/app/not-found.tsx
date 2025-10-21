import { Button } from "@/components/ui/button";
import { HomeIcon, AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertTriangleIcon className="w-16 h-16 text-gray-300 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <Link href="/">
        <Button className="flex items-center gap-2">
          <HomeIcon className="w-4 h-4" />
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
