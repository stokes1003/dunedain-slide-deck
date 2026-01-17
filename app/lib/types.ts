export type ContentType = "paragraph" | "bullet";

export interface ContentItem {
  type: ContentType;
  text: string;
}

export interface Slide {
  id: string;
  title: string;
  content: ContentItem[];
}

export interface SlideDeck {
  deckTitle: string;
  slides: Slide[];
}

export interface GenerateSlidesRequest {
  prompt: string;
  model: string;
}

export interface GenerateSlidesResponse {
  success: boolean;
  data: SlideDeck;
}

export interface ApiError {
  message: string;
  status?: number;
}
