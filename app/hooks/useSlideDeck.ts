import { useState, useCallback, useMemo } from "react";
import { SlideDeck, Slide } from "../lib/types";

interface UseSlideDeckReturn {
  slides: SlideDeck | null;
  currentSlideIndex: number;
  currentSlide: Slide | undefined;
  setSlides: (slides: SlideDeck | null) => void;
  setCurrentSlideIndex: (index: number) => void;
  handleNavigate: (direction: "previous" | "next") => void;
  handleTitleChange: (newTitle: string) => void;
  handleContentChange: (contentIndex: number, newText: string) => void;
}

export default function useSlideDeck(): UseSlideDeckReturn {
  const [slides, setSlides] = useState<SlideDeck | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = useMemo(
    () => slides?.slides[currentSlideIndex],
    [slides, currentSlideIndex]
  );

  const handleNavigate = useCallback(
    (direction: "previous" | "next") => {
      if (!slides) return;
      if (direction === "previous" && currentSlideIndex > 0) {
        setCurrentSlideIndex(currentSlideIndex - 1);
      } else if (
        direction === "next" &&
        currentSlideIndex < slides.slides.length - 1
      ) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    },
    [slides, currentSlideIndex]
  );

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      if (!slides) return;
      const updatedSlides = slides.slides.map((slide, index) => {
        if (index === currentSlideIndex) {
          return { ...slide, title: newTitle };
        }
        return slide;
      });
      setSlides({ ...slides, slides: updatedSlides });
    },
    [slides, currentSlideIndex]
  );

  const handleContentChange = useCallback(
    (contentIndex: number, newText: string) => {
      if (!slides) return;
      const updatedSlides = slides.slides.map((slide, slideIndex) => {
        if (slideIndex === currentSlideIndex) {
          const updatedContent = slide.content.map((item, itemIndex) => {
            if (itemIndex === contentIndex) {
              return { ...item, text: newText };
            }
            return item;
          });
          return { ...slide, content: updatedContent };
        }
        return slide;
      });
      setSlides({ ...slides, slides: updatedSlides });
    },
    [slides, currentSlideIndex]
  );

  return {
    slides,
    currentSlideIndex,
    currentSlide,
    setSlides,
    setCurrentSlideIndex,
    handleNavigate,
    handleTitleChange,
    handleContentChange,
  };
}
