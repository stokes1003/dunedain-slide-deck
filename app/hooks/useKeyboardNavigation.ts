"use client";

import { useEffect } from "react";
import { SlideDeck } from "../lib/types";

export default function useKeyboardNavigation(
  slides: SlideDeck | null,
  handleNavigate: (direction: "previous" | "next") => void
) {
  useEffect(() => {
    if (!slides) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleNavigate("previous");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNavigate("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slides, handleNavigate]);
}
