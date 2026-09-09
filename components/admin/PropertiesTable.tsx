// components\admin\PropertiesTable.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
    FaArrowUpRightFromSquare,
    FaPen,
    FaTrash,
} from "react-icons/fa6";

import { deletePropertyAction } from "@/app/admin/(protected)/imoveis/actions";
import DeletePropertyModal from "@/components/admin/properties/DeletePropertyModal";
import type { Property } from "@/interfaces/Property";
import { formatCurrency } from "@/utils/formatCurrency";

type PropertiesTableProps = {
    properties: Property[];
};

const typeLabels: Record<Property["type"], string> = {
    house: "Casa",
    apartment: "Apartamento",
    commercial: "Comercial",
    land: "Terreno",
};

export default function PropertiesTable({
    properties: initialProperties,
}: PropertiesTableProps) {
    const router = useRouter();

    const [properties, setProperties] =
        useState<Property[]>(initialProperties);

    const [propertyToDelete, setPropertyToDelete] =
        useState<Property | null>(null);

    const [isDeleting, setIsDeleting] = useState(false);

    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const handleCloseModal = useCallback(() => {
        if (!isDeleting) {
            setPropertyToDelete(null);
        }
    }, [isDeleting]);

    async function handleConfirmDelete() {
        if (!propertyToDelete || isDeleting) {
            return;
        }

        const propertyId = propertyToDelete.id;

        setIsDeleting(true);
        setFeedback(null);

        try {
            const result = await deletePropertyAction(propertyId);

            if (!result.success) {
                setFeedback({
                    type: "error",
                    message: result.message,
                });

                return;
            }

            setProperties((currentProperties) =>
                currentProperties.filter(
                    (property) => property.id !== propertyId,
                ),
            );

            setPropertyToDelete(null);

            setFeedback({
                type: "success",
                message: result.message,
            });

            /*
             * Atualiza também os cards de estatísticas do dashboard.
             */
            router.refresh();
        } catch {
            setFeedback({
                type: "error",
                message: "Não foi possível excluir o imóvel.",
            });
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            {feedback && (
                <div
                    role={feedback.type === "error" ? "alert" : "status"}
                    className={`mb-5 flex items-center justify-between gap-4 rounded-lg border px-4 py-3 text-sm font-medium ${feedback.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-rose-200 bg-rose-50 text-rose-800"
                        }`}
                >
                    <span>{feedback.message}</span>

                    <button
                        type="button"
                        onClick={() => setFeedback(null)}
                        aria-label="Fechar mensagem"
                        className="shrink-0 font-bold"
                    >
                        ×
                    </button>
                </div>


            )}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                    <h2 className="text-lg font-bold text-slate-900">
                        Anúncios recentes
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Visualize e gerencie os imóveis cadastrados.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-215 text-left text-sm">
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
                            {properties.map((property) => (
                                <tr
                                    key={property.id}
                                    className="transition-colors hover:bg-slate-50"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex min-w-65 items-center gap-3">
                                            <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-200 text-xs text-slate-500">
                                                {property.images[0] ? (
                                                    <Image
                                                        src={property.images[0]}
                                                        alt=""
                                                        fill
                                                        sizes="56px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    "Sem foto"
                                                )}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {property.title}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {property.neighborhood}, {property.city}
                                                </p>
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
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${property.active
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-200 text-slate-600"
                                                }`}
                                        >
                                            {property.active ? "Ativo" : "Inativo"}
                                        </span>
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
                                                disabled={isDeleting}
                                                onClick={() => setPropertyToDelete(property)}
                                                aria-label={`Excluir ${property.title}`}
                                                title="Excluir"
                                                className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
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

                <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                    <p className="text-sm text-slate-500">
                        Exibindo {properties.length} imóveis
                    </p>

                    <Link
                        href="/admin/imoveis"
                        className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                        Ver todos
                    </Link>
                </div>
            </div>

            <DeletePropertyModal
                property={propertyToDelete}
                isDeleting={isDeleting}
                onCancel={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}