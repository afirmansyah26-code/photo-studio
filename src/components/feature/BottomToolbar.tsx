import * as React from "react";
import { ZoomIn, RotateCw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ViewState, CropRect, DEFAULT_VIEW_STATE } from "@/image-engine/types";
import { applyZoom, applyRotation } from "@/image-engine/transform";

interface BottomToolbarProps {
  viewState?: ViewState;
  onViewStateChange?: (vs: ViewState) => void;
  crop?: CropRect | null;
  imageWidth?: number;
  imageHeight?: number;
}

export function BottomToolbar({ 
  viewState,
  onViewStateChange,
  crop,
  imageWidth,
  imageHeight
}: BottomToolbarProps) {
  
  const disabled = !viewState || !crop || !imageWidth || !imageHeight || !onViewStateChange;

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-sm mx-auto">
      {/* Zoom Control */}
      <div className="flex flex-col space-y-3 w-full group">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <ZoomIn className="h-3.5 w-3.5"/> Zoom
          </label>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-7 w-7 rounded-md transition-transform active:scale-95" 
              disabled={disabled}
              onClick={() => {
                if (!disabled) onViewStateChange(applyZoom(viewState.zoom - 0.1, crop.x + crop.width/2, crop.y + crop.height/2, viewState, crop, imageWidth, imageHeight));
              }}
              aria-label="Zoom Out"
            >
              <span className="text-lg leading-none">-</span>
            </Button>
            <span className="text-xs tabular-nums w-12 text-center font-medium bg-muted/50 rounded-md py-1.5 transition-colors group-hover:bg-muted/80">
              {viewState ? Math.round(viewState.zoom * 100) : 100}%
            </span>
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-7 w-7 rounded-md transition-transform active:scale-95" 
              disabled={disabled}
              onClick={() => {
                if (!disabled) onViewStateChange(applyZoom(viewState.zoom + 0.1, crop.x + crop.width/2, crop.y + crop.height/2, viewState, crop, imageWidth, imageHeight));
              }}
              aria-label="Zoom In"
            >
              <span className="text-lg leading-none">+</span>
            </Button>
          </div>
        </div>
        <Slider
          disabled={disabled}
          min={25}
          max={500}
          step={1}
          value={[viewState ? viewState.zoom * 100 : 100]}
          className="cursor-pointer transition-all hover:scale-[1.01]"
          onValueChange={(vals) => {
            if (!disabled) onViewStateChange(applyZoom(vals[0] / 100, crop.x + crop.width/2, crop.y + crop.height/2, viewState, crop, imageWidth, imageHeight));
          }}
          aria-label="Zoom slider"
        />
      </div>

      {/* Rotation Control */}
      <div className="flex flex-col space-y-3 w-full group">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <RotateCw className="h-3.5 w-3.5"/> Rotate
          </label>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-7 w-7 rounded-md transition-transform active:scale-95" 
              disabled={disabled}
              onClick={() => {
                if (!disabled) onViewStateChange(applyRotation(viewState.rotation - 0.1, viewState, crop, imageWidth, imageHeight));
              }}
              aria-label="Rotate Left"
            >
              <span className="text-lg leading-none">-</span>
            </Button>
            <div className="flex items-center bg-muted/50 rounded-md px-1 transition-colors group-hover:bg-muted/80">
              <input 
                type="number"
                disabled={disabled}
                className="text-xs tabular-nums w-10 text-center font-medium bg-transparent border-none h-7 focus-visible:ring-1 focus-visible:ring-primary outline-none"
                value={viewState ? viewState.rotation.toFixed(1) : "0.0"}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && !disabled) {
                    onViewStateChange(applyRotation(val, viewState, crop, imageWidth, imageHeight));
                  }
                }}
                step="0.1"
                aria-label="Rotation angle"
              />
              <span className="text-xs pr-2 text-muted-foreground">°</span>
            </div>
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-7 w-7 rounded-md transition-transform active:scale-95" 
              disabled={disabled}
              onClick={() => {
                if (!disabled) onViewStateChange(applyRotation(viewState.rotation + 0.1, viewState, crop, imageWidth, imageHeight));
              }}
              aria-label="Rotate Right"
            >
              <span className="text-lg leading-none">+</span>
            </Button>
          </div>
        </div>
        <Slider
          disabled={disabled}
          min={-15}
          max={15}
          step={0.1}
          value={[viewState ? viewState.rotation : 0]}
          className="cursor-pointer transition-all hover:scale-[1.01]"
          onValueChange={(vals) => {
            if (!disabled) onViewStateChange(applyRotation(vals[0], viewState, crop, imageWidth, imageHeight));
          }}
          aria-label="Rotation slider"
        />
      </div>

      {/* Reset View */}
      <div className="flex items-center justify-center pt-2">
        <Button 
          variant="outline" 
          size="default" 
          className="w-full text-sm h-10 font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
          disabled={disabled}
          onClick={() => onViewStateChange?.(DEFAULT_VIEW_STATE)}
        >
          <Undo2 className="h-4 w-4 mr-2" /> Reset View
        </Button>
      </div>
    </div>
  );
}
