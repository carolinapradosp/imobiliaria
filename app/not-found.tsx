// app\not-found.tsx
import Link from "next/link";
import {
    FaArrowLeft,
    FaHouse,
    FaMagnifyingGlass,
} from "react-icons/fa6";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-2xl text-center">
                <div className="relative mx-auto mt-12 flex size-32 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-blue-100" />

                    <FaHouse
                        className="relative text-5xl text-blue-700"
                        aria-hidden="true"
                    />

                    <span className="absolute right-1 bottom-1 flex size-11 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-900 text-white">
                        <FaMagnifyingGlass aria-hidden="true" />
                    </span>
                </div>

                <p className="mt-8 text-7xl font-bold tracking-tight text-blue-700 sm:text-8xl">
                    404
                </p>

                <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Página não encontrada
                </h1>

                <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                    A página que você tentou acessar não existe, foi removida ou
                    o endereço informado está incorreto.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800"
                    >
                        <FaArrowLeft aria-hidden="true" />
                        Voltar para o início
                    </Link>

                    <Link
                        href="/imoveis"
                        className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        <FaHouse aria-hidden="true" />
                        Ver imóveis
                    </Link>
                </div>
            </div>
        </main>
    );
}