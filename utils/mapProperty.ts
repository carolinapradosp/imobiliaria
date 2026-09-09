import type { Property } from "@/interfaces/Property";
import type { PropertyDatabaseRow } from "@/interfaces/PropertyDatabase";

export function mapProperty(
  row: PropertyDatabaseRow,
): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    type: row.type,
    purpose: row.purpose,
    price: Number(row.price),
    condominium:
      row.condominium !== null
        ? Number(row.condominium)
        : undefined,
    propertyTax:
      row.property_tax !== null
        ? Number(row.property_tax)
        : undefined,
    city: row.city,
    state: row.state,
    neighborhood: row.neighborhood,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    parkingSpaces: row.parking_spaces ?? undefined,
    area: Number(row.area),
    images: row.images,
    featured: row.featured,
    active: row.active,
  };
}