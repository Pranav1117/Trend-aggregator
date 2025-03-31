import { FilterSection } from "./Types";

export const filterSections: FilterSection[] = [
  {
    title: "Filter by Platform",
    items: [
      { id: "youtube", label: "YouTube" },
      { id: "reddit", label: "Reddit" },
      { id: "twitter", label: "Twitter/X" },
    ],
  },
  {
    title: "Filter by Sentiments",
    items: [
      { id: "sentiment1", label: "Sentiment 1" },
      { id: "sentiment2", label: "Sentiment 2" },
    ],
  },
  {
    title: "Filter by Engagement",
    items: [
      { id: "most_shared", label: "Most Shared" },
      { id: "most_liked", label: "Most Liked" },
    ],
  },
];
