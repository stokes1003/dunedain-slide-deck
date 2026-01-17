import { useCallback } from "react";
import { generateSlides } from "../lib/api";
import { ApiError, SlideDeck } from "../lib/types";

interface UseSlideGenerationParams {
  setSlides: (slides: SlideDeck) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentSlideIndex: (index: number) => void;
  onSuccess?: (prompt: string, deckTitle: string) => void;
}

export default function useSlideGeneration({
  setSlides,
  setIsLoading,
  setError,
  setCurrentSlideIndex,
  onSuccess,
}: UseSlideGenerationParams) {
  const handleGenerate = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const newSlides = await generateSlides(prompt);
        setSlides(newSlides);
        setCurrentSlideIndex(0);
        setError(null);
        onSuccess?.(prompt, newSlides.deckTitle);
      } catch (error) {
        if (error && typeof error === "object" && "message" in error) {
          setError((error as ApiError).message);
        } else {
          setError(
            "An error occurred while generating your presentation. Please try again."
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setSlides, setIsLoading, setError, setCurrentSlideIndex, onSuccess]
  );

  return handleGenerate;
}
