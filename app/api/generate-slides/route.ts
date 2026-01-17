import { NextRequest, NextResponse } from "next/server";
import type {
  GenerateSlidesRequest,
  GenerateSlidesResponse,
  ApiError,
} from "../../lib/types";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || "gpt-4o-2024-08-06";

export async function POST(request: NextRequest) {
  try {
    if (!API_URL || !API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        } as ApiError,
        { status: 500 }
      );
    }

    const body: GenerateSlidesRequest = await request.json();
    const { prompt, model = DEFAULT_MODEL } = body;

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Prompt is required",
        } as ApiError,
        { status: 400 }
      );
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ prompt, model }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `HTTP error! status: ${response.status}`;

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          status: response.status,
        } as ApiError,
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.success) {
      const errorMessage =
        (data as ApiError).message || "API returned unsuccessful response";
      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        } as ApiError,
        { status: 400 }
      );
    }

    const slidesResponse = data as GenerateSlidesResponse;

    return NextResponse.json(slidesResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while generating slides",
      } as ApiError,
      { status: 500 }
    );
  }
}
