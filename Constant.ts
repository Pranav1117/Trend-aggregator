import { FilterSection } from "./Types";

export const PROMPT = `You are an AI assistant summarizing discussions from Reddit and YouTube, including posts, comments, and video transcripts.

    Given the input, provide a summary that:

    Presents the main takeaways, opinions, recurring themes, and debates in concise bullet points
    Removes irrelevant content (e.g., spam, jokes, off-topic replies)
    Maintains the original meaning and intent behind user comments
    Groups points into clear, easy-to-scan sections like:
    General Opinions
    Criticisms or Concerns
    Comparisons
    Insights or Trends

    Important:

    Avoid vague summaries
    Do not include markdown or HTML formatting
    Output should be in bullet points, clean, structured, and directly usable in a product UI
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
