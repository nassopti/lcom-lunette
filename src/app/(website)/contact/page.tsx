import { client } from "@/lib/sanity/client";
import { ALL_INSURANCES_QUERY } from "@/lib/sanity/queries";
import ContactClient from "./ContactClient";

export const revalidate = 60;

export default async function ContactPage() {
  const insurances = await client.fetch(ALL_INSURANCES_QUERY);
  const validInsuranceNames = insurances.map((ins: any) => ins.name);
  
  return <ContactClient validInsurances={validInsuranceNames} />;
}
