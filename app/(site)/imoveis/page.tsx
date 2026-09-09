// app\(site)\imoveis\page.tsx
import type { Metadata } from "next";

import PropertiesCatalog from "@/components/property/PropertiesCatalog";
import type {
    PropertyPurpose,
    PropertyType,
} from "@/interfaces/Property";
import { getActiveProperties } from "@/repositories/propertiesRepository";

export const metadata: Metadata = {
    title: "Imóveis",
    description:
        "Confira casas, apartamentos, terrenos e imóveis comerciais disponíveis para venda e aluguel.",
};

export const dynamic = "force-dynamic";

type PropertiesPageProps = {
    searchParams: Promise<{
        search?: string;
        purpose?: string;
        type?: string;
        city?: string;
        bedrooms?: string;
        minPrice?: string;
        maxPrice?: string;
        order?: string;
        page?: string;
    }>;
};

function getPurpose(
    value?: string,
): PropertyPurpose | "" {
    return value === "sale" || value === "rent"
        ? value
        : "";
}

function getType(
    value?: string,
): PropertyType | "" {
    const validTypes: PropertyType[] = [
        "house",
        "apartment",
        "commercial",
        "land",
    ];

    return validTypes.includes(value as PropertyType)
        ? (value as PropertyType)
        : "";
}

function getOrder(
    value?: string,
): "recent" | "price-asc" | "price-desc" {
    if (
        value === "price-asc" ||
        value === "price-desc"
    ) {
        return value;
    }

    return "recent";
}

export default async function PropertiesPage({
    searchParams,
}: PropertiesPageProps) {
    const [properties, params] = await Promise.all([
        getActiveProperties(),
        searchParams,
    ]);

    const parsedPage = Number(params.page);

    const initialState = {
        search: params.search ?? "",
        purpose: getPurpose(params.purpose),
        type: getType(params.type),
        city: params.city ?? "",
        bedrooms: params.bedrooms ?? "",
        minPrice: params.minPrice ?? "",
        maxPrice: params.maxPrice ?? "",
        order: getOrder(params.order),
        page:
            Number.isInteger(parsedPage) && parsedPage > 0
                ? parsedPage
                : 1,
    };

    return (
        <PropertiesCatalog
            properties={properties}
            initialState={initialState}
        />
    );
}