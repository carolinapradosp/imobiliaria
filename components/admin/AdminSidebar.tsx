"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaBuilding,
    FaChartLine,
    FaHouse,
    FaPlus,
    FaRightFromBracket,
} from "react-icons/fa6";

const navigation = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: FaChartLine,
    },
    {
        label: "Imóveis",
        href: "/admin/imoveis",
        icon: FaHouse,
    },
    {
        label: "Novo imóvel",
        href: "/admin/imoveis/novo",
        icon: FaPlus,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="border-b border-slate-800 bg-slate-950 text-white lg:min-h-screen lg:border-r lg:border-b-0">
            <div className="flex h-full flex-col">
                <div className="flex h-18 items-center border-b border-slate-800 px-5">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 font-bold"
                    >
                        <span className="flex size-10 items-center justify-center rounded-lg bg-blue-700">
                            <FaBuilding aria-hidden="true" />
                        </span>

                        <span>
                            Prado
                            <span className="block text-xs font-normal text-slate-400">
                                Administração
                            </span>
                        </span>
                    </Link>
                </div>

                <nav
                    aria-label="Navegação administrativa"
                    className="flex-1 overflow-x-auto p-3 lg:p-4"
                >
                    <ul className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            const isActive =
                                item.href === "/admin"
                                    ? pathname === "/admin"
                                    : item.href === "/admin/imoveis"
                                        ? pathname === "/admin/imoveis" ||
                                        pathname.includes("/editar")
                                        : pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                            ? "bg-blue-700 text-white"
                                            : "text-slate-300 hover:bg-slate-900 hover:text-white"
                                            }`}
                                    >
                                        <Icon aria-hidden="true" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="hidden border-t border-slate-800 p-4 lg:block">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
                    >
                        <FaRightFromBracket aria-hidden="true" />
                        Voltar ao site
                    </Link>
                </div>
            </div>
        </aside>
    );
}