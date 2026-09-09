import { loadEnvConfig } from "@next/env";

import { properties } from "../data/properties";

async function seedDatabase() {
  loadEnvConfig(process.cwd());

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "A variável DATABASE_URL não foi encontrada.",
    );
  }

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(databaseUrl);

  console.log("Iniciando carga dos imóveis...");

  for (const property of properties) {
    const rows = await sql`
      INSERT INTO properties (
        slug,
        title,
        description,
        type,
        purpose,
        price,
        condominium,
        property_tax,
        city,
        state,
        neighborhood,
        bedrooms,
        bathrooms,
        parking_spaces,
        area,
        featured,
        active
      )
      VALUES (
        ${property.slug},
        ${property.title},
        ${property.description},
        ${property.type},
        ${property.purpose},
        ${property.price},
        ${property.condominium ?? null},
        ${property.propertyTax ?? null},
        ${property.city},
        ${property.state},
        ${property.neighborhood},
        ${property.bedrooms ?? null},
        ${property.bathrooms ?? null},
        ${property.parkingSpaces ?? null},
        ${property.area},
        ${property.featured},
        ${property.active}
      )
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        type = EXCLUDED.type,
        purpose = EXCLUDED.purpose,
        price = EXCLUDED.price,
        condominium = EXCLUDED.condominium,
        property_tax = EXCLUDED.property_tax,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        neighborhood = EXCLUDED.neighborhood,
        bedrooms = EXCLUDED.bedrooms,
        bathrooms = EXCLUDED.bathrooms,
        parking_spaces = EXCLUDED.parking_spaces,
        area = EXCLUDED.area,
        featured = EXCLUDED.featured,
        active = EXCLUDED.active,
        updated_at = NOW()
      RETURNING id
    `;

    const propertyId = rows[0].id as string;

    /*
     * O seed substitui somente as imagens dos imóveis
     * encontrados no arquivo de mocks.
     */
    await sql`
      DELETE FROM property_images
      WHERE property_id = ${propertyId}
    `;

    for (const [position, imageUrl] of property.images.entries()) {
      await sql`
        INSERT INTO property_images (
          property_id,
          image_url,
          alt_text,
          position
        )
        VALUES (
          ${propertyId},
          ${imageUrl},
          ${property.title},
          ${position}
        )
      `;
    }

    console.log(`Imóvel carregado: ${property.title}`);
  }

  console.log("Carga inicial concluída com sucesso.");
}

seedDatabase().catch((error: unknown) => {
  console.error("Erro ao executar a carga inicial:", error);
  process.exitCode = 1;
});