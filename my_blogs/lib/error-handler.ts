import { NextResponse } from "next/server";
import type { ErrorResponse } from "@/types/common";

export function handleError(
  error: unknown,
  status = 500
): NextResponse<ErrorResponse> {
  console.error("API Error:", error);

  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return NextResponse.json({ message: errorMessage }, { status });
}