import axios from "axios";

export async function fetchYouTubeTrends(query: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;

  const { data } = await axios.get(url);

  return data.items.map((video: any) => ({
    source: "youtube",
    key: video.id.videoId,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    description: video.snippet.description || "No description available.",
    thumbnail: video.snippet.thumbnails.default.url,
    publishAt: video.snippet.publishedAt,
  }));
}
