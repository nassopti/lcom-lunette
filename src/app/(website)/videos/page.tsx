import { client } from "@/lib/sanity/client";
import { ALL_VIDEOS_QUERY } from "@/lib/sanity/queries";
import VideosClient from "./VideosClient";

export const revalidate = 60;

export default async function VideosPage() {
  const videos = await client.fetch(ALL_VIDEOS_QUERY);
  return <VideosClient videos={videos} />;
}
