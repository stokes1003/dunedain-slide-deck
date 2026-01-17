import { useState, useCallback } from "react";

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  deckTitle?: string;
}

const MAX_HISTORY_ITEMS = 50;

export default function usePromptHistory() {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  const addToHistory = useCallback((prompt: string, deckTitle?: string) => {
    const newItem: PromptHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      prompt,
      timestamp: Date.now(),
      deckTitle,
    };

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.prompt !== prompt);
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
  };
}
