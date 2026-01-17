"use client";

import { useState } from "react";

interface PromptFormProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
  onErrorClear?: () => void;
}

export default function PromptForm({
  onGenerate,
  isLoading,
  onErrorClear,
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

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        className="border-2 border-[#00FFA1]/30 rounded-lg p-4 text-base focus:border-[#00FFA1] focus:outline-none bg-white text-black placeholder:text-gray-400"
        placeholder="Describe your presentation topic or mission requirements..."
        value={prompt}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isLoading && prompt.trim() !== "") {
            handleSubmit();
          }
        }}
      />
      <button
        className="bg-[#00FFA1] text-black rounded-lg p-4 hover:bg-[#00E691] disabled:bg-gray-300 disabled:text-gray-500 transition-colors font-semibold text-base"
        onClick={handleSubmit}
        disabled={isLoading || prompt.trim() === ""}
      >
        {isLoading ? "Generating presentation..." : "Generate Slide Deck"}
      </button>
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
