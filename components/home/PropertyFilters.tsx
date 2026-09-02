import { FaFilter, FaRotateLeft } from "react-icons/fa6";

import type {
    PropertyPurpose,
    PropertyType,
} from "@/interfaces/Property";

export type PropertyFiltersState = {
    purpose: PropertyPurpose | "";
    type: PropertyType | "";
    city: string;
    bedrooms: string;
    minPrice: string;
    maxPrice: string;
};

type PropertyFiltersProps = {
    filters: PropertyFiltersState;
    cities: string[];
    onFilterChange: (
        field: keyof PropertyFiltersState,
        value: string,
    ) => void;
    onClearFilters: () => void;
};

const fieldClassName =
    "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10";

export default function PropertyFilters({
    filters,
    cities,
    onFilterChange,
    onClearFilters,
}: PropertyFiltersProps) {
    return (
        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                    <FaFilter className="text-blue-700" aria-hidden="true" />
                    Filtros
                </h2>

                <button
                    type="button"
                    onClick={onClearFilters}
                    className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
                >
                    <FaRotateLeft aria-hidden="true" />
                    Limpar
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                    <label
                        htmlFor="purpose"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Finalidade
                    </label>

                    <select
                        id="purpose"
                        value={filters.purpose}
                        onChange={(event) =>
                            onFilterChange("purpose", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Todas</option>
                        <option value="sale">Comprar</option>
                        <option value="rent">Alugar</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="type"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Tipo de imóvel
                    </label>

                    <select
                        id="type"
                        value={filters.type}
                        onChange={(event) =>
                            onFilterChange("type", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Todos</option>
                        <option value="house">Casa</option>
                        <option value="apartment">Apartamento</option>
                        <option value="commercial">Comercial</option>
                        <option value="land">Terreno</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Cidade
                    </label>

                    <select
                        id="city"
                        value={filters.city}
                        onChange={(event) =>
                            onFilterChange("city", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Todas</option>

                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="bedrooms"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Quartos
                    </label>

                    <select
                        id="bedrooms"
                        value={filters.bedrooms}
                        onChange={(event) =>
                            onFilterChange("bedrooms", event.target.value)
                        }
                        className={fieldClassName}
                    >
                        <option value="">Qualquer quantidade</option>
                        <option value="1">1 ou mais</option>
                        <option value="2">2 ou mais</option>
                        <option value="3">3 ou mais</option>
                        <option value="4">4 ou mais</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="min-price"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Preço mínimo
                    </label>

                    <input
                        id="min-price"
                        type="number"
                        min="0"
                        step="100"
                        value={filters.minPrice}
                        onChange={(event) =>
                            onFilterChange("minPrice", event.target.value)
                        }
                        placeholder="R$ 0"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <label
                        htmlFor="max-price"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Preço máximo
                    </label>

                    <input
                        id="max-price"
                        type="number"
                        min="0"
                        step="100"
                        value={filters.maxPrice}
                        onChange={(event) =>
                            onFilterChange("maxPrice", event.target.value)
                        }
                        placeholder="Sem limite"
                        className={fieldClassName}
                    />
                </div>
            </div>
        </aside>
    );
}