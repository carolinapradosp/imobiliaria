import "server-only";

import type { Property } from "@/interfaces/Property";
import type { PropertyDatabaseRow } from "@/interfaces/PropertyDatabase";
import { sql } from "@/lib/database";
import { mapProperty } from "@/utils/mapProperty";

export async function getProperties(): Promise<Property[]> {
  const rows = (await sql`
    SELECT
      properties.id,
      properties.slug,
      properties.title,
      properties.description,
      properties.type,
      properties.purpose,
      properties.price,
      properties.condominium,
      properties.property_tax,
      properties.city,
      properties.state,
      properties.neighborhood,
      properties.bedrooms,
      properties.bathrooms,
      properties.parking_spaces,
      properties.area,
      properties.featured,
      properties.active,
      properties.created_at,
      properties.updated_at,
      COALESCE(
        JSON_AGG(
          property_images.image_url
          ORDER BY property_images.position
        ) FILTER (
          WHERE property_images.id IS NOT NULL
        ),
        '[]'::JSON
      ) AS images
    FROM properties
    LEFT JOIN property_images
      ON property_images.property_id = properties.id
    GROUP BY properties.id
    ORDER BY properties.created_at DESC
  `) as PropertyDatabaseRow[];

  return rows.map(mapProperty);
}

export async function getActiveProperties(): Promise<Property[]> {
  const properties = await getProperties();

  return properties.filter((property) => property.active);
}

export async function getPropertyById(
  id: string,
): Promise<Property | null> {
  const rows = (await sql`
    SELECT
      properties.id,
      properties.slug,
      properties.title,
      properties.description,
      properties.type,
      properties.purpose,
      properties.price,
      properties.condominium,
      properties.property_tax,
      properties.city,
      properties.state,
      properties.neighborhood,
      properties.bedrooms,
      properties.bathrooms,
      properties.parking_spaces,
      properties.area,
      properties.featured,
      properties.active,
      properties.created_at,
      properties.updated_at,
      COALESCE(
        JSON_AGG(
          property_images.image_url
          ORDER BY property_images.position
        ) FILTER (
          WHERE property_images.id IS NOT NULL
        ),
        '[]'::JSON
      ) AS images
    FROM properties
    LEFT JOIN property_images
      ON property_images.property_id = properties.id
    WHERE properties.id = ${id}
    GROUP BY properties.id
    LIMIT 1
  `) as PropertyDatabaseRow[];

  if (rows.length === 0) {
    return null;
  }

  return mapProperty(rows[0]);
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  const rows = (await sql`
    SELECT
      properties.id,
      properties.slug,
      properties.title,
      properties.description,
      properties.type,
      properties.purpose,
      properties.price,
      properties.condominium,
      properties.property_tax,
      properties.city,
      properties.state,
      properties.neighborhood,
      properties.bedrooms,
      properties.bathrooms,
      properties.parking_spaces,
      properties.area,
      properties.featured,
      properties.active,
      properties.created_at,
      properties.updated_at,
      COALESCE(
        JSON_AGG(
          property_images.image_url
          ORDER BY property_images.position
        ) FILTER (
          WHERE property_images.id IS NOT NULL
        ),
        '[]'::JSON
      ) AS images
    FROM properties
    LEFT JOIN property_images
      ON property_images.property_id = properties.id
    WHERE
      properties.slug = ${slug}
      AND properties.active = TRUE
    GROUP BY properties.id
    LIMIT 1
  `) as PropertyDatabaseRow[];

  if (rows.length === 0) {
    return null;
  }

  return mapProperty(rows[0]);
}