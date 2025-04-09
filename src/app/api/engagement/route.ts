import { NextResponse } from "next/server";
import {
  fetchRedditEngagement,
  fetchYouTubeEngagement,
} from "@/lib/api/engagement";

export async function GET() {
  try {
    const [youtubeData, redditData] = await Promise.all([
      fetchYouTubeEngagement(),
      fetchRedditEngagement(),
    ]);

    return NextResponse.json({
      result: [...youtubeData, ...redditData],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch engagement data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
