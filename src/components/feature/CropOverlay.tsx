import * as React from "react";
import { CropRect, CropHandle } from "@/image-engine/types";
import { SafeFaceGuide } from "./SafeFaceGuide";

interface CropOverlayProps extends React.SVGProps<SVGSVGElement> {
  crop: CropRect;
  imageWidth: number;
  imageHeight: number;
  activeHandle?: CropHandle | null;
  isDragging?: boolean;
  isRotating?: boolean;
}

export const CropOverlay = React.forwardRef<SVGSVGElement, CropOverlayProps>(
  ({ crop, imageWidth, imageHeight, activeHandle, isDragging, isRotating, className = "", ...props }, ref) => {
    // Stroke width that scales naturally with the image resolution
    const strokeWidth = Math.max(2, imageWidth * 0.003);
    
    const thirdW = crop.width / 3;
    const thirdH = crop.height / 3;
    
    // Determine overall interaction state
    const isAnyActive = isDragging || isRotating;
    const isHoveredState = activeHandle !== null && activeHandle !== undefined && !isDragging;
    
    // Helper to generate dynamic handle styles based on interaction state
    const getHandleProps = (handle: CropHandle) => {
      const isHovered = activeHandle === handle && !isDragging;
      const isActive = activeHandle === handle && isDragging;
      
      return {
        style: {
          transition: "all 150ms ease-out",
          transformOrigin: "center",
          transformBox: "fill-box" as any,
          transform: isActive ? "scale(1.3)" : isHovered ? "scale(1.2)" : "scale(1)",
          fill: (isActive || isHovered) ? "hsl(var(--primary))" : "white",
          filter: isActive ? "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))" : isHovered ? "brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
        }
      };
    };

    return (
      <svg 
        ref={ref}
        viewBox={`0 0 ${imageWidth} ${imageHeight}`}
        className={`absolute inset-0 w-full h-full object-contain touch-none select-none ${className}`}
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        {/* Invisible rect to capture pointer events over the transparent crop hole */}
        <rect width="100%" height="100%" fill="transparent" pointerEvents="all" />

        <defs>
        <mask id="crop-mask">
          {/* Default everything to visible (white) */}
          <rect width="100%" height="100%" fill="white" />
          {/* Punch a hole where the crop rectangle is (black = transparent) */}
          <rect x={crop.x} y={crop.y} width={crop.width} height={crop.height} fill="black" />
        </mask>
      </defs>

      {/* Dimmed background covering the uncropped area */}
      <rect 
        width="100%" 
        height="100%" 
        fill="rgba(0,0,0,0.40)" 
        mask="url(#crop-mask)" 
      />

      {/* Inner dynamic stroke */}
      <g 
        stroke={isDragging ? "hsl(var(--primary))" : "white"} 
        strokeWidth="2" 
        fill="none"
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
        style={{
          transition: "stroke 150ms ease-out, filter 150ms ease-out",
          filter: isDragging 
            ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))" 
            : isHoveredState 
              ? "brightness(1.2) drop-shadow(0 1px 3px rgba(0,0,0,0.4))" 
              : "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
        }}
      >
        <rect x={crop.x} y={crop.y} width={crop.width} height={crop.height} />
      </g>
      
      {/* Rule of Thirds */}
      <g stroke="white" strokeWidth="1" fill="none" opacity={isAnyActive ? 0.40 : 0.10} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" style={{ transition: "opacity 150ms ease-out" }}>
        <line x1={crop.x + thirdW} y1={crop.y} x2={crop.x + thirdW} y2={crop.y + crop.height} />
        <line x1={crop.x + 2*thirdW} y1={crop.y} x2={crop.x + 2*thirdW} y2={crop.y + crop.height} />
        <line x1={crop.x} y1={crop.y + thirdH} x2={crop.x + crop.width} y2={crop.y + thirdH} />
        <line x1={crop.x} y1={crop.y + 2*thirdH} x2={crop.x + crop.width} y2={crop.y + 2*thirdH} />
      </g>

      <g style={{ opacity: 0.5 }}>
        <SafeFaceGuide crop={crop} strokeWidth={strokeWidth} />
      </g>

      {/* Resize Handles */}
      <g stroke="rgba(0,0,0,0.5)" strokeWidth={Math.max(1, strokeWidth * 0.5)}>
        {/* Corners */}
        <circle cx={crop.x} cy={crop.y} r={Math.max(6, strokeWidth * 2.5)} {...getHandleProps('nw')} />
        <circle cx={crop.x + crop.width} cy={crop.y} r={Math.max(6, strokeWidth * 2.5)} {...getHandleProps('ne')} />
        <circle cx={crop.x + crop.width} cy={crop.y + crop.height} r={Math.max(6, strokeWidth * 2.5)} {...getHandleProps('se')} />
        <circle cx={crop.x} cy={crop.y + crop.height} r={Math.max(6, strokeWidth * 2.5)} {...getHandleProps('sw')} />

        {/* Edges */}
        <rect 
          x={crop.x + crop.width / 2 - Math.max(10, strokeWidth * 4)} 
          y={crop.y - Math.max(3, strokeWidth * 1.5)} 
          width={Math.max(20, strokeWidth * 8)} 
          height={Math.max(6, strokeWidth * 3)} 
          rx={Math.max(3, strokeWidth * 1.5)} 
          {...getHandleProps('n')}
        />
        <rect 
          x={crop.x + crop.width / 2 - Math.max(10, strokeWidth * 4)} 
          y={crop.y + crop.height - Math.max(3, strokeWidth * 1.5)} 
          width={Math.max(20, strokeWidth * 8)} 
          height={Math.max(6, strokeWidth * 3)} 
          rx={Math.max(3, strokeWidth * 1.5)} 
          {...getHandleProps('s')}
        />
        <rect 
          x={crop.x + crop.width - Math.max(3, strokeWidth * 1.5)} 
          y={crop.y + crop.height / 2 - Math.max(10, strokeWidth * 4)} 
          width={Math.max(6, strokeWidth * 3)} 
          height={Math.max(20, strokeWidth * 8)} 
          rx={Math.max(3, strokeWidth * 1.5)} 
          {...getHandleProps('e')}
        />
        <rect 
          x={crop.x - Math.max(3, strokeWidth * 1.5)} 
          y={crop.y + crop.height / 2 - Math.max(10, strokeWidth * 4)} 
          width={Math.max(6, strokeWidth * 3)} 
          height={Math.max(20, strokeWidth * 8)} 
          rx={Math.max(3, strokeWidth * 1.5)} 
          {...getHandleProps('w')}
        />
      </g>
    </svg>
  );
});
