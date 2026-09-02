import { FaMagnifyingGlass } from "react-icons/fa6";

type HeroProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

export default function Hero({
    search,
    onSearchChange,
}: HeroProps) {
    return (
        <section className="bg-blue-950">
            <div className="mx-auto flex min-h-105 w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
                <span className="mb-4 rounded-full bg-blue-900 px-4 py-2 text-sm font-medium text-blue-200">
                    Encontre o lugar ideal para você
                </span>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Seu próximo imóvel está aqui
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                    Casas, apartamentos, terrenos e imóveis comerciais para comprar
                    ou alugar.
                </p>

                <div className="relative mt-8 w-full max-w-2xl">
                    <FaMagnifyingGlass
                        aria-hidden="true"
                        className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-400"
                    />

                    <label htmlFor="property-search" className="sr-only">
                        Buscar imóveis
                    </label>

                    <input
                        id="property-search"
                        type="search"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Busque por imóvel, cidade ou bairro"
                        className="h-15 w-full rounded-xl border border-transparent bg-white pr-5 pl-13 text-base text-slate-900 shadow-lg outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
                    />
                </div>
            </div>
        </section>
    );
}