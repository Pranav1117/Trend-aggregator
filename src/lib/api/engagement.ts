import axios from "axios";
import { getRedditAccessToken } from "./reddit";

const YT_API_KEY = process.env.YOUTUBE_API_KEY;

interface YouTubeVideoItem {
  id: string;
  snippet: {
    channelTitle: string;
    title: string;
    description?: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    likeCount?: string;
    viewCount: string;
    commentCount?: string;
  };
}

interface RedditComment {
  data: {
    body: string;
  };
}

interface YouTubeCommentThread {
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
      };
    };
  };
}
interface RedditPostItem {
  data: {
    id: string;
    subreddit_name_prefixed: string;
    title: string;
    selftext?: string;
    thumbnail: string;
    ups: number;
    num_comments: number;
    total_awards_received?: number;
    permalink: string;
    approved_at_utc?: number;
  };
}
export async function fetchYouTubeEngagement() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos`;
    const params = {
      part: "snippet,statistics",
      chart: "mostPopular",
      regionCode: "US",
      maxResults: 10,
      key: YT_API_KEY,
    };

    const { data } = await axios.get(url, { params });
    if (!data.items) return [];
    return data.items.map((video: YouTubeVideoItem) => ({
      id: video.id,
      source: "YouTube",
      channel: video.snippet.channelTitle,
      title: video.snippet?.title,
      thumbnail: video.snippet?.thumbnails.medium.url,
      description: video.snippet?.description,
      likes: video?.statistics.likeCount
        ? parseInt(video?.statistics.likeCount)
        : 0,
      views: parseInt(video?.statistics.viewCount),
      comments: parseInt(video?.statistics.commentCount || "0"),
      url: `https://www.youtube.com/watch?v=${video?.id}`,
      publishAt: video.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("YouTube API Error:", error);
    return [];
  }
}

export async function fetchRedditEngagement(subreddit = "all") {
  try {
    const accessToken = await getRedditAccessToken();
    const url = `https://oauth.reddit.com/r/${subreddit}/top?t=day&limit=10`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": `trend aggregator/0.1 by u/${process.env.REDDIT_USERNAME}`,
      },
    });
    if (!data.data) return [];
    return data.data.children.map((post: RedditPostItem) => ({
      id: post.data.id,
      source: "Reddit",
      channel: post.data.subreddit_name_prefixed,
      title: post.data.title,
      description: post.data.selftext || "No description available",
      thumbnail: post.data.thumbnail,
      upvotes: post.data.ups,
      comments: post.data.num_comments,
      awards: post.data.total_awards_received || 0,
      url: `https://www.reddit.com${post.data.permalink}`,
      publishAt: post.data.approved_at_utc,
    }));
  } catch (error) {
    console.error("Reddit API Error:", error);
    return [];
  }
}

export async function fetchDiscussions(
  platform: "reddit" | "youtube",
  postId: string
): Promise<string[]> {
  try {
    let response;
    if (platform.toLowerCase() === "reddit") {
      response = await axios.get(
        `https://www.reddit.com/comments/${postId}.json`
      );
      return response.data[1].data.children.map(
        (c: RedditComment) => c.data.body
      );
    } else if (platform.toLowerCase() === "youtube") {
      response = await axios.get(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${postId}&key=${process.env.YOUTUBE_API_KEY}`
      );
      return response.data.items.map(
        (c: YouTubeCommentThread) =>
          c.snippet.topLevelComment.snippet.textDisplay
      );
    }
  } catch (error) {
    console.error(`Error fetching discussions from ${platform}:`, error);
    return [];
  }
  return [];
}
