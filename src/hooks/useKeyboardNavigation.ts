import { useEffect } from "react";
import { LibraryItem } from "@/image-engine/types";

export function useKeyboardNavigation(
  items: LibraryItem[],
  activeId: string | null,
  setActiveId: (id: string | null) => void,
  onRemoveItem?: (id: string) => void
) {
  useEffect(() => {
    if (items.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const currentIndex = items.findIndex((item) => item.id === activeId);
      if (currentIndex === -1) return;

      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        setActiveId(items[prevIndex].id);
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        setActiveId(items[nextIndex].id);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        if (onRemoveItem && activeId) {
          // If we delete, try to select the next item, or previous, or null
          let nextId: string | null = null;
          if (items.length > 1) {
            if (currentIndex < items.length - 1) {
              nextId = items[currentIndex + 1].id;
            } else {
              nextId = items[currentIndex - 1].id;
            }
          }
          onRemoveItem(activeId);
          setActiveId(nextId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, activeId, setActiveId]);
}
