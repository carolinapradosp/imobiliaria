// app\admin\layout.tsx
import type { Metadata } from "next";

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
    return children;
}