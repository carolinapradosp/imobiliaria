import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import DashboardStats from "@/components/admin/DashboardStats";
import PropertiesTable from "@/components/admin/PropertiesTable";
import { getProperties } from "@/repositories/propertiesRepository";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const properties = await getProperties();

    return (
        <div className="mx-auto max-w-400">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Acompanhe e gerencie os anúncios da imobiliária.
                    </p>
                </div>

                <Link
                    href="/admin/imoveis/novo"
                    className="flex h-11 items-center justify-center gap-2 self-start rounded-lg bg-blue-700 px-4 font-semibold text-white transition-colors hover:bg-blue-800"
                >
                    <FaPlus aria-hidden="true" />
                    Cadastrar imóvel
                </Link>
            </div>

            <DashboardStats properties={properties} />

            <section className="mt-8">
                <PropertiesTable properties={properties} />
            </section>
        </div>
    );
}