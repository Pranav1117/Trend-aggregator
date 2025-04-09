import axios from "axios";

interface PostProps {
  post: {
    data: {
      id: string;
      source: string;
      title: string;
      subreddit: string;
      author_fullname: string;
      url: string;
      selftext: string;
      thumbnail: string;
      approved_at_utc: string;
      permalink?: string;
    };
  };
}

export async function fetchRedditTrends(query: string | null) {
  const url =
    query === "trendig"
      ? `https://www.reddit.com/r/all/hot.json?limit=10`
      : `https://www.reddit.com/search.json?q=${query}&sort=top`;

  const { data } = await axios.get(url);
  return data.data.children.map(({ post }: PostProps) => ({
    source: "reddit",
    id: post.data.id,
    title: post.data.title,
    channel: post.data.subreddit,
    author: post.data.author_fullname,
    url: `https://www.reddit.com${post.data.permalink}`,
    description: post.data.selftext || "No description available.",
    thumbnail: post.data.thumbnail,
    publishAt: post.data.approved_at_utc,
  }));
}
