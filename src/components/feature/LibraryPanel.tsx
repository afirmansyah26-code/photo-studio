import * as React from "react";
import { UploadCloud, CheckCircle2, Circle, Clock } from "lucide-react";
import { LibraryItem, ItemStatus } from "@/image-engine/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface LibraryPanelProps {
  items: LibraryItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onUpload: (files: File[] | FileList) => void;
}

export function LibraryPanel({ items, activeId, onSelect, onUpload }: LibraryPanelProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
    // Reset so same files can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const getStatusIcon = (status: ItemStatus) => {
    switch (status) {
      case "not_edited":
        return <Circle className="h-4 w-4 text-muted-foreground" />;
      case "editing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "ready":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "downloaded":
        return <CheckCircle2 className="h-4 w-4 text-primary fill-primary/20" />; // CheckBadge doesn't exist in standard lucide? Actually it might, let's use CheckCircle2 with fill for now.
    }
  };

  return (
    <Card 
      className="flex flex-col h-full overflow-hidden shadow-sm border-r"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`p-4 border-b flex-shrink-0 transition-colors ${isDragging ? "bg-primary/10 border-primary" : "bg-muted/30"}`}>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg, image/png, image/webp"
          multiple
          onChange={handleFileChange}
        />
        {items.length === 0 || isDragging ? (
          <div 
            onClick={handleUploadClick}
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"}`}
          >
            <UploadCloud className={`h-8 w-8 mb-2 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium text-center">
              {isDragging ? "Drop files here" : "Upload Photos"}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">or Drag & Drop</p>
          </div>
        ) : (
          <Button 
            variant="default" 
            className="w-full justify-center gap-2" 
            onClick={handleUploadClick}
          >
            <UploadCloud className="h-4 w-4" />
            <span>Add Photos</span>
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
        {items.length === 0 && !isDragging && (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
            <p className="text-sm">Library is empty.</p>
            <p className="text-xs mt-1">Upload photos to begin batch processing.</p>
          </div>
        )}
        
        {items.map(item => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-md transition-all duration-200 text-left group
                ${isActive 
                  ? "ring-2 ring-primary bg-primary/5 shadow-sm transform scale-[1.02]" 
                  : "bg-transparent border border-transparent hover:bg-muted/50 hover:shadow-sm hover:-translate-y-[1px]"
                }`}
            >
              <div className="relative w-12 h-16 rounded overflow-hidden bg-black/5 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.file.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className={`text-sm truncate font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                  {item.file.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  {getStatusIcon(item.status)}
                  <span className="text-xs text-muted-foreground capitalize">
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {items.length > 0 && (
        <div className="p-3 bg-muted/30 border-t flex-shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            {items.filter(i => i.status === 'downloaded').length} / {items.length} completed
          </p>
        </div>
      )}
    </Card>
  );
}
