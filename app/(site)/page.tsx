import PropertySearch from "@/components/home/PropertySearch";
import { getActiveProperties } from "@/repositories/propertiesRepository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await getActiveProperties();

  return <PropertySearch properties={properties} />;
}