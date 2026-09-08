// app\admin\(protected)\imoveis\actions.ts
"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import type {
  PropertyActionState,
  PropertyMutationInput,
} from "@/interfaces/PropertyMutation";
import { sql } from "@/lib/database";
import { requireAdmin } from "@/lib/session";

const propertyTypes = [
  "house",
  "apartment",
  "commercial",
  "land",
];

const propertyPurposes = ["sale", "rent"];

function isVercelBlobUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.hostname.endsWith(
      ".public.blob.vercel-storage.com",
    );
  } catch {
    return false;
  }
}

function validatePropertyInput(
  input: PropertyMutationInput,
): string | null {
  if (
    !input.title.trim() ||
    !input.slug.trim() ||
    !input.description.trim()
  ) {
    return "Preencha título, slug e descrição.";
  }

  if (
    !propertyTypes.includes(input.type) ||
    !propertyPurposes.includes(input.purpose)
  ) {
    return "Tipo ou finalidade inválidos.";
  }

  if (
    !input.city.trim() ||
    !input.state.trim() ||
    !input.neighborhood.trim()
  ) {
    return "Preencha os dados de localização.";
  }

  if (!Number.isFinite(input.price) || input.price < 0) {
    return "Informe um valor válido.";
  }

  if (!Number.isFinite(input.area) || input.area <= 0) {
    return "Informe uma área válida.";
  }

  if (input.state.length !== 2) {
    return "Informe uma sigla de estado válida.";
  }

  if (input.images.length === 0) {
    return "Adicione pelo menos uma imagem.";
  }

  if (input.images.length > 20) {
    return "Cada imóvel pode possuir no máximo 20 imagens.";
  }

  const hasInvalidImage = input.images.some((image) => {
    try {
      const imageUrl = new URL(image);

      return imageUrl.protocol !== "https:";
    } catch {
      return true;
    }
  });

  if (hasInvalidImage) {
    return "Uma ou mais URLs de imagem são inválidas.";
  }

  return null;
}

function revalidatePropertyPaths(
  currentSlug?: string,
  previousSlug?: string,
) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/imoveis");

  if (currentSlug) {
    revalidatePath(`/imoveis/${currentSlug}`);
  }

  if (previousSlug && previousSlug !== currentSlug) {
    revalidatePath(`/imoveis/${previousSlug}`);
  }
}

function getDatabaseErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  ) {
    return "Já existe um imóvel utilizando este slug.";
  }

  return "Não foi possível salvar o imóvel.";
}

export async function createPropertyAction(
  input: PropertyMutationInput,
): Promise<PropertyActionState> {
  await requireAdmin();

  const validationError = validatePropertyInput(input);

  if (validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  let propertyId: string | null = null;

  try {
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
        ${input.slug.trim()},
        ${input.title.trim()},
        ${input.description.trim()},
        ${input.type},
        ${input.purpose},
        ${input.price},
        ${input.condominium ?? null},
        ${input.propertyTax ?? null},
        ${input.city.trim()},
        ${input.state.trim().toUpperCase()},
        ${input.neighborhood.trim()},
        ${input.type === "land"
          ? null
          : input.bedrooms ?? null},
        ${input.type === "land"
          ? null
          : input.bathrooms ?? null},
        ${input.type === "land"
          ? null
          : input.parkingSpaces ?? null},
        ${input.area},
        ${input.featured},
        ${input.active}
      )
      RETURNING id
    `;

    propertyId = rows[0].id as string;

    for (const [position, imageUrl] of input.images.entries()) {
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
          ${input.title.trim()},
          ${position}
        )
      `;
    }

    revalidatePropertyPaths(input.slug);

    return {
      success: true,
      message: "Imóvel cadastrado com sucesso.",
      propertyId,
      slug: input.slug,
    };
  } catch (error: unknown) {
    /*
     * Se o imóvel foi criado, mas ocorreu erro ao salvar as
     * imagens, removemos o registro incompleto.
     */
    if (propertyId) {
      await sql`
        DELETE FROM properties
        WHERE id = ${propertyId}
      `;
    }

    const uploadedBlobUrls = input.images.filter(
      isVercelBlobUrl,
    );

    if (uploadedBlobUrls.length > 0) {
      try {
        await del(uploadedBlobUrls);
      } catch {
        // O erro principal continuará sendo retornado ao formulário.
      }
    }

    return {
      success: false,
      message: getDatabaseErrorMessage(error),
    };
  }
}

