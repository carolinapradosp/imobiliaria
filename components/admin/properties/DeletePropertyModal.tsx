"use client";

import { useEffect } from "react";
import {
    FaTriangleExclamation,
    FaXmark,
} from "react-icons/fa6";

import type { Property } from "@/interfaces/Property";

type DeletePropertyModalProps = {
    property: Property | null;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function DeletePropertyModal({
    property,
    onCancel,
    onConfirm,
}: DeletePropertyModalProps) {
    useEffect(() => {
        if (!property) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onCancel();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onCancel, property]);

    if (!property) {
        return null;
    }

    return (
        <div
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-property-title"
                aria-describedby="delete-property-description"
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-700">
                        <FaTriangleExclamation aria-hidden="true" />
                    </span>

                    <button
                        type="button"
                        onClick={onCancel}
                        aria-label="Fechar confirmação"
                        className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <FaXmark aria-hidden="true" />
                    </button>
                </div>

                <h2
                    id="delete-property-title"
                    className="mt-5 text-xl font-bold text-slate-900"
                >
                    Excluir imóvel?
                </h2>

                <p
                    id="delete-property-description"
                    className="mt-3 leading-6 text-slate-600"
                >
                    O anúncio{" "}
                    <strong className="text-slate-900">
                        {property.title}
                    </strong>{" "}
                    será removido da listagem.
                </p>

                <p className="mt-3 text-sm text-slate-500">
                    Nesta versão, a exclusão é apenas uma simulação e será desfeita
                    ao atualizar a página.
                </p>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-11 rounded-lg border border-slate-300 px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-11 rounded-lg bg-rose-700 px-5 font-semibold text-white transition hover:bg-rose-800"
                    >
                        Excluir imóvel
                    </button>
                </div>
            </div>
        </div>
    );
}