import * as React from "react";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-3 md:py-0">
      <div className="container flex h-auto md:h-12 flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-primary/70" />
          <p className="font-medium">100% Client-side Processing. No images are uploaded.</p>
        </div>
        <p className="font-mono text-[10px] tracking-wider uppercase opacity-75">Photo Studio v0.1.0-alpha</p>
      </div>
    </footer>
  );
}