export async function updatePropertyAction(
  input: PropertyMutationInput,
): Promise<PropertyActionState> {
  await requireAdmin();

  if (!input.id) {
    return {
      success: false,
      message: "Identificador do imóvel não informado.",
    };
  }

  const validationError = validatePropertyInput(input);

  if (validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  try {
    const currentRows = await sql`
      SELECT slug
      FROM properties
      WHERE id = ${input.id}
      LIMIT 1
    `;

    if (currentRows.length === 0) {
      return {
        success: false,
        message: "Imóvel não encontrado.",
      };
    }

    const previousSlug = currentRows[0].slug as string;

    const imageRows = await sql`
      SELECT image_url
      FROM property_images
      WHERE property_id = ${input.id}
    `;

    const previousImages = imageRows.map(
      (row) => row.image_url as string,
    );

    await sql`
      UPDATE properties
      SET
        slug = ${input.slug.trim()},
        title = ${input.title.trim()},
        description = ${input.description.trim()},
        type = ${input.type},
        purpose = ${input.purpose},
        price = ${input.price},
        condominium = ${input.condominium ?? null},
        property_tax = ${input.propertyTax ?? null},
        city = ${input.city.trim()},
        state = ${input.state.trim().toUpperCase()},
        neighborhood = ${input.neighborhood.trim()},
        bedrooms = ${
          input.type === "land"
            ? null
            : input.bedrooms ?? null
        },
        bathrooms = ${
          input.type === "land"
            ? null
            : input.bathrooms ?? null
        },
        parking_spaces = ${
          input.type === "land"
            ? null
            : input.parkingSpaces ?? null
        },
        area = ${input.area},
        featured = ${input.featured},
        active = ${input.active},
        updated_at = NOW()
      WHERE id = ${input.id}
    `;

    await sql`
      DELETE FROM property_images
      WHERE property_id = ${input.id}
    `;

    for (const [position, imageUrl] of input.images.entries()) {
      await sql`
        INSERT INTO property_images (
          property_id,
          image_url,
          alt_text,
          position
        )
        VALUES (
          ${input.id},
          ${imageUrl},
          ${input.title.trim()},
          ${position}
        )
      `;
    }

    const removedBlobUrls = previousImages.filter(
      (previousImage) =>
        !input.images.includes(previousImage) &&
        isVercelBlobUrl(previousImage),
    );

    if (removedBlobUrls.length > 0) {
      try {
        await del(removedBlobUrls);
      } catch {
        /*
         * O imóvel já foi atualizado. Uma falha ao limpar o Blob
         * não deve desfazer os dados salvos no PostgreSQL.
         */
      }
    }

    revalidatePropertyPaths(input.slug, previousSlug);

    return {
      success: true,
      message: "Imóvel atualizado com sucesso.",
      propertyId: input.id,
      slug: input.slug,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getDatabaseErrorMessage(error),
    };
  }
}

export async function togglePropertyStatusAction(
  propertyId: string,
): Promise<PropertyActionState> {
  await requireAdmin();

  try {
    const rows = await sql`
      UPDATE properties
      SET
        active = NOT active,
        updated_at = NOW()
      WHERE id = ${propertyId}
      RETURNING active, slug
    `;

    if (rows.length === 0) {
      return {
        success: false,
        message: "Imóvel não encontrado.",
      };
    }

    const active = rows[0].active as boolean;
    const slug = rows[0].slug as string;

    revalidatePropertyPaths(slug);

    return {
      success: true,
      active,
      slug,
      message: active
        ? "Anúncio ativado com sucesso."
        : "Anúncio desativado com sucesso.",
    };
  } catch {
    return {
      success: false,
      message: "Não foi possível alterar o status.",
    };
  }
}

export async function deletePropertyAction(
  propertyId: string,
): Promise<PropertyActionState> {
  await requireAdmin();

  try {
    const propertyRows = await sql`
      SELECT slug
      FROM properties
      WHERE id = ${propertyId}
      LIMIT 1
    `;

    if (propertyRows.length === 0) {
      return {
        success: false,
        message: "Imóvel não encontrado.",
      };
    }

    const slug = propertyRows[0].slug as string;

    const imageRows = await sql`
      SELECT image_url
      FROM property_images
      WHERE property_id = ${propertyId}
    `;

    const blobUrls = imageRows
      .map((row) => row.image_url as string)
      .filter(isVercelBlobUrl);

    await sql`
      DELETE FROM properties
      WHERE id = ${propertyId}
    `;

    if (blobUrls.length > 0) {
      try {
        await del(blobUrls);
      } catch {
        /*
         * O imóvel já foi removido do banco. Uma eventual imagem
         * órfã poderá ser limpa posteriormente no painel do Blob.
         */
      }
    }

    revalidatePropertyPaths(slug);

    return {
      success: true,
      message: "Imóvel excluído com sucesso.",
      slug,
    };
  } catch {
    return {
      success: false,
      message: "Não foi possível excluir o imóvel.",
    };
  }
}

export async function cleanupPropertyUploadsAction(
  urls: string[],
): Promise<void> {
  await requireAdmin();

  const blobUrls = urls.filter((url) => {
    try {
      const parsedUrl = new URL(url);

      return parsedUrl.hostname.endsWith(
        ".public.blob.vercel-storage.com",
      );
    } catch {
      return false;
    }
  });

  if (blobUrls.length === 0) {
    return;
  }

  try {
    await del(blobUrls);
  } catch {
    /*
     * Essa é apenas uma limpeza de arquivos temporários.
     * Uma falha aqui não deve interromper o formulário.
     */
  }
}