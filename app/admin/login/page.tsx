// app\admin\login\page.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FaBuilding } from "react-icons/fa6";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/session";

export const metadata: Metadata = {
    title: "Login administrativo",
};

export default async function AdminLoginPage() {
    const session = await getAdminSession();

    if (session) {
        redirect("/admin");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-blue-700 text-xl text-white">
                    <FaBuilding aria-hidden="true" />
                </span>

                <div className="mt-5 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Área administrativa
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Entre para gerenciar os imóveis da imobiliária.
                    </p>
                </div>

                <AdminLoginForm />
            </div>
        </main>
    );
}