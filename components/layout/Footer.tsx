// components\layout\Footer.tsx
import { contactConfig } from "@/config/contact";
import Link from "next/link";
import { FaBuilding } from "react-icons/fa6";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold text-white"
                    >
                        <FaBuilding className="text-blue-400" aria-hidden="true" />
                        Prado Imóveis
                    </Link>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                        Encontre o imóvel ideal para comprar, alugar ou investir.
                    </p>
                </div>

                <div>
                    <h2 className="font-semibold text-white">Navegação</h2>

                    <ul className="mt-4 space-y-3 text-sm">
                        <li>
                            <Link href="/" className="hover:text-white">
                                Início
                            </Link>
                        </li>

                        <li>
                            <Link href="/imoveis" className="hover:text-white">
                                Imóveis
                            </Link>
                        </li>

                        <li>
                            <Link href="/contato" className="hover:text-white">
                                Contato
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-semibold text-white">Atendimento</h2>

                    <address className="mt-4 space-y-2 text-sm not-italic text-slate-400">
                        <p>{contactConfig.email}</p>
                        <p>{contactConfig.phone}</p>
                        <p>{contactConfig.businessHours}</p>
                    </address>
                </div>
            </div>

            <div className="border-t border-slate-800">
                <p className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
                    © {currentYear} Prado Imóveis. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}