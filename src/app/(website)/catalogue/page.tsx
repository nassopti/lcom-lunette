import { client } from "@/lib/sanity/client";
import { ALL_FRAMES_QUERY } from "@/lib/sanity/queries";
import CatalogueClient from "./CatalogueClient";

export const revalidate = 60;

export default async function CataloguePage() {
  const frames = await client.fetch(ALL_FRAMES_QUERY);
  return <CatalogueClient frames={frames} />;
}
