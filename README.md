# Dunedain - AI Slide Deck Builder

A Next.js application that generates and displays AI-created slide decks based on user prompts. Built with React, TypeScript, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
npm install

# Create .env.local file with:
API_URL=<your-api-url>
API_KEY=<your-api-key>
DEFAULT_MODEL=<model-name>

# Run development server
npm run dev
```

## App Architecture

### Component Hierarchy

```
page.tsx (Home)
├── Sidebar
│   └── History items (grouped by date)
├── Main Content Area
│   ├── Empty State (when no slides)
│   └── SlideViewer (when slides exist)
│       ├── SlideContent (editable title & content)
│       └── SlideNavigation (Previous/Next buttons)
└── PromptForm (fixed at bottom)
```

### State Management

The app uses a **custom hooks pattern** for state management:

- **`useSlideDeck`**: Manages slide deck state, current slide index, navigation, and content editing
- **`useSlideGeneration`**: Handles API calls for generating new slide decks
- **`usePromptHistory`**: Manages in-memory prompt history (session-only)
- **`useKeyboardNavigation`**: Handles keyboard shortcuts (arrow keys) for slide navigation

### File Structure

```
app/
├── api/
│   └── generate-slides/
│       └── route.ts          # Next.js API route (proxies to external API)
├── components/
│   ├── Sidebar.tsx           # Left sidebar with logo, menu, and history
│   ├── PromptForm.tsx        # Fixed input form at bottom
│   ├── SlideViewer.tsx       # Container for slide display
│   ├── SlideContent.tsx      # Editable slide title and content
│   ├── SlideNavigation.tsx   # Previous/Next buttons
│   ├── ErrorDisplay.tsx      # Error message display
│   ├── Logo.tsx              # Reusable logo component
│   └── Header.tsx            # (Unused, kept for reference)
├── hooks/
│   ├── useSlideDeck.ts       # Slide deck state management
│   ├── useSlideGeneration.ts # API call logic
│   ├── usePromptHistory.ts   # Session history management
│   └── useKeyboardNavigation.ts # Keyboard event handling
├── lib/
│   ├── api.ts                # Client-side API client
│   └── types.ts              # TypeScript type definitions
└── page.tsx                  # Main page component (orchestrator)
```

## Key Design Decisions

### 1. **Custom Hooks for Logic Separation**

- Extracted business logic from components into reusable hooks
- Improves testability and reusability
- Keeps components focused on presentation

### 2. **API Route Proxy Pattern**

- Client calls `/api/generate-slides` (Next.js API route)
- API route securely forwards requests to external API with API key
- **Benefit**: API keys stay server-side, never exposed to client

### 3. **In-Memory History (No Persistence)**

- Prompt history stored in React state only
- Clears on page refresh
- **Rationale**: Avoids hydration errors and simplifies state management

### 4. **Component Composition**

- Small, focused components (`SlideContent`, `SlideNavigation`, `SlideViewer`)
- Each component has a single responsibility
- Easier to maintain and test

### 5. **Inline Editing Pattern**

- Slide titles and content are editable inputs/textarea elements
- Changes update state immediately via callbacks
- No separate "edit mode" - always editable

### 6. **Fixed Layout Structure**

- Sidebar: Fixed width (256px), full height
- PromptForm: Fixed at bottom with padding to prevent overlap
- Main content: Scrollable area between sidebar and form
- Uses flexbox with `overflow-hidden` and `min-h-0` for proper scrolling

### 7. **TypeScript Throughout**

- All components and utilities are fully typed
- Shared types in `lib/types.ts`
- Prevents runtime errors and improves DX

### 8. **Error Handling Strategy**

- Errors caught at API level and formatted consistently
- `ApiError` interface for type-safe error handling
- User-friendly error messages displayed in UI

### 9. **Keyboard Navigation**

- Arrow keys (← →) for slide navigation
- Disabled when focus is in input/textarea fields
- Uses `useEffect` with cleanup for event listeners

### 10. **Responsive Design Considerations**

- Max-width container (4xl) for main content
- Sidebar fixed width (desktop-first approach)
- Scrollable content areas prevent overflow issues

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useCallback, useMemo)
- **API**: Next.js API Routes + fetch

## Environment Variables

Create a `.env.local` file with:

```
API_URL=<external-api-url>
API_KEY=<api-key>
DEFAULT_MODEL=<model-name>
```

These variables are used server-side in the API route to keep credentials secure.
