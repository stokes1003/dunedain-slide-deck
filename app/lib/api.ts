import type {
  GenerateSlidesRequest,
  GenerateSlidesResponse,
  ApiError,
} from "./types";

const DEFAULT_MODEL = "gpt-4o-2024-08-06";

export async function generateSlides(
  prompt: string,
  model: string = DEFAULT_MODEL
): Promise<GenerateSlidesResponse["data"]> {
  const requestBody: GenerateSlidesRequest = {
    prompt,
    model,
  };

  try {
    const response = await fetch("/api/generate-slides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `API request failed with status ${response.status}`,
        status: response.status,
      };
      throw error;
    }

    const data: GenerateSlidesResponse = await response.json();

    if (!data.success) {
      const error: ApiError = {
        message: "API returned unsuccessful response",
      };
      throw error;
    }

    return data.data;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error;
    }

    const apiError: ApiError = {
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while generating slides",
    };
    throw apiError;
  }
}
