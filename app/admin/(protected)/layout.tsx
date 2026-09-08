// app\admin\(protected)\layout.tsx

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/session";

type ProtectedAdminLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default async function ProtectedAdminLayout({
    children,
}: ProtectedAdminLayoutProps) {
    await requireAdmin();

    return (
        <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
            <AdminSidebar />

            <div className="min-w-0">
                <AdminHeader />

                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}