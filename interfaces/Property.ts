export type PropertyType =
  | "house"
  | "apartment"
  | "commercial"
  | "land";

export type PropertyPurpose = "sale" | "rent";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  condominium?: number;
  propertyTax?: number;
  city: string;
  state: string;
  neighborhood: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  area: number;
  images: string[];
  featured: boolean;
  active: boolean;
}