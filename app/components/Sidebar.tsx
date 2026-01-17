import Logo from "./Logo";
import { PromptHistoryItem } from "../hooks/usePromptHistory";

interface SidebarProps {
  onNewDeck?: () => void;
  history?: PromptHistoryItem[];
  onHistoryItemClick?: (prompt: string) => void;
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function groupHistoryByDate(history: PromptHistoryItem[]) {
  const now = Date.now();
  const today = new Date(now).setHours(0, 0, 0, 0);
  const yesterday = today - 86400000;

  const todayItems: PromptHistoryItem[] = [];
  const yesterdayItems: PromptHistoryItem[] = [];
  const olderItems: PromptHistoryItem[] = [];

  history.forEach((item) => {
    if (item.timestamp >= today) {
      todayItems.push(item);
    } else if (item.timestamp >= yesterday) {
      yesterdayItems.push(item);
    } else {
      olderItems.push(item);
    }
  });

  return { todayItems, yesterdayItems, olderItems };
}

export default function Sidebar({
  onNewDeck,
  history = [],
  onHistoryItemClick,
}: SidebarProps) {
  const { todayItems, yesterdayItems, olderItems } =
    groupHistoryByDate(history);

  return (
    <div className="flex flex-col h-screen bg-white border-r border-gray-200 w-64 overflow-hidden">
      <div className="flex flex-col p-4 gap-6 shrink-0">
        <div className="flex flex-row items-center justify-center">
          <Logo className="text-foreground" />
        </div>

        {onNewDeck && (
          <button
            onClick={onNewDeck}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#00FFA1]/10 hover:bg-[#00FFA1]/20 text-black font-medium transition-colors w-full text-left"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            New Deck
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {history.length > 0 ? (
          <div className="flex flex-col gap-4">
            {todayItems.length > 0 && (
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  Today
                </h3>
                {todayItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onHistoryItemClick?.(item.prompt)}
                    className="flex flex-col gap-1 px-3 py-2 rounded-md hover:bg-gray-100 text-left transition-colors text-sm"
                  >
                    <span className="text-gray-700 line-clamp-2">
                      {item.prompt.length > 60
                        ? `${item.prompt.substring(0, 60)}...`
                        : item.prompt}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {yesterdayItems.length > 0 && (
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  Yesterday
                </h3>
                {yesterdayItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onHistoryItemClick?.(item.prompt)}
                    className="flex flex-col gap-1 px-3 py-2 rounded-md hover:bg-gray-100 text-left transition-colors text-sm"
                  >
                    <span className="text-gray-700 line-clamp-2">
                      {item.prompt.length > 60
                        ? `${item.prompt.substring(0, 60)}...`
                        : item.prompt}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {olderItems.length > 0 && (
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  Earlier
                </h3>
                {olderItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onHistoryItemClick?.(item.prompt)}
                    className="flex flex-col gap-1 px-3 py-2 rounded-md hover:bg-gray-100 text-left transition-colors text-sm"
                  >
                    <span className="text-gray-700 line-clamp-2">
                      {item.prompt.length > 60
                        ? `${item.prompt.substring(0, 60)}...`
                        : item.prompt}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="px-3 py-4 text-sm text-gray-400 text-center">
            No history yet
          </div>
        )}
      </div>
    </div>
  );
}
