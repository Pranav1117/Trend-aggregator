import axios from "axios";

export async function fetchRedditTrends(query: string) {
  const url =
    query === "trendig"
      ? `https://www.reddit.com/r/all/hot.json?limit=10`
      : `https://www.reddit.com/search.json?q=${query}&sort=top`;

  const { data } = await axios.get(url);

  return data.data.children.map((post: any) => ({
    source: "reddit",
    id: post.data.id,
    title: post.data.title,
    channel: post.data.subreddit,
    author: post.data.author_fullname,
    url: `https://www.reddit.com${post.data.permalink}`,
    description: post.data.selftext || "No description available.",
    // TODO => Check proper key for thumbnail
    thumbnail: "",
    publishAt: post.data.approved_at_utc,
  }));
}
