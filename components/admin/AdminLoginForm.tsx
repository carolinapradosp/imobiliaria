"use client";

import { useActionState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";

import {
    type LoginState,
    loginAction,
} from "@/app/admin/login/actions";

const initialState: LoginState = {
    error: "",
};

export default function AdminLoginForm() {
    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState,
    );

    return (
        <form action={formAction} className="mt-8 space-y-5">
            {state.error && (
                <p
                    role="alert"
                    className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
                >
                    {state.error}
                </p>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    E-mail
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    Senha
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60"
            >
                <FaArrowRightToBracket aria-hidden="true" />
                {pending ? "Entrando..." : "Entrar"}
            </button>
        </form>
    );
}