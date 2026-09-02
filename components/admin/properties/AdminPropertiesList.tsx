"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
    FaArrowUpRightFromSquare,
    FaHouseCircleXmark,
    FaPen,
    FaTrash,
} from "react-icons/fa6";

import type { Property } from "@/interfaces/Property";
import { formatCurrency } from "@/utils/formatCurrency";

import AdminPropertyFilters, {
    type AdminPropertyFiltersState,
} from "./AdminPropertyFilters";
import DeletePropertyModal from "./DeletePropertyModal";
import PropertyStatusSwitch from "./PropertyStatusSwitch";

type AdminPropertiesListProps = {
    initialProperties: Property[];
};

const initialFilters: AdminPropertyFiltersState = {
    search: "",
    type: "",
    purpose: "",
    status: "",
};

const typeLabels: Record<Property["type"], string> = {
    house: "Casa",
    apartment: "Apartamento",
    commercial: "Comercial",
    land: "Terreno",
};

function normalizeText(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export default function AdminPropertiesList({
    initialProperties,
}: AdminPropertiesListProps) {
    const [properties, setProperties] =
        useState<Property[]>(initialProperties);

    const [filters, setFilters] =
        useState<AdminPropertyFiltersState>(initialFilters);

    const [propertyToDelete, setPropertyToDelete] =
        useState<Property | null>(null);

    const [feedbackMessage, setFeedbackMessage] = useState("");

    const filteredProperties = useMemo(() => {
        const normalizedSearch = normalizeText(filters.search);

        return properties.filter((property) => {
            const searchableContent = normalizeText(
                [
                    property.title,
                    property.city,
                    property.neighborhood,
                ].join(" "),
            );

            const matchesSearch =
                normalizedSearch === "" ||
                searchableContent.includes(normalizedSearch);

            const matchesType =
                filters.type === "" || property.type === filters.type;

            const matchesPurpose =
                filters.purpose === "" ||
                property.purpose === filters.purpose;

            const matchesStatus =
                filters.status === "" ||
                (filters.status === "active" && property.active) ||
                (filters.status === "inactive" && !property.active);

            return (
                matchesSearch &&
                matchesType &&
                matchesPurpose &&
                matchesStatus
            );
        });
    }, [filters, properties]);

    function handleFilterChange(
        field: keyof AdminPropertyFiltersState,
        value: string,
    ) {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [field]: value,
        }));
    }

    function handleClearFilters() {
        setFilters(initialFilters);
    }

    function handleToggleStatus(propertyId: string) {
        let updatedProperty: Property | undefined;

        setProperties((currentProperties) =>
            currentProperties.map((property) => {
                if (property.id !== propertyId) {
                    return property;
                }

                updatedProperty = {
                    ...property,
                    active: !property.active,
                };

                return updatedProperty;
            }),
        );

        if (updatedProperty) {
            setFeedbackMessage(
                `O anúncio foi ${updatedProperty.active ? "ativado" : "desativado"
                } com sucesso.`,
            );
        }
    }

    const handleCloseDeleteModal = useCallback(() => {
        setPropertyToDelete(null);
    }, []);

    function handleConfirmDelete() {
        if (!propertyToDelete) {
            return;
        }

        setProperties((currentProperties) =>
            currentProperties.filter(
                (property) => property.id !== propertyToDelete.id,
            ),
        );

        setFeedbackMessage("O imóvel foi excluído com sucesso.");
        setPropertyToDelete(null);
    }

    return (
        <>
            {feedbackMessage && (
                <div
                    role="status"
                    className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                >
                    <span>{feedbackMessage}</span>

                    <button
                        type="button"
                        onClick={() => setFeedbackMessage("")}
                        className="shrink-0 font-bold hover:text-emerald-950"
                        aria-label="Fechar mensagem"
                    >
                        ×
                    </button>
                </div>
            )}

            <AdminPropertyFilters
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
            />

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-bold text-slate-900">
                            Imóveis cadastrados
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {filteredProperties.length}{" "}
                            {filteredProperties.length === 1
                                ? "resultado encontrado"
                                : "resultados encontrados"}
                        </p>
                    </div>

                    <p className="text-sm text-slate-500">
                        Total cadastrado: {properties.length}
                    </p>
                </div>

                {filteredProperties.length === 0 ? (
                    <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
                        <FaHouseCircleXmark
                            className="text-5xl text-slate-300"
                            aria-hidden="true"
                        />

                        <h2 className="mt-4 text-xl font-semibold text-slate-900">
                            Nenhum imóvel encontrado
                        </h2>

                        <p className="mt-2 max-w-md text-slate-500">
                            Modifique os filtros para encontrar outros imóveis.
                        </p>

                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="mt-5 font-semibold text-blue-700 hover:text-blue-900"
                        >
                            Limpar filtros
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-240 text-left text-sm">
                            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                                <tr>
                                    <th scope="col" className="px-5 py-3 font-semibold">
                                        Imóvel
                                    </th>

                                    <th scope="col" className="px-5 py-3 font-semibold">
                                        Tipo
                                    </th>

                                    <th scope="col" className="px-5 py-3 font-semibold">
                                        Finalidade
                                    </th>

                                    <th scope="col" className="px-5 py-3 font-semibold">
                                        Valor
                                    </th>

                                    <th scope="col" className="px-5 py-3 font-semibold">
                                        Status
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-right font-semibold"
                                    >
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredProperties.map((property) => (
                                    <tr
                                        key={property.id}
                                        className="transition-colors hover:bg-slate-50"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex min-w-70 items-center gap-3">
                                                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                                                    <Image
                                                        src={property.images[0]}
                                                        alt=""
                                                        fill
                                                        sizes="56px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {property.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {property.neighborhood}, {property.city}
                                                    </p>

                                                    {property.featured && (
                                                        <span className="mt-1 inline-block text-xs font-semibold text-amber-700">
                                                            Destaque
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {typeLabels[property.type]}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {property.purpose === "sale"
                                                ? "Venda"
                                                : "Aluguel"}
                                        </td>

                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            {formatCurrency(property.price)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <PropertyStatusSwitch
                                                checked={property.active}
                                                propertyTitle={property.title}
                                                onChange={() =>
                                                    handleToggleStatus(property.id)
                                                }
                                            />
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <Link
                                                    href={`/imoveis/${property.slug}`}
                                                    target="_blank"
                                                    aria-label={`Visualizar ${property.title}`}
                                                    title="Visualizar"
                                                    className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
                                                >
                                                    <FaArrowUpRightFromSquare aria-hidden="true" />
                                                </Link>

                                                <Link
                                                    href={`/admin/imoveis/${property.id}/editar`}
                                                    aria-label={`Editar ${property.title}`}
                                                    title="Editar"
                                                    className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
                                                >
                                                    <FaPen aria-hidden="true" />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => setPropertyToDelete(property)}
                                                    aria-label={`Excluir ${property.title}`}
                                                    title="Excluir"
                                                    className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
                                                >
                                                    <FaTrash aria-hidden="true" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <DeletePropertyModal
                property={propertyToDelete}
                onCancel={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}