interface SlideNavigationProps {
  currentSlideIndex: number;
  totalSlides: number;
  onNavigate: (direction: "previous" | "next") => void;
}

export default function SlideNavigation({
  currentSlideIndex,
  totalSlides,
  onNavigate,
}: SlideNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
      <div className="text-sm font-medium text-gray-600">
        Slide {currentSlideIndex + 1} of {totalSlides}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onNavigate("previous")}
          disabled={currentSlideIndex === 0}
          className="px-6 py-2.5  bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          Previous
        </button>
        <button
          onClick={() => onNavigate("next")}
          disabled={currentSlideIndex === totalSlides - 1}
          className="px-6 py-2.5 bg-[#00FFA1] text-black rounded-lg p-4 hover:bg-[#00E691] disabled:bg-gray-300 disabled:text-gray-500 transition-colors font-semibold text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
}
