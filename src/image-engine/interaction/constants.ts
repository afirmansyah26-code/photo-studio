import { CropHandle } from "../types";

export const CURSOR_MAPPINGS: Record<CropHandle, string> = {
  nw: "cursor-nwse-resize",
  se: "cursor-nwse-resize",
  ne: "cursor-nesw-resize",
  sw: "cursor-nesw-resize",
  n: "cursor-ns-resize",
  s: "cursor-ns-resize",
  e: "cursor-ew-resize",
  w: "cursor-ew-resize",
  center: "cursor-grab",
};

export const DRAGGING_CURSOR = "cursor-grabbing";
