import { useState, useCallback, useEffect } from "react";
import { ImageSession } from "@/image-engine/types";
import { validateImage } from "@/image-engine/validation";
import { extractMetadata } from "@/image-engine/decode";

interface UseImageLoaderState {
  session: ImageSession | null;
  isLoading: boolean;
  error: string | null;
}

export function useImageLoader() {
  const [state, setState] = useState<UseImageLoaderState>({
    session: null,
    isLoading: false,
    error: null,
  });

  // Cleanup Memory (Object URL and Bitmap)
  const cleanupSession = useCallback((sessionToClean: ImageSession | null) => {
    if (sessionToClean) {
      if (sessionToClean.previewUrl) {
        URL.revokeObjectURL(sessionToClean.previewUrl);
      }
      if (sessionToClean.image.bitmap) {
        sessionToClean.image.bitmap.close();
      }
    }
  }, []);

  // Ensure cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupSession(state.session);
    };
  }, [cleanupSession, state.session]);

  const loadImage = useCallback(async (file: File) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    // 1. Validation
    const validation = validateImage(file);
    if (!validation.isValid) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: validation.error || "Invalid image",
      }));
      return;
    }

    try {
      // 2. Decode and extract metadata
      const { metadata, bitmap } = await extractMetadata(file);

      // 3. Create new preview URL
      const previewUrl = URL.createObjectURL(file);

      // 4. Construct ImageInfo and Session
      const newSession: ImageSession = {
        image: {
          file,
          metadata,
          bitmap,
          createdAt: Date.now(),
        },
        previewUrl,
      };

      setState((prev) => {
        // Clean up the old session before applying the new one
        cleanupSession(prev.session);
        return {
          session: newSession,
          isLoading: false,
          error: null,
        };
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to process image.",
      }));
    }
  }, [cleanupSession]);

  const clear = useCallback(() => {
    setState((prev) => {
      cleanupSession(prev.session);
      return {
        session: null,
        isLoading: false,
        error: null,
      };
    });
  }, [cleanupSession]);

  return {
    ...state,
    loadImage,
    clear,
  };
}
