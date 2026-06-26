import * as React from "react";
import { CropRect } from "@/image-engine/types";
import { calculateFaceGuides } from "@/image-engine/crop";

interface SafeFaceGuideProps {
  crop: CropRect;
  strokeWidth: number;
}

export function SafeFaceGuide({ crop, strokeWidth }: SafeFaceGuideProps) {
  // Use Engine calculation for geometry
  const guides = calculateFaceGuides(crop);

  return (
    <g className="pointer-events-none" opacity={0.5}>
      {/* Head Width Boundaries (Left / Right) */}
      <line 
        x1={guides.headSafeLeftX} y1={guides.topMarginY} 
        x2={guides.headSafeLeftX} y2={guides.chinLimitY} 
        stroke="cyan" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
      />
      <line 
        x1={guides.headSafeRightX} y1={guides.topMarginY} 
        x2={guides.headSafeRightX} y2={guides.chinLimitY} 
        stroke="cyan" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
      />

      {/* Top Margin Guide */}
      <line 
        x1={crop.x} y1={guides.topMarginY} 
        x2={crop.x + crop.width} y2={guides.topMarginY} 
        stroke="cyan" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
      />
      <text 
        x={crop.x + 4} y={guides.topMarginY - 4} 
        fill="cyan" fontSize="9" opacity={0.6}
        className="font-medium drop-shadow-md select-none"
      >
        Top of hair
      </text>

      {/* Eye Line Guide */}
      <line 
        x1={crop.x} y1={guides.eyeLineY} 
        x2={crop.x + crop.width} y2={guides.eyeLineY} 
        stroke="cyan" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
      />
      <text 
        x={crop.x + 4} y={guides.eyeLineY - 4} 
        fill="cyan" fontSize="9" opacity={0.6}
        className="font-medium drop-shadow-md select-none"
      >
        Eye line
      </text>

      {/* Chin Limit Guide */}
      <line 
        x1={crop.x} y1={guides.chinLimitY} 
        x2={crop.x + crop.width} y2={guides.chinLimitY} 
        stroke="cyan" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
      />
      <text 
        x={crop.x + 4} y={guides.chinLimitY - 4} 
        fill="cyan" fontSize="9" opacity={0.6}
        className="font-medium drop-shadow-md select-none"
      >
        Chin limit
      </text>
    </g>
  );
}
