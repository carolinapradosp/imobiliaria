// components\admin\AdminHeader.tsx

import Link from "next/link";
import { FaArrowUpRightFromSquare, FaUser } from "react-icons/fa6";

import { logoutAction } from "@/app/admin/login/actions";

export default function AdminHeader() {
    return (
        <header className="flex min-h-18 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
            <div>
                <p className="text-sm text-slate-500">Área administrativa</p>
                <p className="font-semibold text-slate-900">
                    Gerenciamento de imóveis
                </p>
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/"
                    target="_blank"
                    className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:flex"
                >
                    Ver site
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                </Link>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Sair
                    </button>
                </form>
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <FaUser aria-hidden="true" />
                    <span className="sr-only">Usuário administrador</span>
                </div>
            </div>
        </header>
    );
}