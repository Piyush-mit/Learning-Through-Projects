import { Loader2 } from "lucide-react"

export default function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
      <p className="text-sm">Loading, please wait...</p>
    </div>
  )
}
