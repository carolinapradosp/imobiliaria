import PropertySearch from "@/components/home/PropertySearch";
import { properties } from "@/data/properties";

export default function Home() {
  return <PropertySearch properties={properties} />;
}