import { client } from "@/lib/sanity/client";
import { ALL_ARTICLES_QUERY } from "@/lib/sanity/queries";
import ConseilsClient from "./ConseilsClient";

export const revalidate = 60;

export default async function ConseilsPage() {
  const posts = await client.fetch(ALL_ARTICLES_QUERY);
  return <ConseilsClient posts={posts} />;
}
