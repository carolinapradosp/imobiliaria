// app\admin\(protected)\imoveis\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import AdminPropertiesList from "@/components/admin/properties/AdminPropertiesList";
import { getProperties } from "@/repositories/propertiesRepository";

export const metadata: Metadata = {
    title: "Imóveis",
};

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
    const properties = await getProperties();

    return (
        <div className="mx-auto max-w-400">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Imóveis
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Gerencie todos os anúncios cadastrados.
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

            <AdminPropertiesList initialProperties={properties} />
        </div>
    );
}