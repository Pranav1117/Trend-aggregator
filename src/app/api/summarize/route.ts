import { NextRequest, NextResponse } from "next/server";
import { fetchDiscussions } from "@/lib/api/engagement";
import { summarizeText } from "@/lib/api/AISummarize";
import { PROMPT } from "../../../../Constant";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform") as "reddit" | "youtube";
  const id = searchParams.get("id");

  if (!platform || !id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // TODO = >
  // 1. fetch comments from YT - DONE
  // 2. fetch comments from reddit
  // 3. send to ai and summarize it
  // 4. send back summarize data to frontend

  try {
    const discussions = await fetchDiscussions(platform, id);
    const text = discussions.join(" ");
    const summary = await summarizeText(`${PROMPT}+ ${text}`);
    return NextResponse.json({ ...summary, postTitle: "" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
