// app\(site)\imoveis\[slug]\page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

import PropertyContact from "@/components/property/PropertyContact";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyGallery from "@/components/property/PropertyGallery";
import { getPropertyBySlug } from "@/repositories/propertiesRepository";

type PropertyPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: PropertyPageProps): Promise<Metadata> {
    const { slug } = await params;
    const property = await getPropertyBySlug(slug);

    if (!property) {
        return {
            title: "Imóvel não encontrado",
        };
    }

    return {
        title: property.title,
        description: property.description,
        openGraph: {
            title: property.title,
            description: property.description,
            images: property.images[0]
                ? [
                    {
                        url: property.images[0],
                        alt: property.title,
                    },
                ]
                : [],
        },
    };
}

export default async function PropertyPage({
    params,
}: PropertyPageProps) {
    const { slug } = await params;
    const property = await getPropertyBySlug(slug);

    if (!property) {
        notFound();
    }

    return (
        <div className="bg-slate-50">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <nav
                    aria-label="Navegação estrutural"
                    className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
                >
                    <Link href="/" className="hover:text-blue-700">
                        Início
                    </Link>

                    <FaChevronRight
                        className="text-xs text-slate-400"
                        aria-hidden="true"
                    />

                    <Link href="/imoveis" className="hover:text-blue-700">
                        Imóveis
                    </Link>

                    <FaChevronRight
                        className="text-xs text-slate-400"
                        aria-hidden="true"
                    />

                    <span className="text-slate-700">
                        {property.title}
                    </span>
                </nav>

                <PropertyGallery
                    images={property.images}
                    title={property.title}
                />

                <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
                    <PropertyDetails property={property} />

                    <PropertyContact propertyTitle={property.title} />
                </div>
            </div>
        </div>
    );
}