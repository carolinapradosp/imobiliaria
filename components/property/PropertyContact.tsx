"use client";

import { FormEvent, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

type PropertyContactProps = {
    propertyTitle: string;
};

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export default function PropertyContact({
    propertyTitle,
}: PropertyContactProps) {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        phone: "",
        message: `Olá! Tenho interesse no imóvel: ${propertyTitle}.`,
    });

    function handleChange(
        field: keyof FormState,
        value: string,
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        /*
         * Nesta etapa o formulário ainda não possui backend.
         * Posteriormente enviaremos esses dados para nossa API.
         */
        setSubmitted(true);
    }

    const whatsappMessage = encodeURIComponent(
        `Olá! Tenho interesse no imóvel: ${propertyTitle}.`,
    );

    return (
        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-slate-900">
                Tenho interesse
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Preencha seus dados para receber mais informações sobre este
                imóvel.
            </p>

            {submitted ? (
                <div
                    role="status"
                    className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
                >
                    Interesse registrado com sucesso! Nesta versão, os dados ainda
                    não são enviados para o servidor.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label
                            htmlFor="contact-name"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Nome
                        </label>

                        <input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(event) =>
                                handleChange("name", event.target.value)
                            }
                            className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="contact-email"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            E-mail
                        </label>

                        <input
                            id="contact-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(event) =>
                                handleChange("email", event.target.value)
                            }
                            className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="contact-phone"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Telefone
                        </label>

                        <input
                            id="contact-phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(event) =>
                                handleChange("phone", event.target.value)
                            }
                            className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="contact-message"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Mensagem
                        </label>

                        <textarea
                            id="contact-message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={(event) =>
                                handleChange("message", event.target.value)
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-12 w-full rounded-lg bg-blue-700 px-5 font-semibold text-white transition-colors hover:bg-blue-800"
                    >
                        Solicitar contato
                    </button>
                </form>
            )}

            <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400 uppercase">
                    ou
                </span>
                <span className="h-px flex-1 bg-slate-200" />
            </div>

            <a
                href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
                <FaWhatsapp className="text-xl" aria-hidden="true" />
                Conversar pelo WhatsApp
            </a>
        </aside>
    );
}