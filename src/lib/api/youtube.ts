import axios from "axios";
interface YouTubeVideo {
  id: { videoId: string } | string ;
  snippet: {
    title: string;
    channelTitle: string;
    description?: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}
export async function fetchYouTubeTrends(query: string | null) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url =
    query === "trending"
      ? // TODO => show trending according to user regions
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${API_KEY}`
      : `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;

  const { data } = await axios.get(url);
  return data.items.map((video: YouTubeVideo) => {
    const isTrending = query === "trending";
    // @ts-expect-error
    const videoId = isTrending ? video.id : video.id.videoId;

    return {
      source: "youtube",
      id: videoId,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      description: video.snippet.description || "No description available.",
      thumbnail: video.snippet.thumbnails.default.url,
      publishAt: video.snippet.publishedAt,
    };
  });
}
