import axios from "axios";

const YT_API_KEY = process.env.YOUTUBE_API_KEY;

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
    return data.items.map((video: any) => ({
      id: video.id,
      platform: "YouTube",
      title: video.snippet?.title,
      thumbnail: video.snippet?.thumbnails.medium.url,
      likes: video?.statistics.likeCount
        ? parseInt(video?.statistics.likeCount)
        : 0,
      views: parseInt(video?.statistics.viewCount),
      comments: parseInt(video?.statistics.commentCount || 0),
      url: `https://www.youtube.com/watch?v=${video?.id}`,
    }));
  } catch (error) {
    console.error("YouTube API Error:", error);
    return [];
  }
}

export async function fetchRedditEngagement(subreddit = "all") {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=10`;
    const { data } = await axios.get(url);
    if (!data.data) return [];
    console.log("data", data.data.children[0]);
    return data.data.children.map((post: any) => ({
      id: post.data.id,
      platform: "Reddit",
      title: post.data.title,
      thumbnail: post.data.thumbnail,
      upvotes: post.data.ups,
      comments: post.data.num_comments,
      awards: post.data.total_awards_received || 0,
      url: `https://www.reddit.com${post.data.permalink}`,
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
    if (platform === "reddit") {
      response = await axios.get(
        `https://www.reddit.com/comments/${postId}.json`
      );
      return response.data[1].data.children.map((c: any) => c.data.body);
    } else if (platform === "youtube") {
      response = await axios.get(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${postId}&key=${process.env.YOUTUBE_API_KEY}`
      );
      return response.data.items.map(
        (c: any) => c.snippet.topLevelComment.snippet.textDisplay
      );
    }
  } catch (error) {
    console.error(`Error fetching discussions from ${platform}:`, error);
    return [];
  }
  return [];
}
