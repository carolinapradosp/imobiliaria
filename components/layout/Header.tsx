import Link from "next/link";
import { FaBuilding } from "react-icons/fa6";

export default function Header() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-slate-900"
                >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-blue-700 text-white">
                        <FaBuilding aria-hidden="true" />
                    </span>

                    <span>
                        Prado <span className="text-blue-700">Imóveis</span>
                    </span>
                </Link>

                <nav aria-label="Navegação principal">
                    <ul className="flex items-center gap-5 text-sm font-medium text-slate-700 sm:gap-8">
                        <li>
                            <Link href="/" className="transition-colors hover:text-blue-700">
                                Início
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/imoveis"
                                className="transition-colors hover:text-blue-700"
                            >
                                Imóveis
                            </Link>
                        </li>

                        <li className="hidden sm:block">
                            <Link
                                href="/contato"
                                className="transition-colors hover:text-blue-700"
                            >
                                Contato
                            </Link>
                        </li>

                        <li className="hidden md:block">
                            <Link
                                href="/admin"
                                className="rounded-lg bg-blue-700 px-4 py-2.5 text-white transition-colors hover:bg-blue-800"
                            >
                                Área administrativa
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}