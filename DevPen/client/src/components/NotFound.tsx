import { Button } from "@/components/ui/button";
import { HomeIcon, AlertTriangleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] w-screen text-center px-4">
      <AlertTriangleIcon className="w-16 h-16 text-gray-300 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
        <Button className="flex items-center gap-2" onClick={()=>{navigate('/')}}>
          <HomeIcon className="w-4 h-4" />
          Go Back Home
        </Button>
    </div>
  );
}
