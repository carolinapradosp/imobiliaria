// app\admin\(protected)\imoveis\[id]\editar\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

import PropertyForm from "@/components/admin/properties/PropertyForm";
import { getPropertyById } from "@/repositories/propertiesRepository";

type EditPropertyPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: EditPropertyPageProps): Promise<Metadata> {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
        return {
            title: "Imóvel não encontrado",
        };
    }

    return {
        title: `Editar ${property.title}`,
    };
}

export default async function EditPropertyPage({
    params,
}: EditPropertyPageProps) {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
        notFound();
    }

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

                <span className="text-slate-700">
                    Editar {property.title}
                </span>
            </nav>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Editar imóvel
                </h1>

                <p className="mt-2 text-slate-600">
                    Atualize as informações do anúncio.
                </p>
            </div>

            <PropertyForm
                mode="edit"
                initialProperty={property}
            />
        </div>
    );
}