import type { IconType } from "react-icons";
import {
    FaBuildingCircleCheck,
    FaHouse,
    FaHouseCircleCheck,
    FaHouseCircleXmark,
} from "react-icons/fa6";

import type { Property } from "@/interfaces/Property";

type DashboardStatsProps = {
    properties: Property[];
};

type StatCardProps = {
    label: string;
    value: number;
    icon: IconType;
    color: string;
};

function StatCard({
    label,
    value,
    icon: Icon,
    color,
}: StatCardProps) {
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </p>
                </div>

                <span
                    className={`flex size-11 items-center justify-center rounded-lg ${color}`}
                >
                    <Icon aria-hidden="true" />
                </span>
            </div>
        </article>
    );
}

export default function DashboardStats({
    properties,
}: DashboardStatsProps) {
    const total = properties.length;

    const active = properties.filter(
        (property) => property.active,
    ).length;

    const inactive = properties.filter(
        (property) => !property.active,
    ).length;

    const featured = properties.filter(
        (property) => property.featured,
    ).length;

    return (
        <section
            aria-label="Resumo dos anúncios"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
            <StatCard
                label="Total de imóveis"
                value={total}
                icon={FaHouse}
                color="bg-blue-100 text-blue-700"
            />

            <StatCard
                label="Anúncios ativos"
                value={active}
                icon={FaHouseCircleCheck}
                color="bg-emerald-100 text-emerald-700"
            />

            <StatCard
                label="Anúncios inativos"
                value={inactive}
                icon={FaHouseCircleXmark}
                color="bg-rose-100 text-rose-700"
            />

            <StatCard
                label="Imóveis em destaque"
                value={featured}
                icon={FaBuildingCircleCheck}
                color="bg-amber-100 text-amber-700"
            />
        </section>
    );
}