import * as React from "react";
import { Camera } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Camera className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Photo Studio</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
