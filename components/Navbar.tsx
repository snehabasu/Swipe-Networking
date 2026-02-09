import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SwipeConnect
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/swipe" className="text-sm font-medium hover:text-primary transition-colors">
            Discover
          </Link>
          <Link href="/draft" className="text-sm font-medium hover:text-primary transition-colors">
            Draft Messages
          </Link>
          <Link href="/history" className="text-sm font-medium hover:text-primary transition-colors">
            History
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/swipe">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
