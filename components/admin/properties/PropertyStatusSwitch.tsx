// components\admin\properties\PropertyStatusSwitch.tsx
type PropertyStatusSwitchProps = {
    checked: boolean;
    propertyTitle: string;
    disabled?: boolean;
    onChange: () => void;
};

export default function PropertyStatusSwitch({
    checked,
    propertyTitle,
    disabled = false,
    onChange,
}: PropertyStatusSwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={`${checked ? "Desativar" : "Ativar"
                } o anúncio ${propertyTitle}`}
            disabled={disabled}
            onClick={onChange}
            className="flex items-center gap-2 disabled:cursor-wait disabled:opacity-60"
        >
            <span
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-emerald-600" : "bg-slate-300"
                    }`}
            >
                <span
                    className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </span>

            <span
                className={`text-xs font-semibold ${checked ? "text-emerald-700" : "text-slate-500"
                    }`}
            >
                {disabled
                    ? "Salvando..."
                    : checked
                        ? "Ativo"
                        : "Inativo"}
            </span>
        </button>
    );
}