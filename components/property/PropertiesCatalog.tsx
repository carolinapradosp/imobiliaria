// components\property\PropertiesCatalog.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaChevronLeft,
    FaChevronRight,
    FaMagnifyingGlass,
} from "react-icons/fa6";

import PropertyFilters, {
    type PropertyFiltersState,
} from "@/components/home/PropertyFilters";
import PropertyList from "@/components/property/PropertyList";
import type { Property } from "@/interfaces/Property";

type PropertyOrder =
    | "recent"
    | "price-asc"
    | "price-desc";

type CatalogState = PropertyFiltersState & {
    search: string;
    order: PropertyOrder;
    page: number;
};

type PropertiesCatalogProps = {
    properties: Property[];
    initialState: CatalogState;
};

const ITEMS_PER_PAGE = 6;

function normalizeText(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export default function PropertiesCatalog({
    properties,
    initialState,
}: PropertiesCatalogProps) {
    const router = useRouter();

    const [catalog, setCatalog] =
        useState<CatalogState>(initialState);

    const cities = useMemo(() => {
        return [...new Set(properties.map((property) => property.city))]
            .sort((firstCity, secondCity) =>
                firstCity.localeCompare(secondCity, "pt-BR"),
            );
    }, [properties]);

    function updateUrl(nextState: CatalogState) {
        const params = new URLSearchParams();

        if (nextState.search) {
            params.set("search", nextState.search);
        }

        if (nextState.purpose) {
            params.set("purpose", nextState.purpose);
        }

        if (nextState.type) {
            params.set("type", nextState.type);
        }

        if (nextState.city) {
            params.set("city", nextState.city);
        }

        if (nextState.bedrooms) {
            params.set("bedrooms", nextState.bedrooms);
        }

        if (nextState.minPrice) {
            params.set("minPrice", nextState.minPrice);
        }

        if (nextState.maxPrice) {
            params.set("maxPrice", nextState.maxPrice);
        }

        if (nextState.order !== "recent") {
            params.set("order", nextState.order);
        }

        if (nextState.page > 1) {
            params.set("page", String(nextState.page));
        }

        const query = params.toString();

        router.replace(
            query ? `/imoveis?${query}` : "/imoveis",
            {
                scroll: false,
            },
        );
    }

    function updateCatalog(
        updates: Partial<CatalogState>,
        resetPage = true,
    ) {
        setCatalog((currentState) => {
            const nextState = {
                ...currentState,
                ...updates,
                page: resetPage
                    ? 1
                    : updates.page ?? currentState.page,
            };

            updateUrl(nextState);

            return nextState;
        });
    }

    const filteredProperties = useMemo(() => {
        const normalizedSearch = normalizeText(catalog.search);
        const minPrice = Number(catalog.minPrice);
        const maxPrice = Number(catalog.maxPrice);
        const minimumBedrooms = Number(catalog.bedrooms);

        const filtered = properties.filter((property) => {
            const searchableContent = normalizeText(
                [
                    property.title,
                    property.description,
                    property.city,
                    property.state,
                    property.neighborhood,
                ].join(" "),
            );

            const matchesSearch =
                normalizedSearch === "" ||
                searchableContent.includes(normalizedSearch);

            const matchesPurpose =
                catalog.purpose === "" ||
                property.purpose === catalog.purpose;

            const matchesType =
                catalog.type === "" ||
                property.type === catalog.type;

            const matchesCity =
                catalog.city === "" ||
                property.city === catalog.city;

            const matchesBedrooms =
                catalog.bedrooms === "" ||
                (property.bedrooms !== undefined &&
                    property.bedrooms >= minimumBedrooms);

            const matchesMinPrice =
                catalog.minPrice === "" ||
                property.price >= minPrice;

            const matchesMaxPrice =
                catalog.maxPrice === "" ||
                property.price <= maxPrice;

            return (
                matchesSearch &&
                matchesPurpose &&
                matchesType &&
                matchesCity &&
                matchesBedrooms &&
                matchesMinPrice &&
                matchesMaxPrice
            );
        });

        return filtered.sort((firstProperty, secondProperty) => {
            if (catalog.order === "price-asc") {
                return firstProperty.price - secondProperty.price;
            }

            if (catalog.order === "price-desc") {
                return secondProperty.price - firstProperty.price;
            }

            return 0;
        });
    }, [catalog, properties]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProperties.length / ITEMS_PER_PAGE),
    );

    const currentPage = Math.min(catalog.page, totalPages);

    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    function handleFilterChange(
        field: keyof PropertyFiltersState,
        value: string,
    ) {
        updateCatalog({
            [field]: value,
        });
    }

    function handleClearFilters() {
        const nextState: CatalogState = {
            search: "",
            purpose: "",
            type: "",
            city: "",
            bedrooms: "",
            minPrice: "",
            maxPrice: "",
            order: "recent",
            page: 1,
        };

        setCatalog(nextState);
        router.replace("/imoveis", { scroll: false });
    }

    function changePage(page: number) {
        updateCatalog(
            {
                page,
            },
            false,
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    Imóveis disponíveis
                </h1>

                <p className="mt-2 text-slate-600">
                    Encontre casas, apartamentos, terrenos e imóveis comerciais.
                </p>
            </div>

            <div className="relative mb-6">
                <FaMagnifyingGlass
                    aria-hidden="true"
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                />

                <label htmlFor="catalog-search" className="sr-only">
                    Buscar imóveis
                </label>

                <input
                    id="catalog-search"
                    type="search"
                    value={catalog.search}
                    onChange={(event) =>
                        updateCatalog({
                            search: event.target.value,
                        })
                    }
                    placeholder="Busque por imóvel, cidade ou bairro"
                    className="h-13 w-full rounded-xl border border-slate-300 bg-white pr-4 pl-11 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                />
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
                <PropertyFilters
                    filters={catalog}
                    cities={cities}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                <div>
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <p
                            className="text-sm font-medium text-slate-600"
                            aria-live="polite"
                        >
                            {filteredProperties.length}{" "}
                            {filteredProperties.length === 1
                                ? "imóvel encontrado"
                                : "imóveis encontrados"}
                        </p>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="property-order"
                                className="text-sm text-slate-600"
                            >
                                Ordenar:
                            </label>

                            <select
                                id="property-order"
                                value={catalog.order}
                                onChange={(event) =>
                                    updateCatalog({
                                        order: event.target.value as PropertyOrder,
                                    })
                                }
                                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-600"
                            >
                                <option value="recent">Mais recentes</option>
                                <option value="price-asc">
                                    Menor preço
                                </option>
                                <option value="price-desc">
                                    Maior preço
                                </option>
                            </select>
                        </div>
                    </div>

                    <PropertyList properties={paginatedProperties} />

                    {totalPages > 1 && (
                        <nav
                            aria-label="Paginação dos imóveis"
                            className="mt-8 flex items-center justify-center gap-3"
                        >
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => changePage(currentPage - 1)}
                                className="flex size-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Página anterior"
                            >
                                <FaChevronLeft aria-hidden="true" />
                            </button>

                            <span className="text-sm text-slate-600">
                                Página {currentPage} de {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => changePage(currentPage + 1)}
                                className="flex size-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Próxima página"
                            >
                                <FaChevronRight aria-hidden="true" />
                            </button>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}