import { Slide } from "../lib/types";

interface SlideContentProps {
  deckTitle: string;
  currentSlide: Slide;
  onTitleChange: (title: string) => void;
  onContentChange: (index: number, text: string) => void;
}

export default function SlideContent({
  deckTitle,
  currentSlide,
  onTitleChange,
  onContentChange,
}: SlideContentProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Presentation: {deckTitle}
        </h2>
        <input
          type="text"
          value={currentSlide.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-3xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-[#00FFA1] focus:outline-none p-1 text-black"
        />
      </div>
      <div className="flex flex-col gap-4">
        {currentSlide.content.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <textarea
                key={index}
                value={item.text}
                onChange={(e) => onContentChange(index, e.target.value)}
                className="text-base leading-relaxed bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-[#00FFA1] focus:outline-none rounded p-3 resize-y min-h-[80px] text-black"
                rows={4}
              />
            );
          } else if (item.type === "bullet") {
            return (
              <div key={index} className="flex items-start gap-3 ml-2">
                <span className="text-base mt-1 text-black">•</span>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => onContentChange(index, e.target.value)}
                  className="text-base bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-[#00FFA1] focus:outline-none flex-1 p-1 text-black"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
