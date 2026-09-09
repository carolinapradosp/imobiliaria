// app\admin\(protected)\imoveis\novo\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import PropertyForm from "@/components/admin/properties/PropertyForm";

export const metadata: Metadata = {
    title: "Cadastrar imóvel",
};

export default function CreatePropertyPage() {
    return (
        <div className="mx-auto max-w-400">
            <nav
                aria-label="Navegação estrutural"
                className="mb-5 flex items-center gap-2 text-sm text-slate-500"
            >
                <Link
                    href="/admin/imoveis"
                    className="hover:text-blue-700"
                >
                    Imóveis
                </Link>

                <FaChevronRight
                    className="text-xs"
                    aria-hidden="true"
                />

                <span className="text-slate-700">Cadastrar</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Cadastrar imóvel
                </h1>

                <p className="mt-2 text-slate-600">
                    Preencha as informações do novo anúncio.
                </p>
            </div>

            <PropertyForm mode="create" />
        </div>
    );
}