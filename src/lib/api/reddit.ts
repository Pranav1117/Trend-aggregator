import axios from "axios";

interface RedditPost {
  data: {
    id: string;
    source?: string;
    title: string;
    subreddit: string;
    author_fullname: string;
    url: string;
    selftext: string;
    thumbnail: string;
    approved_at_utc: string;
    permalink?: string;
  };
}

export async function fetchRedditTrends(query: string | null) {
  const accessToken = await getRedditAccessToken();
  const url =
    query === "trendig"
      ? `https://www.reddit.com/r/all/hot.json?limit=10`
      : `https://www.reddit.com/search.json?q=${query}&sort=top`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": `my-app/0.1 by u/${process.env.REDDIT_USERNAME}`,
    },
  });
  return data.data.children.map((post: RedditPost) => ({
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

let redditAccessToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getRedditAccessToken() {
  const now = Date.now();

  // If token exists and not expired, reuse it
  if (redditAccessToken && tokenExpiry && now < tokenExpiry) {
    return redditAccessToken;
  }

  // Else fetch a new one
  const auth = Buffer.from(
    `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`
  ).toString("base64");

  const { data } = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": `your-app/1.0 (by u/${process.env.REDDIT_USERNAME})`,
      },
    }
  );

  // Cache it
  redditAccessToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000 - 60 * 1000;

  return redditAccessToken;
}
