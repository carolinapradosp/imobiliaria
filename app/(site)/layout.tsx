import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

type SiteLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function SiteLayout({
    children,
}: SiteLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
}