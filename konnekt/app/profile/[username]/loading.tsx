import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfilePage() {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 w-full">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Bio */}
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-3/4 max-w-md" />

      {/* Posts Section */}
      <div className="space-y-4 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 space-y-3 bg-muted/40"
          >
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
