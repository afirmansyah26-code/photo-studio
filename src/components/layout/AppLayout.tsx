"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LibraryPanel } from "@/components/feature/LibraryPanel";
import { Workspace } from "@/components/feature/Workspace";
import { BottomToolbar } from "@/components/feature/BottomToolbar";
import { PreviewPanel } from "@/components/feature/PreviewPanel";
import { useImageLoader } from "@/hooks/useImageLoader";
import { useLibrary } from "@/hooks/useLibrary";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { CropRect, ViewState, DEFAULT_VIEW_STATE } from "@/image-engine/types";
import { createDefaultCrop } from "@/image-engine/crop";
import { executeExportPipeline } from "@/image-engine/output/pipeline";
import { downloadBlob, generateFilename } from "@/image-engine/output/download";

export function AppLayout({ children }: { children?: React.ReactNode }) {
  const library = useLibrary();
  useKeyboardNavigation(library.items, library.activeId, library.setActiveId, library.removeItem);
  
  const imageLoader = useImageLoader();
  const [crop, setCrop] = React.useState<CropRect | null>(null);
  const [viewState, setViewState] = React.useState<ViewState>(DEFAULT_VIEW_STATE);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Sync Library Active Item -> Workspace
  React.useEffect(() => {
    if (library.activeId) {
      const item = library.items.find(i => i.id === library.activeId);
      if (item) {
        // Only load if it's a different file than what's currently loaded
        // Or if it hasn't been loaded yet.
        if (!imageLoader.session || imageLoader.session.image.file !== item.file) {
          imageLoader.loadImage(item.file);
        } else {
          // It's already loaded, just restore state
          if (item.crop) setCrop(item.crop);
          if (item.viewState) setViewState(item.viewState);
        }
      }
    } else {
      // No active item (e.g. all deleted), clear memory
      imageLoader.clear();
      setCrop(null);
      setViewState(DEFAULT_VIEW_STATE);
    }
  }, [library.activeId]); // Purposefully not depending on entire library.items or imageLoader to prevent loops

  // Initialize crop whenever a new image's metadata is loaded and apply it to LibraryItem
  React.useEffect(() => {
    const metadata = imageLoader.session?.image.metadata;
    if (metadata && library.activeId) {
      const item = library.items.find(i => i.id === library.activeId);
      if (item) {
        // If the item already has a crop, use it (restoring session)
        if (item.crop && item.viewState) {
          setCrop(item.crop);
          setViewState(item.viewState);
        } else {
          // Otherwise, generate defaults
          const newCrop = createDefaultCrop(metadata.width, metadata.height);
          setCrop(newCrop);
          setViewState(DEFAULT_VIEW_STATE);
          // And save it to the library state
          library.updateItemState(library.activeId, newCrop, DEFAULT_VIEW_STATE);
        }
        
        // Also cache metadata if not present
        if (!item.metadata) {
          library.updateItemMetadata(library.activeId, metadata);
        }
      }
    } else if (!metadata && !library.activeId) {
      setCrop(null);
      setViewState(DEFAULT_VIEW_STATE);
    }
  }, [imageLoader.session?.image.metadata]);

  // Sync edits back to Library State
  const handleCropChange = React.useCallback((newCrop: CropRect | null) => {
    setCrop(newCrop);
    if (library.activeId && newCrop) {
      library.updateItemState(library.activeId, newCrop, viewState);
    }
  }, [library, viewState]);

  const handleViewStateChange = React.useCallback((newViewState: ViewState) => {
    setViewState(newViewState);
    if (library.activeId && crop) {
      library.updateItemState(library.activeId, crop, newViewState);
    }
  }, [library, crop]);

  const handleDownload = async () => {
    const imageInfo = imageLoader.session?.image;
    if (!imageInfo || !crop || !library.activeId) return;

    try {
      setIsDownloading(true);
      const result = await executeExportPipeline(imageInfo, crop, viewState);
      downloadBlob(result.blob, generateFilename());
      
      // Update library item status
      library.updateItemStatus(library.activeId, "downloaded");
      
    } catch (err) {
      console.error("Export pipeline failed:", err);
      alert("Failed to process image.");
    } finally {
      setIsDownloading(false);
    }
  };

  const activeItem = library.items.find(i => i.id === library.activeId);

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-background">
      <Header />
      
      <main className="flex-1 container py-4 md:py-6 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile: Vertical Stack | Tablet: Grid 2 columns | Desktop: Grid 3 columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0">
          
          {/* Left Panel - Library */}
          <div className="md:col-span-4 lg:col-span-3 flex-shrink-0 h-96 md:h-full flex flex-col min-h-0">
            <LibraryPanel 
              items={library.items}
              activeId={library.activeId}
              onSelect={library.setActiveId}
              onUpload={library.addFiles}
            />
          </div>
          
          {/* Center Panel - Workspace */}
          <div className="md:col-span-8 lg:col-span-6 min-h-[400px] md:min-h-0 flex flex-col gap-4">
            <Workspace 
              previewUrl={activeItem?.thumbnailUrl || imageLoader.session?.previewUrl}
              metadata={activeItem?.metadata || imageLoader.session?.image.metadata}
              isLoading={imageLoader.isLoading && !activeItem?.metadata}
              crop={crop}
              onCropChange={handleCropChange}
              viewState={viewState}
              onViewStateChange={handleViewStateChange}
            />
            {/* Bottom Toolbar */}
            <div className="flex-none bg-muted/10 border rounded-lg">
              <BottomToolbar 
                viewState={viewState}
                onViewStateChange={handleViewStateChange}
                crop={crop}
                imageWidth={activeItem?.metadata?.width || imageLoader.session?.image.metadata.width}
                imageHeight={activeItem?.metadata?.height || imageLoader.session?.image.metadata.height}
              />
            </div>
          </div>
          
          {/* Right Panel - Preview */}
          <div className="md:col-span-12 lg:col-span-3 min-h-[300px] md:min-h-0 flex flex-col min-h-0">
            <PreviewPanel 
              imageInfo={imageLoader.session?.image}
              crop={crop}
              viewState={viewState}
              status={activeItem?.status}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
