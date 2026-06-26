import * as React from "react";
import { User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ImageInfo, CropRect, CanvasSurface, ViewState } from "@/image-engine/types";
import { renderPreview } from "@/image-engine/renderers/preview";
import { renderExport } from "@/image-engine/renderers/export";
import { compressJPEG } from "@/image-engine/compression";
import { CompressionStatistics, ItemStatus } from "@/image-engine/types";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PreviewPanelProps {
  imageInfo?: ImageInfo;
  crop: CropRect | null;
  viewState?: ViewState;
  status?: ItemStatus;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function PreviewPanel({ imageInfo, crop, viewState, status, onDownload, isDownloading }: PreviewPanelProps) {
  const [stats, setStats] = React.useState<CompressionStatistics | null>(null);
  const [isEstimating, setIsEstimating] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  // Keep track of the CanvasSurface wrapper for the canvas element
  const surfaceRef = React.useRef<CanvasSurface | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current || !imageInfo || !crop) return;

    // Initialize surface once for the canvas element
    if (!surfaceRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        surfaceRef.current = {
          canvas: canvasRef.current,
          context: ctx,
          width: canvasRef.current.width,
          height: canvasRef.current.height,
          dispose: () => {}
        };
      }
    }

    if (surfaceRef.current) {
      if (!viewState) return;
      setIsEstimating(true);
      
      // We do a quick preview render to display it on screen
      renderPreview(surfaceRef.current, imageInfo, crop, viewState)
        .catch(err => console.error("Preview render failed:", err));
        
      // And in the background we do an export render to calculate the file size estimate
      // In a real app we might want to debounce this or use a worker to prevent UI blocking
      renderExport(surfaceRef.current, imageInfo, crop, viewState)
        .then(() => {
          if (surfaceRef.current) {
            compressJPEG(surfaceRef.current).then((result: any) => {
              setStats(result.statistics);
              setIsEstimating(false);
            }).catch((err: any) => {
              console.error("Compression failed:", err);
              setIsEstimating(false);
            });
          }
        })
        .catch(err => {
          console.error("Export render failed:", err);
          setIsEstimating(false);
        });
    }
  }, [imageInfo, crop, viewState]);

  return (
    <Card className="h-full flex flex-col shadow-sm min-h-0">
      <CardHeader className="py-2.5 px-4 border-b bg-muted/30">
        <CardTitle className="text-sm font-semibold tracking-tight text-center w-full">Output Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 min-h-0">
        
        <div className="flex-1 flex justify-center mb-6 overflow-auto min-h-0 items-center">
          {crop && imageInfo ? (
            <div className="w-full max-w-[180px] aspect-[3/4] rounded-md border border-border overflow-hidden bg-muted/20 shadow-inner flex items-center justify-center">
              <canvas 
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
          <div 
            tabIndex={0}
            className="w-full max-w-[180px] aspect-[3/4] rounded-md border border-border flex flex-col items-center justify-end overflow-hidden bg-muted/20 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            aria-label="Preview area, no image available"
          >
            {/* Skeleton head/shoulders */}
            <div className="w-20 h-24 rounded-[40%] bg-border/50 translate-y-6 flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground/40 -translate-y-2" />
            </div>
          </div>
          )}
        </div>

        <div className="flex-none flex flex-col justify-end space-y-4">
          <div className="space-y-1.5 text-center">
            <p className="text-sm font-medium text-foreground">
              600 × 800
            </p>
            <p className="text-xs text-muted-foreground font-medium uppercase">
              JPEG
            </p>
            
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">Estimated Size</p>
              {isEstimating ? (
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Calculating...</span>
                </div>
              ) : stats ? (
                <p className="text-sm font-medium text-foreground mt-1">
                  {(stats.compressedSize / 1024).toFixed(1)} KB
                </p>
              ) : (
                <p className="text-sm font-medium text-foreground mt-1">---</p>
              )}
            </div>
          </div>

          <Separator />

          <Button 
            className="w-full text-base font-semibold h-12 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]" 
            size="lg"
            disabled={!crop || !imageInfo || isDownloading || isEstimating}
            onClick={onDownload}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download JPEG
              </>
            )}
          </Button>

          {status && (
            <>
              <Separator />
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium capitalize">
                  {status.replace("_", " ")}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
