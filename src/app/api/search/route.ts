import { fetchRedditTrends } from "@/lib/api/reddit";
import { fetchYouTubeTrends } from "@/lib/api/youtube";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery: string | null = searchParams.get("q");
  
  const YTResponse = await fetchYouTubeTrends(searchQuery);
  console.log("YT respoinse ------------", YTResponse);
  const redditResponse = await fetchRedditTrends(searchQuery);

  const response = [...YTResponse, ...redditResponse];
  return NextResponse.json({
    result: response,
  });
}
