// components\contact\ContactForm.tsx
"use client";

import { type FormEvent, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { contactConfig } from "@/config/contact";

type ContactFormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const initialForm: ContactFormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

const fieldClassName =
    "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10";

export default function ContactForm() {
    const [form, setForm] =
        useState<ContactFormState>(initialForm);

    function handleChange(
        field: keyof ContactFormState,
        value: string,
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = [
            "Olá! Entrei em contato pelo site da Prado Imóveis.",
            "",
            `Nome: ${form.name}`,
            `E-mail: ${form.email}`,
            `Telefone: ${form.phone}`,
            "",
            `Mensagem: ${form.message}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${contactConfig.whatsapp
            }?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer",
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
            <h2 className="text-xl font-bold text-slate-900">
                Envie uma mensagem
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Preencha os dados abaixo para iniciar o atendimento pelo
                WhatsApp.
            </p>

            <div className="mt-6 space-y-5">
                <div>
                    <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Nome *
                    </label>

                    <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(event) =>
                            handleChange("name", event.target.value)
                        }
                        placeholder="Seu nome"
                        autoComplete="name"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        E-mail *
                    </label>

                    <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) =>
                            handleChange("email", event.target.value)
                        }
                        placeholder="seuemail@exemplo.com"
                        autoComplete="email"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-phone"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Telefone *
                    </label>

                    <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(event) =>
                            handleChange("phone", event.target.value)
                        }
                        placeholder="(11) 99999-9999"
                        autoComplete="tel"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Mensagem *
                    </label>

                    <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(event) =>
                            handleChange("message", event.target.value)
                        }
                        placeholder="Como podemos ajudar?"
                        className={`${fieldClassName} h-auto resize-none py-3`}
                    />
                </div>

                <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 font-semibold text-white transition hover:bg-emerald-700"
                >
                    <FaWhatsapp className="text-xl" aria-hidden="true" />
                    Enviar pelo WhatsApp
                </button>
            </div>
        </form>
    );
}