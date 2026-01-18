"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PromptForm from "./components/PromptForm";
import SlideViewer from "./components/SlideViewer";
import ErrorDisplay from "./components/ErrorDisplay";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";
import useSlideGeneration from "./hooks/useSlideGeneration";
import useSlideDeck from "./hooks/useSlideDeck";
import usePromptHistory from "./hooks/usePromptHistory";

export default function Home() {
  const {
    slides,
    currentSlideIndex,
    currentSlide,
    handleNavigate,
    handleTitleChange,
    handleContentChange,
    setSlides,
    setCurrentSlideIndex,
  } = useSlideDeck();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalPrompt, setOriginalPrompt] = useState<string | null>(null);

  const { history, addToHistory } = usePromptHistory();

  useKeyboardNavigation(slides, handleNavigate);

  const handleGenerate = useSlideGeneration({
    setSlides,
    setIsLoading,
    setError,
    setCurrentSlideIndex,
    onSuccess: (prompt, deckTitle) => {
      setOriginalPrompt(prompt);
      addToHistory(prompt, deckTitle);
    },
  });

  const handleRegenerate = () => {
    if (originalPrompt) {
      handleGenerate(originalPrompt);
    }
  };

  const handleNewDeck = () => {
    setSlides(null);
    setCurrentSlideIndex(0);
    setError(null);
    setOriginalPrompt(null);
  };

  const handleHistoryItemClick = (prompt: string) => {
    handleGenerate(prompt);
  };

  return (
    <div className="flex h-screen bg-white font-sans w-full overflow-hidden">
      <Sidebar
        onNewDeck={handleNewDeck}
        history={history}
        onHistoryItemClick={handleHistoryItemClick}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-4 pt-4 pb-24 min-h-0 overflow-hidden">
          <div className="flex flex-col gap-6 w-full flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
              {slides && currentSlide ? (
                <SlideViewer
                  slides={slides}
                  currentSlideIndex={currentSlideIndex}
                  onTitleChange={handleTitleChange}
                  onContentChange={handleContentChange}
                  onNavigate={handleNavigate}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-8 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="text-center max-w-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Accelerate Your Presentation Creation
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Describe your mission requirements or presentation topic
                      below to generate a professional slide deck in seconds.
                      Built for mission-critical operations and strategic
                      decision-making.
                    </p>
                    <p className="text-sm text-gray-500">
                      Navigate slides with arrow keys (← →) once generated.
                    </p>
                  </div>
                </div>
              )}
              {error && <ErrorDisplay error={error} />}
            </div>
          </div>
        </main>
        <div className="fixed bottom-0 left-64 right-0 bg-white z-10 max-w-4xl mx-auto px-4 py-6">
          <PromptForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
            onErrorClear={() => setError(null)}
            onRegenerate={handleRegenerate}
            isRegenerating={isLoading}
            slides={slides || { deckTitle: "", slides: [] }}
          />
        </div>
      </div>
    </div>
  );
}
