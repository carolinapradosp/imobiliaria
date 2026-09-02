import type { Metadata } from "next";
import { FaCircleCheck } from "react-icons/fa6";

import { sql } from "@/lib/database";

export const metadata: Metadata = {
    title: "Banco de dados",
};

export const dynamic = "force-dynamic";

export default async function DatabaseTestPage() {
    const result = await sql`
    SELECT
      NOW() AS database_time,
      CURRENT_DATABASE() AS database_name
  `;

    const database = result[0] as {
        database_time: string;
        database_name: string;
    };

    return (
        <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900">
                Banco de dados
            </h1>

            <div className="mt-8 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-emerald-700">
                    <FaCircleCheck className="text-2xl" aria-hidden="true" />

                    <h2 className="text-lg font-bold">
                        Conexão realizada com sucesso
                    </h2>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-slate-50 p-4">
                        <dt className="text-sm text-slate-500">Banco</dt>
                        <dd className="mt-1 font-semibold text-slate-900">
                            {database.database_name}
                        </dd>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <dt className="text-sm text-slate-500">
                            Horário do servidor
                        </dt>
                        <dd className="mt-1 font-semibold text-slate-900">
                            {new Date(
                                database.database_time,
                            ).toLocaleString("pt-BR")}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}