import {
    FaMagnifyingGlass,
    FaRotateLeft,
} from "react-icons/fa6";

import type {
    PropertyPurpose,
    PropertyType,
} from "@/interfaces/Property";

export type AdminPropertyFiltersState = {
    search: string;
    type: PropertyType | "";
    purpose: PropertyPurpose | "";
    status: "active" | "inactive" | "";
};

type AdminPropertyFiltersProps = {
    filters: AdminPropertyFiltersState;
    onChange: (
        field: keyof AdminPropertyFiltersState,
        value: string,
    ) => void;
    onClear: () => void;
};

const fieldClassName =
    "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10";

export default function AdminPropertyFilters({
    filters,
    onChange,
    onClear,
}: AdminPropertyFiltersProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">
                <div>
                    <label htmlFor="admin-search" className="sr-only">
                        Buscar imóveis
                    </label>

                    <div className="relative">
                        <FaMagnifyingGlass
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                            aria-hidden="true"
                        />

                        <input
                            id="admin-search"
                            type="search"
                            value={filters.search}
                            onChange={(event) =>
                                onChange("search", event.target.value)
                            }
                            placeholder="Buscar por título, cidade ou bairro"
                            className={`${fieldClassName} pl-10`}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="admin-type" className="sr-only">
                        Tipo do imóvel
                    </label>

                    <select
                        id="admin-type"
                        value={filters.type}
                        onChange={(event) =>
                            onChange("type", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Todos os tipos</option>
                        <option value="house">Casa</option>
                        <option value="apartment">Apartamento</option>
                        <option value="commercial">Comercial</option>
                        <option value="land">Terreno</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="admin-purpose" className="sr-only">
                        Finalidade
                    </label>

                    <select
                        id="admin-purpose"
                        value={filters.purpose}
                        onChange={(event) =>
                            onChange("purpose", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Todas as finalidades</option>
                        <option value="sale">Venda</option>
                        <option value="rent">Aluguel</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="admin-status" className="sr-only">
                        Status
                    </label>

                    <select
                        id="admin-status"
                        value={filters.status}
                        onChange={(event) =>
                            onChange("status", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Todos os status</option>
                        <option value="active">Ativos</option>
                        <option value="inactive">Inativos</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={onClear}
                    className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    <FaRotateLeft aria-hidden="true" />
                    Limpar
                </button>
            </div>
        </div>
    );
}