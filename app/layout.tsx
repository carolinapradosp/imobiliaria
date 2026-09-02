import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prado Imóveis",
    template: "%s | Prado Imóveis",
  },
  description:
    "Encontre casas, apartamentos, terrenos e imóveis comerciais para comprar ou alugar.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}