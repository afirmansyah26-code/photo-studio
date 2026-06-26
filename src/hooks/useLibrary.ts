import { useState, useCallback, useEffect } from "react";
import { LibraryItem, ItemStatus, CropRect, ViewState } from "@/image-engine/types";
import { validateImage } from "@/image-engine/validation";

export function useLibrary() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Cleanup object URLs when items are removed
  useEffect(() => {
    return () => {
      items.forEach(item => {
        URL.revokeObjectURL(item.thumbnailUrl);
      });
    };
    // Note: this cleanup runs on unmount. We don't want to revoke on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback((files: File[] | FileList) => {
    const newItems: LibraryItem[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validation = validateImage(file);
      if (validation.isValid) {
        const id = crypto.randomUUID();
        const thumbnailUrl = URL.createObjectURL(file);
        
        newItems.push({
          id,
          file,
          thumbnailUrl,
          status: "not_edited"
        });
      }
    }

    if (newItems.length > 0) {
      setItems(prev => [...prev, ...newItems]);
      
      // If nothing was selected before, auto-select the first new image
      setActiveId(current => current || newItems[0].id);
    }
  }, []);

  const updateItemStatus = useCallback((id: string, status: ItemStatus) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  }, []);

  const updateItemState = useCallback((id: string, crop: CropRect, viewState: ViewState) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, crop, viewState, status: item.status === 'not_edited' ? 'editing' : item.status } : item
    ));
  }, []);

  const updateItemMetadata = useCallback((id: string, metadata: import("@/image-engine/types").ImageMetadata) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, metadata } : item
    ));
  }, []);
  
  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.thumbnailUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  }, []);

  return {
    items,
    activeId,
    setActiveId,
    addFiles,
    updateItemStatus,
    updateItemState,
    updateItemMetadata,
    removeItem
  };
}
