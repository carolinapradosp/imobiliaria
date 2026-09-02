"use client";

import { useMemo, useState } from "react";

import type { Property } from "@/interfaces/Property";

import PropertyList from "@/components/property/PropertyList";

import Hero from "./Hero";
import PropertyFilters, {
    type PropertyFiltersState,
} from "./PropertyFilters";

type PropertySearchProps = {
    properties: Property[];
};

const initialFilters: PropertyFiltersState = {
    purpose: "",
    type: "",
    city: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
};

function normalizeText(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export default function PropertySearch({
    properties,
}: PropertySearchProps) {
    const [search, setSearch] = useState("");
    const [filters, setFilters] =
        useState<PropertyFiltersState>(initialFilters);

    const cities = useMemo(() => {
        return [...new Set(properties.map((property) => property.city))].sort(
            (firstCity, secondCity) =>
                firstCity.localeCompare(secondCity, "pt-BR"),
        );
    }, [properties]);

    const filteredProperties = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        const minPrice = Number(filters.minPrice);
        const maxPrice = Number(filters.maxPrice);
        const minimumBedrooms = Number(filters.bedrooms);

        return properties.filter((property) => {
            if (!property.active) {
                return false;
            }

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
                filters.purpose === "" ||
                property.purpose === filters.purpose;

            const matchesType =
                filters.type === "" || property.type === filters.type;

            const matchesCity =
                filters.city === "" || property.city === filters.city;

            const matchesBedrooms =
                filters.bedrooms === "" ||
                (property.bedrooms !== undefined &&
                    property.bedrooms >= minimumBedrooms);

            const matchesMinPrice =
                filters.minPrice === "" || property.price >= minPrice;

            const matchesMaxPrice =
                filters.maxPrice === "" || property.price <= maxPrice;

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
    }, [filters, properties, search]);

    function handleFilterChange(
        field: keyof PropertyFiltersState,
        value: string,
    ) {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [field]: value,
        }));
    }

    function handleClearFilters() {
        setSearch("");
        setFilters(initialFilters);
    }

    return (
        <>
            <Hero search={search} onSearchChange={setSearch} />

            <section
                id="imoveis"
                className="mx-auto w-full max-w-7xl scroll-mt-8 px-4 py-12 sm:px-6 lg:px-8"
            >
                <div className="mb-8">
                    <span className="text-sm font-semibold tracking-wide text-blue-700 uppercase">
                        Oportunidades
                    </span>

                    <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                Imóveis disponíveis
                            </h2>

                            <p className="mt-2 text-slate-600">
                                Encontre o imóvel que combina com o que você procura.
                            </p>
                        </div>

                        <p
                            className="text-sm font-medium text-slate-600"
                            aria-live="polite"
                        >
                            {filteredProperties.length}{" "}
                            {filteredProperties.length === 1
                                ? "imóvel encontrado"
                                : "imóveis encontrados"}
                        </p>
                    </div>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
                    <PropertyFilters
                        filters={filters}
                        cities={cities}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />

                    <PropertyList properties={filteredProperties} />
                </div>
            </section>
        </>
    );
}