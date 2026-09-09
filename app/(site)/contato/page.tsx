// app\(site)\contato\page.tsx
import type { Metadata } from "next";
import {
    FaClock,
    FaEnvelope,
    FaLocationDot,
    FaPhone,
    FaWhatsapp,
} from "react-icons/fa6";

import ContactForm from "@/components/contact/ContactForm";
import { contactConfig } from "@/config/contact";

export const metadata: Metadata = {
    title: "Contato",
    description:
        "Entre em contato com a Prado Imóveis e encontre o imóvel ideal.",
};

export default function ContactPage() {
    const whatsappUrl = `https://wa.me/${contactConfig.whatsapp}`;

    return (
        <div className="bg-slate-50">
            <section className="bg-blue-950">
                <div className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl">
                        Entre em contato
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">
                        Fale com nossa equipe para comprar, alugar ou anunciar
                        um imóvel.
                    </p>
                </div>
            </section>

            <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
                <section>
                    <span className="text-sm font-semibold tracking-wide text-blue-700 uppercase">
                        Atendimento
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                        Como podemos ajudar?
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-slate-600">
                        Nossa equipe está disponível para tirar dúvidas,
                        apresentar imóveis e ajudar você a encontrar a melhor
                        oportunidade.
                    </p>

                    <div className="mt-8 space-y-4">
                        <a
                            href={`mailto:${contactConfig.email}`}
                            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300"
                        >
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                <FaEnvelope aria-hidden="true" />
                            </span>

                            <span>
                                <strong className="block text-sm text-slate-900">
                                    E-mail
                                </strong>

                                <span className="mt-1 block text-sm text-slate-600">
                                    {contactConfig.email}
                                </span>
                            </span>
                        </a>

                        <a
                            href={`tel:+${contactConfig.whatsapp}`}
                            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300"
                        >
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                <FaPhone aria-hidden="true" />
                            </span>

                            <span>
                                <strong className="block text-sm text-slate-900">
                                    Telefone
                                </strong>

                                <span className="mt-1 block text-sm text-slate-600">
                                    {contactConfig.phone}
                                </span>
                            </span>
                        </a>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300"
                        >
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                                <FaWhatsapp aria-hidden="true" />
                            </span>

                            <span>
                                <strong className="block text-sm text-slate-900">
                                    WhatsApp
                                </strong>

                                <span className="mt-1 block text-sm text-slate-600">
                                    Iniciar atendimento
                                </span>
                            </span>
                        </a>

                        <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                <FaLocationDot aria-hidden="true" />
                            </span>

                            <span>
                                <strong className="block text-sm text-slate-900">
                                    Localização
                                </strong>

                                <span className="mt-1 block text-sm text-slate-600">
                                    {contactConfig.address}
                                </span>
                            </span>
                        </div>

                        <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                <FaClock aria-hidden="true" />
                            </span>

                            <span>
                                <strong className="block text-sm text-slate-900">
                                    Horário
                                </strong>

                                <span className="mt-1 block text-sm text-slate-600">
                                    {contactConfig.businessHours}
                                </span>
                            </span>
                        </div>
                    </div>
                </section>

                <ContactForm />
            </div>
        </div>
    );
}