import * as React from "react";
import { ImagePlus, AlertCircle } from "lucide-react";
import { ImageMetadata, CropRect, Point, Vector, CropConstraints } from "@/image-engine/types";
import { createDefaultCrop } from "@/image-engine/crop";
import { createDefaultInteractionState, hitTest } from "@/image-engine/interaction";
import { CURSOR_MAPPINGS, DRAGGING_CURSOR } from "@/image-engine/interaction/constants";
import { ViewState } from "@/image-engine/types";
import { applyZoom, applyPan, applyResize } from "@/image-engine/transform";
import { CropOverlay } from "./CropOverlay";

interface WorkspaceProps {
  previewUrl?: string | null;
  metadata?: ImageMetadata | null;
  error?: string | null;
  isLoading?: boolean;
  crop: CropRect | null;
  onCropChange?: (crop: CropRect | null) => void;
  viewState?: ViewState;
  onViewStateChange?: (vs: ViewState) => void;
}

export function Workspace({ previewUrl, metadata, error, isLoading, crop, onCropChange, viewState, onViewStateChange }: WorkspaceProps) {
  // Interaction State
  const svgRef = React.useRef<SVGSVGElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [interaction, setInteraction] = React.useState(createDefaultInteractionState());
  const [startCrop, setStartCrop] = React.useState<CropRect | null>(null);
  const [isSpaceDown, setIsSpaceDown] = React.useState(false);
  const [displayScale, setDisplayScale] = React.useState({ x: 1, y: 1 });

  const getPoint = (e: React.PointerEvent): Point | null => {
    if (!svgRef.current) return null;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!crop || !metadata) return;
    const pt = getPoint(e);
    if (!pt) return;

    // Threshold of ~2% of image width, min 20px
    const threshold = Math.max(20, metadata.width * 0.02);
    // If Space is down, force 'center' hit (pan mode)
    const hit = isSpaceDown ? 'center' : hitTest(pt, crop, threshold);

    if (hit) {
      (e.target as Element).setPointerCapture(e.pointerId);
      setStartCrop(crop);
      setInteraction(prev => ({
        ...prev,
        isActive: true,
        isDragging: true,
        selectedHandle: hit,
        pointer: { start: pt, current: pt }
      }));
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!crop || !metadata) return;
    const pt = getPoint(e);
    if (!pt) return;

    if (interaction.isDragging && startCrop && interaction.pointer.start && viewState && onViewStateChange) {
      // Dragging logic
      const delta: Vector = {
        x: pt.x - interaction.pointer.start.x,
        y: pt.y - interaction.pointer.start.y
      };
      
      if (interaction.selectedHandle === 'center') {
        onViewStateChange(applyPan(delta.x, delta.y, viewState, startCrop, metadata.width, metadata.height));
      } else if (interaction.selectedHandle) {
        onViewStateChange(applyResize(interaction.selectedHandle, pt, viewState, startCrop, metadata.width, metadata.height));
      }
      
      // Update pointer start to current so deltas are continuous
      setInteraction(prev => ({
        ...prev,
        pointer: { ...prev.pointer, start: pt }
      }));
      
    } else {
      // Hover logic
      const threshold = Math.max(20, metadata.width * 0.02);
      const hit = isSpaceDown ? 'center' : hitTest(pt, crop, threshold);
      if (hit !== interaction.selectedHandle) {
        setInteraction(prev => ({ ...prev, selectedHandle: hit }));
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (interaction.isDragging) {
      (e.target as Element).releasePointerCapture(e.pointerId);
      
      // Keep hover state if still over a handle, but reset dragging
      const pt = getPoint(e);
      let hit = null;
      if (pt && crop && metadata) {
        const threshold = Math.max(20, metadata.width * 0.02);
        hit = isSpaceDown ? 'center' : hitTest(pt, crop, threshold);
      }
      
      setInteraction(prev => ({
        ...createDefaultInteractionState(),
        selectedHandle: hit
      }));
      setStartCrop(null);
    }
  };


  const handleWheel = (e: React.WheelEvent) => {
    if (!crop || !metadata || !viewState || !onViewStateChange) return;
    
    // Some editors require Ctrl for zoom, others use standard wheel. 
    // We'll support both, but preventDefault for zoom.
    if (e.ctrlKey) {
      e.preventDefault();
    }
    
    const pt = getPoint(e as unknown as React.PointerEvent);
    if (!pt) return;
    
    // Zoom factor: 5% per wheel delta
    const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
    const newZoom = viewState.zoom * zoomFactor;
    
    onViewStateChange(applyZoom(newZoom, pt.x, pt.y, viewState, crop, metadata.width, metadata.height));
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!viewState || !onViewStateChange || !metadata || !crop) return;
    // Reset zoom
    const pt = getPoint(e as unknown as React.PointerEvent) || { x: metadata.width / 2, y: metadata.height / 2 };
    onViewStateChange(applyZoom(1, pt.x, pt.y, viewState, crop, metadata.width, metadata.height));
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (document.activeElement === containerRef.current || containerRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          setIsSpaceDown(true);
          // If we weren't dragging, force cursor to grab immediately
          if (!interaction.isDragging) {
            setInteraction(prev => ({ ...prev, selectedHandle: 'center' }));
          }
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpaceDown(false);
        // We don't have mouse coordinates here to re-evaluate hit testing instantly,
        // so it might stay as 'center' until next mouse move.
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [interaction.isDragging]);

  React.useEffect(() => {
    if (!imgRef.current || !metadata) return;
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setDisplayScale({
            x: entry.contentRect.width / metadata.width,
            y: entry.contentRect.height / metadata.height
          });
        }
      }
    });
    obs.observe(imgRef.current);
    return () => obs.disconnect();
  }, [metadata]);

  // If there's an image, render it
  if (previewUrl && metadata) {
    return (
      <div 
        ref={containerRef}
        tabIndex={0}
        className="flex-1 flex flex-col min-h-0 w-full rounded-lg bg-background items-center justify-center relative overflow-hidden p-4 md:p-8 outline-none"
      >
        
        <div 
          className="flex-1 min-h-0 min-w-0 relative w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
        >
          {/* Render standard <img> tag as requested */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            ref={imgRef}
            src={previewUrl} 
            alt="Workspace preview" 
            className="max-w-full max-h-full object-contain block shadow-md"
            draggable={false}
            style={{
              width: metadata.width,
              height: metadata.height,
              aspectRatio: `${metadata.width} / ${metadata.height}`,
              transform: viewState ? `translate(${viewState.offsetX * displayScale.x}px, ${viewState.offsetY * displayScale.y}px) scale(${viewState.zoom}) rotate(${viewState.rotation}deg)` : 'none',
              transition: interaction.isDragging ? 'none' : 'transform 100ms ease-out',
            }}
          />
          
          {crop && (
            <CropOverlay 
              ref={svgRef}
              crop={crop} 
              imageWidth={metadata.width} 
              imageHeight={metadata.height}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`pointer-events-auto ${
                interaction.isDragging && interaction.selectedHandle === 'center'
                  ? DRAGGING_CURSOR
                  : (interaction.selectedHandle === 'center' || isSpaceDown)
                  ? "cursor-grab"
                  : interaction.selectedHandle 
                  ? CURSOR_MAPPINGS[interaction.selectedHandle]
                  : "cursor-default"
              }`}
              activeHandle={interaction.selectedHandle}
              isDragging={interaction.isDragging}
              isRotating={viewState?.rotation !== 0 && interaction.isDragging} // We'll update this shortly for fine rotation
            />
          )}
        </div>
      </div>
    );
  }

  // Otherwise, render empty state or error state
  return (
    <div 
      className="flex-1 flex flex-col h-full rounded-lg items-center justify-center relative overflow-hidden transition-colors border-border bg-muted/10"
    >
      <div 
        tabIndex={0}
        className="w-full max-w-sm aspect-video md:aspect-square lg:aspect-video rounded-xl flex flex-col items-center justify-center gap-4 text-center cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background p-8"
        aria-label="Image workspace area"
      >
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="font-medium text-foreground">Loading image...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <div className="bg-destructive/10 p-4 rounded-full mx-auto w-fit ring-1 ring-destructive/20">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground tracking-tight">Upload Failed</h3>
              <p className="text-sm text-destructive mt-1 max-w-[250px] mx-auto">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-primary/5 p-4 rounded-full ring-1 ring-primary/10">
              <ImagePlus className="h-10 w-10 text-primary/70" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground tracking-tight">No image loaded</h3>
              <p className="text-sm leading-relaxed max-w-[250px] mx-auto text-muted-foreground">
                Upload a photo to start cropping and editing.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
