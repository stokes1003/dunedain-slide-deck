"use client";

import { useState } from "react";
import { ArrowUp, FileDown, RefreshCw } from "lucide-react";
import { exportToPowerPoint } from "../lib/exportSlides";
import { SlideDeck } from "../lib/types";

interface PromptFormProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
  onErrorClear?: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  slides: SlideDeck;
}

export default function PromptForm({
  onGenerate,
  isLoading,
  slides,
  onErrorClear,
  onRegenerate,
  isRegenerating,
}: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    if (prompt.trim() === "") return;
    await onGenerate(prompt);
    setPrompt("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    if (onErrorClear) {
      onErrorClear();
    }
  };
  const handleDownload = async () => {
    if (slides.slides.length === 0) return;
    try {
      await exportToPowerPoint(slides);
    } catch {
      alert("Failed to export presentation. Please try again.");
    }
  };

  const hasSlides = slides.slides.length > 0;

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col border-2 border-gray-200 focus-within:border-[#00FFA1] rounded-lg">
        <input
          type="text"
          className="border-b-2 border-gray-200 rounded-lg p-4 text-base  focus:outline-none bg-white text-black placeholder:text-gray-400"
          placeholder="Describe your presentation topic or mission requirements..."
          value={prompt}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading && prompt.trim() !== "") {
              handleSubmit();
            }
          }}
        />
        <div className="flex flex-row gap-2 py-1 px-4 justify-between">
          <div className="flex flex-row gap-2">
            <button
              onClick={onRegenerate}
              disabled={isRegenerating || !hasSlides}
              className="text-gray-700 rounded-lg px-4 py-2 hover:bg-[#00E691]  disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              <div className="flex flex-row gap-1 items-center">
                <RefreshCw size={16} />
                Retry
              </div>
            </button>
            <button
              onClick={handleDownload}
              disabled={!hasSlides}
              className="text-gray-700 rounded-lg px-4 py-2 hover:bg-[#00E691]  disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              <div className="flex flex-row gap-1 items-center">
                <FileDown size={16} />
                Export
              </div>
            </button>
          </div>

          <button
            className="bg-[#00FFA1] text-black rounded-full p-3 hover:bg-[#00E691] disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
            onClick={handleSubmit}
            disabled={isLoading || prompt.trim() === ""}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center">
        <p>WARMIND can make mistakes, please verify important information.</p>
        <p>
          Feature request or bug?{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeCN8-ZPO0p8r9S488Ghwc8s6jNoZ6f8tgNjHJEld-uqPBQfA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#007A4D] hover:text-[#00E691]"
          >
            Report it here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
