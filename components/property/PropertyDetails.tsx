import {
    FaBed,
    FaBuilding,
    FaCar,
    FaHouse,
    FaLocationDot,
    FaRulerCombined,
    FaTreeCity,
} from "react-icons/fa6";
import { MdOutlineBathtub } from "react-icons/md";

import type { Property } from "@/interfaces/Property";
import { formatCurrency } from "@/utils/formatCurrency";

type PropertyDetailsProps = {
    property: Property;
};

const typeLabels: Record<Property["type"], string> = {
    house: "Casa",
    apartment: "Apartamento",
    commercial: "Imóvel comercial",
    land: "Terreno",
};

export default function PropertyDetails({
    property,
}: PropertyDetailsProps) {
    const features = [
        property.bedrooms !== undefined
            ? {
                label: "Quartos",
                value: property.bedrooms,
                icon: FaBed,
            }
            : null,
        property.bathrooms !== undefined
            ? {
                label: "Banheiros",
                value: property.bathrooms,
                icon: MdOutlineBathtub,
            }
            : null,
        property.parkingSpaces !== undefined
            ? {
                label: "Vagas",
                value: property.parkingSpaces,
                icon: FaCar,
            }
            : null,
        {
            label: "Área",
            value: `${property.area} m²`,
            icon: FaRulerCombined,
        },
        {
            label: "Tipo",
            value: typeLabels[property.type],
            icon: property.type === "apartment" ? FaBuilding : FaHouse,
        },
        {
            label: "Finalidade",
            value: property.purpose === "sale" ? "Venda" : "Aluguel",
            icon: FaTreeCity,
        },
    ].filter((feature) => feature !== null);

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-700 px-3 py-1 text-sm font-semibold text-white">
                    {property.purpose === "sale" ? "Venda" : "Aluguel"}
                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                    {typeLabels[property.type]}
                </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {property.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-slate-600">
                <FaLocationDot
                    className="shrink-0 text-blue-700"
                    aria-hidden="true"
                />

                {property.neighborhood}, {property.city} - {property.state}
            </p>

            <div className="mt-6">
                <p className="text-sm font-medium text-slate-500">
                    {property.purpose === "sale"
                        ? "Valor do imóvel"
                        : "Valor do aluguel"}
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-700">
                    {formatCurrency(property.price)}

                    {property.purpose === "rent" && (
                        <span className="text-base font-normal text-slate-500">
                            /mês
                        </span>
                    )}
                </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.label}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                        >
                            <Icon
                                className="text-xl text-blue-700"
                                aria-hidden="true"
                            />

                            <p className="mt-3 text-sm text-slate-500">
                                {feature.label}
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {feature.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <section className="mt-8 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    Sobre o imóvel
                </h2>

                <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                    {property.description}
                </p>
            </section>

            <section className="mt-8 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    Localização
                </h2>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
                    <p className="flex items-start gap-3 text-slate-700">
                        <FaLocationDot
                            className="mt-1 shrink-0 text-blue-700"
                            aria-hidden="true"
                        />

                        <span>
                            <strong className="block text-slate-900">
                                {property.neighborhood}
                            </strong>
                            {property.city} - {property.state}
                        </span>
                    </p>
                </div>
            </section>
        </div>
    );
}