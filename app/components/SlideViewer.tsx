import { SlideDeck } from "../lib/types";
import SlideNavigation from "./SlideNavigation";
import SlideContent from "./SlideContent";

interface SlideViewerProps {
  slides: SlideDeck;
  currentSlideIndex: number;
  onTitleChange: (title: string) => void;
  onContentChange: (index: number, text: string) => void;
  onNavigate: (direction: "previous" | "next") => void;
}

export default function SlideViewer({
  slides,
  currentSlideIndex,
  onTitleChange,
  onContentChange,
  onNavigate,
}: SlideViewerProps) {
  const currentSlide = slides.slides[currentSlideIndex];
  return (
    <div className="flex flex-col gap-6 border mt-2 border-gray-200 rounded-lg p-8 bg-white shadow-md">
      <SlideContent
        deckTitle={slides.deckTitle}
        currentSlide={currentSlide}
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
      />
      <SlideNavigation
        currentSlideIndex={currentSlideIndex}
        totalSlides={slides.slides.length}
        onNavigate={onNavigate}
      />
    </div>
  );
}
