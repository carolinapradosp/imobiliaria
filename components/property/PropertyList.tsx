import { FaHouseCircleXmark } from "react-icons/fa6";

import type { Property } from "@/interfaces/Property";

import PropertyCard from "./PropertyCard";

type PropertyListProps = {
    properties: Property[];
};

export default function PropertyList({
    properties,
}: PropertyListProps) {
    if (properties.length === 0) {
        return (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <FaHouseCircleXmark
                    className="text-5xl text-slate-300"
                    aria-hidden="true"
                />

                <h2 className="mt-4 text-xl font-semibold text-slate-900">
                    Nenhum imóvel encontrado
                </h2>

                <p className="mt-2 max-w-md text-slate-500">
                    Tente modificar ou remover alguns filtros para encontrar outros
                    imóveis.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}