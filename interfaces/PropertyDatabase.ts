import type {
  PropertyPurpose,
  PropertyType,
} from "@/interfaces/Property";

export interface PropertyDatabaseRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price: string;
  condominium: string | null;
  property_tax: string | null;
  city: string;
  state: string;
  neighborhood: string;
  bedrooms: number | null;
  bathrooms: number | null;
  parking_spaces: number | null;
  area: string;
  featured: boolean;
  active: boolean;
  images: string[];
  created_at: Date | string;
  updated_at: Date | string;
}