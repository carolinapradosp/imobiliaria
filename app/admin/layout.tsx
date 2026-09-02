import type { Metadata } from "next";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
    title: {
        default: "Administração",
        template: "%s | Administração",
    },
    robots: {
        index: false,
        follow: false,
    },
};

type AdminLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
            <AdminSidebar />

            <div className="min-w-0">
                <AdminHeader />

                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}