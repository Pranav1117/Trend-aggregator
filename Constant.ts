import { FilterSection } from "./Types";

export const PROMPT = `You are an AI assistant tasked with summarizing discussions from online platforms. Given the following content from Reddit and/or YouTube (which may include comments, posts, or transcripts), extract the most important points, opinions, insights, or debates in a clear and concise manner.

    Your output should:
    - Be in bullet points
    - Reflect the key takeaways or recurring themes
    - Remove any spam, jokes, or irrelevant content
    - Maintain the original context and intent of users
    - Be easy to scan and understand

    Here is the input:`;

export const FILTER_SECTION: FilterSection[] = [
  {
    title: "Filter by Platform",
    items: [
      { id: "youtube", label: "YouTube" },
      { id: "reddit", label: "Reddit" },
      //  TODO => add twitter data with scrapping
      // { id: "twitter", label: "Twitter/X" },
    ],
  },
  {
    title: "Filter by Engagement",
    items: [
      { id: "most_shared", label: "Most Engage" },
      // { id: "most_liked", label: "Most Liked" },
    ],
  },
  // {
  //   title: "Filter by Sentiments",
  //   items: [
  //     { id: "sentiment1", label: "Sentiment 1" },
  //     { id: "sentiment2", label: "Sentiment 2" },
  //   ],
  // },
];
