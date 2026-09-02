import Image from "next/image";
import Link from "next/link";
import {
    FaArrowRight,
    FaBed,
    FaCar,
    FaLocationDot,
    FaRulerCombined,
} from "react-icons/fa6";
import { MdOutlineBathtub } from "react-icons/md";

import type { Property } from "@/interfaces/Property";
import { formatCurrency } from "@/utils/formatCurrency";

type PropertyCardProps = {
    property: Property;
};

const typeLabels: Record<Property["type"], string> = {
    house: "Casa",
    apartment: "Apartamento",
    commercial: "Comercial",
    land: "Terreno",
};

export default function PropertyCard({
    property,
}: PropertyCardProps) {
    return (
        <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link
                href={`/imoveis/${property.slug}`}
                className="relative block aspect-16/10 overflow-hidden bg-slate-200"
            >
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                        {property.purpose === "sale" ? "Venda" : "Aluguel"}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                        {typeLabels[property.type]}
                    </span>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <FaLocationDot
                        className="shrink-0 text-blue-700"
                        aria-hidden="true"
                    />

                    <span>
                        {property.neighborhood}, {property.city} - {property.state}
                    </span>
                </div>

                <h2 className="mt-3 text-lg font-semibold text-slate-900">
                    <Link
                        href={`/imoveis/${property.slug}`}
                        className="transition-colors hover:text-blue-700"
                    >
                        {property.title}
                    </Link>
                </h2>

                <p className="mt-3 text-2xl font-bold text-blue-700">
                    {formatCurrency(property.price)}

                    {property.purpose === "rent" && (
                        <span className="text-sm font-normal text-slate-500">
                            /mês
                        </span>
                    )}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 border-y border-slate-100 py-4 text-sm text-slate-600">
                    {property.bedrooms !== undefined && (
                        <span className="flex items-center gap-1.5">
                            <FaBed aria-hidden="true" />
                            {property.bedrooms} quartos
                        </span>
                    )}

                    {property.bathrooms !== undefined && (
                        <span className="flex items-center gap-1.5">
                            <MdOutlineBathtub aria-hidden="true" />
                            {property.bathrooms} banheiros
                        </span>
                    )}

                    {property.parkingSpaces !== undefined && (
                        <span className="flex items-center gap-1.5">
                            <FaCar aria-hidden="true" />
                            {property.parkingSpaces} vagas
                        </span>
                    )}

                    <span className="flex items-center gap-1.5">
                        <FaRulerCombined aria-hidden="true" />
                        {property.area} m²
                    </span>
                </div>

                <Link
                    href={`/imoveis/${property.slug}`}
                    className="mt-5 flex items-center justify-between font-semibold text-blue-700 transition-colors hover:text-blue-900"
                >
                    Ver detalhes
                    <FaArrowRight aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}