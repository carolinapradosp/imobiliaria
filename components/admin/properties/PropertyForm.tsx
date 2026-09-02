"use client";

import Image from "next/image";
import Link from "next/link";
import {
    type ChangeEvent,
    type FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    FaArrowLeft,
    FaFloppyDisk,
    FaImage,
    FaTrash,
} from "react-icons/fa6";

import type {
    Property,
    PropertyPurpose,
    PropertyType,
} from "@/interfaces/Property";

type PropertyFormProps = {
    mode: "create" | "edit";
    initialProperty?: Property;
};

type PropertyFormState = {
    title: string;
    slug: string;
    description: string;
    type: PropertyType;
    purpose: PropertyPurpose;
    price: string;
    condominium: string;
    propertyTax: string;
    city: string;
    state: string;
    neighborhood: string;
    bedrooms: string;
    bathrooms: string;
    parkingSpaces: string;
    area: string;
    featured: boolean;
    active: boolean;
};

const emptyForm: PropertyFormState = {
    title: "",
    slug: "",
    description: "",
    type: "house",
    purpose: "sale",
    price: "",
    condominium: "",
    propertyTax: "",
    city: "",
    state: "",
    neighborhood: "",
    bedrooms: "",
    bathrooms: "",
    parkingSpaces: "",
    area: "",
    featured: false,
    active: true,
};

const inputClassName =
    "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10";

const textareaClassName =
    "w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10";

function createInitialForm(
    property?: Property,
): PropertyFormState {
    if (!property) {
        return emptyForm;
    }

    return {
        title: property.title,
        slug: property.slug,
        description: property.description,
        type: property.type,
        purpose: property.purpose,
        price: String(property.price),
        condominium: property.condominium
            ? String(property.condominium)
            : "",
        propertyTax: property.propertyTax
            ? String(property.propertyTax)
            : "",
        city: property.city,
        state: property.state,
        neighborhood: property.neighborhood,
        bedrooms:
            property.bedrooms !== undefined
                ? String(property.bedrooms)
                : "",
        bathrooms:
            property.bathrooms !== undefined
                ? String(property.bathrooms)
                : "",
        parkingSpaces:
            property.parkingSpaces !== undefined
                ? String(property.parkingSpaces)
                : "",
        area: String(property.area),
        featured: property.featured,
        active: property.active,
    };
}

function createSlug(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function PropertyForm({
    mode,
    initialProperty,
}: PropertyFormProps) {
    const [form, setForm] = useState<PropertyFormState>(() =>
        createInitialForm(initialProperty),
    );

    const [images, setImages] = useState<string[]>(
        initialProperty?.images ?? [],
    );

    const [submitted, setSubmitted] = useState(false);
    const [imageError, setImageError] = useState("");
    const objectUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach((url) => {
                URL.revokeObjectURL(url);
            });
        };
    }, []);

    function handleFieldChange(
        field: keyof PropertyFormState,
        value: string | boolean,
    ) {
        setSubmitted(false);

        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function handleTitleChange(value: string) {
        setSubmitted(false);

        setForm((currentForm) => ({
            ...currentForm,
            title: value,
            slug:
                mode === "create"
                    ? createSlug(value)
                    : currentForm.slug,
        }));
    }

    function handleTypeChange(type: PropertyType) {
        setSubmitted(false);

        setForm((currentForm) => ({
            ...currentForm,
            type,
            ...(type === "land"
                ? {
                    bedrooms: "",
                    bathrooms: "",
                    parkingSpaces: "",
                }
                : {}),
        }));
    }

    function handleImagesChange(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const files = Array.from(event.target.files ?? []);

        if (files.length === 0) {
            return;
        }

        const validFiles = files.filter((file) =>
            file.type.startsWith("image/"),
        );

        const newImageUrls = validFiles.map((file) => {
            const url = URL.createObjectURL(file);
            objectUrlsRef.current.push(url);

            return url;
        });

        setImages((currentImages) => [
            ...currentImages,
            ...newImageUrls,
        ]);

        setImageError("");
        event.target.value = "";
    }

    function handleRemoveImage(imageToRemove: string) {
        setImages((currentImages) =>
            currentImages.filter((image) => image !== imageToRemove),
        );

        if (imageToRemove.startsWith("blob:")) {
            URL.revokeObjectURL(imageToRemove);

            objectUrlsRef.current = objectUrlsRef.current.filter(
                (url) => url !== imageToRemove,
            );
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (images.length === 0) {
            setImageError("Adicione pelo menos uma imagem do imóvel.");
            setSubmitted(false);
            return;
        }

        const propertyData: Property = {
            id: initialProperty?.id ?? crypto.randomUUID(),
            title: form.title.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            type: form.type,
            purpose: form.purpose,
            price: Number(form.price),
            condominium: form.condominium
                ? Number(form.condominium)
                : undefined,
            propertyTax: form.propertyTax
                ? Number(form.propertyTax)
                : undefined,
            city: form.city.trim(),
            state: form.state,
            neighborhood: form.neighborhood.trim(),
            bedrooms: form.bedrooms
                ? Number(form.bedrooms)
                : undefined,
            bathrooms: form.bathrooms
                ? Number(form.bathrooms)
                : undefined,
            parkingSpaces: form.parkingSpaces
                ? Number(form.parkingSpaces)
                : undefined,
            area: Number(form.area),
            images,
            featured: form.featured,
            active: form.active,
        };

        // Posteriormente enviaremos propertyData para uma Server Action.
        void propertyData;

        setImageError("");
        setSubmitted(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {submitted && (
                <div
                    role="status"
                    className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                >
                    {mode === "create"
                        ? "Imóvel cadastrado com sucesso na simulação."
                        : "Imóvel atualizado com sucesso na simulação."}
                    {" "}Os dados serão restaurados ao atualizar a página.
                </div>
            )}

            <div className="grid items-start gap-6 xl:grid-cols-[1fr_320px]">
                <div className="space-y-6">
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Informações principais
                        </h2>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="title"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Título do anúncio *
                                </label>

                                <input
                                    id="title"
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={(event) =>
                                        handleTitleChange(event.target.value)
                                    }
                                    placeholder="Ex.: Casa moderna com área de lazer"
                                    className={inputClassName}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="slug"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Slug *
                                </label>

                                <input
                                    id="slug"
                                    type="text"
                                    required
                                    value={form.slug}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "slug",
                                            createSlug(event.target.value),
                                        )
                                    }
                                    placeholder="casa-moderna-com-area-de-lazer"
                                    className={inputClassName}
                                />

                                <p className="mt-1.5 text-xs text-slate-500">
                                    Será utilizado na URL pública do imóvel.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="type"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Tipo *
                                </label>

                                <select
                                    id="type"
                                    required
                                    value={form.type}
                                    onChange={(event) =>
                                        handleTypeChange(event.target.value as PropertyType)
                                    }
                                    className={inputClassName}
                                >
                                    <option value="house">Casa</option>
                                    <option value="apartment">Apartamento</option>
                                    <option value="commercial">
                                        Imóvel comercial
                                    </option>
                                    <option value="land">Terreno</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="purpose"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Finalidade *
                                </label>

                                <select
                                    id="purpose"
                                    required
                                    value={form.purpose}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "purpose",
                                            event.target.value as PropertyPurpose,
                                        )
                                    }
                                    className={inputClassName}
                                >
                                    <option value="sale">Venda</option>
                                    <option value="rent">Aluguel</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Descrição *
                                </label>

                                <textarea
                                    id="description"
                                    required
                                    rows={6}
                                    value={form.description}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Descreva as principais características do imóvel"
                                    className={textareaClassName}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Localização
                        </h2>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="city"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Cidade *
                                </label>

                                <input
                                    id="city"
                                    type="text"
                                    required
                                    value={form.city}
                                    onChange={(event) =>
                                        handleFieldChange("city", event.target.value)
                                    }
                                    placeholder="São Paulo"
                                    className={inputClassName}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="state"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Estado *
                                </label>

                                <select
                                    id="state"
                                    required
                                    value={form.state}
                                    onChange={(event) =>
                                        handleFieldChange("state", event.target.value)
                                    }
                                    className={inputClassName}
                                >
                                    <option value="">Selecione</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PR">Paraná</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="neighborhood"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Bairro *
                                </label>

                                <input
                                    id="neighborhood"
                                    type="text"
                                    required
                                    value={form.neighborhood}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "neighborhood",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Vila Mariana"
                                    className={inputClassName}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Valores
                        </h2>

                        <div className="mt-5 grid gap-5 sm:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="price"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    {form.purpose === "sale"
                                        ? "Valor de venda"
                                        : "Valor do aluguel"}{" "}
                                    *
                                </label>

                                <input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    value={form.price}
                                    onChange={(event) =>
                                        handleFieldChange("price", event.target.value)
                                    }
                                    placeholder="0,00"
                                    className={inputClassName}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="condominium"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Condomínio
                                </label>

                                <input
                                    id="condominium"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.condominium}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "condominium",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="0,00"
                                    className={inputClassName}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="propertyTax"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    IPTU
                                </label>

                                <input
                                    id="propertyTax"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.propertyTax}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "propertyTax",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="0,00"
                                    className={inputClassName}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Características
                        </h2>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label
                                    htmlFor="area"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Área em m² *
                                </label>

                                <input
                                    id="area"
                                    type="number"
                                    min="1"
                                    required
                                    value={form.area}
                                    onChange={(event) =>
                                        handleFieldChange("area", event.target.value)
                                    }
                                    className={inputClassName}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="bedrooms"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Quartos
                                </label>

                                <input
                                    id="bedrooms"
                                    type="number"
                                    min="0"
                                    value={form.bedrooms}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "bedrooms",
                                            event.target.value,
                                        )
                                    }
                                    disabled={form.type === "land"}
                                    className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-slate-100`}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="bathrooms"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Banheiros
                                </label>

                                <input
                                    id="bathrooms"
                                    type="number"
                                    min="0"
                                    value={form.bathrooms}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "bathrooms",
                                            event.target.value,
                                        )
                                    }
                                    disabled={form.type === "land"}
                                    className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-slate-100`}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="parkingSpaces"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Vagas
                                </label>

                                <input
                                    id="parkingSpaces"
                                    type="number"
                                    min="0"
                                    value={form.parkingSpaces}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "parkingSpaces",
                                            event.target.value,
                                        )
                                    }
                                    disabled={form.type === "land"}
                                    className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-slate-100`}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Imagens
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            A primeira imagem será utilizada como capa do anúncio.
                        </p>

                        <label
                            htmlFor="property-images"
                            className="mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
                        >
                            <FaImage
                                className="text-3xl text-blue-700"
                                aria-hidden="true"
                            />

                            <span className="mt-3 font-semibold text-slate-800">
                                Selecione as imagens
                            </span>

                            <span className="mt-1 text-sm text-slate-500">
                                Você pode selecionar vários arquivos
                            </span>

                            <input
                                id="property-images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImagesChange}
                                className="sr-only"
                            />
                        </label>

                        {imageError && (
                            <p className="mt-2 text-sm font-medium text-rose-700">
                                {imageError}
                            </p>
                        )}

                        {images.length > 0 && (
                            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {images.map((image, index) => (
                                    <div
                                        key={`${image}-${index}`}
                                        className="relative aspect-4/3 overflow-hidden rounded-lg bg-slate-200"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Imagem ${index + 1} do imóvel`}
                                            fill
                                            sizes="250px"
                                            unoptimized={image.startsWith("blob:")}
                                            className="object-cover"
                                        />

                                        {index === 0 && (
                                            <span className="absolute top-2 left-2 rounded-full bg-blue-700 px-2 py-1 text-xs font-semibold text-white">
                                                Capa
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(image)}
                                            aria-label={`Remover imagem ${index + 1}`}
                                            className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-rose-700 shadow-md transition hover:bg-rose-50"
                                        >
                                            <FaTrash aria-hidden="true" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <aside className="space-y-6 xl:sticky xl:top-6">
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="font-bold text-slate-900">
                            Publicação
                        </h2>

                        <div className="mt-5 space-y-5">
                            <label className="flex cursor-pointer items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={form.active}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "active",
                                            event.target.checked,
                                        )
                                    }
                                    className="mt-0.5 size-4 accent-blue-700"
                                />

                                <span>
                                    <strong className="block text-sm text-slate-800">
                                        Anúncio ativo
                                    </strong>

                                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                                        O imóvel será exibido no site público.
                                    </span>
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            "featured",
                                            event.target.checked,
                                        )
                                    }
                                    className="mt-0.5 size-4 accent-blue-700"
                                />

                                <span>
                                    <strong className="block text-sm text-slate-800">
                                        Imóvel em destaque
                                    </strong>

                                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                                        O imóvel receberá maior destaque nas listagens.
                                    </span>
                                </span>
                            </label>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 font-semibold text-white transition hover:bg-blue-800"
                        >
                            <FaFloppyDisk aria-hidden="true" />

                            {mode === "create"
                                ? "Cadastrar imóvel"
                                : "Salvar alterações"}
                        </button>

                        <Link
                            href="/admin/imoveis"
                            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <FaArrowLeft aria-hidden="true" />
                            Cancelar
                        </Link>
                    </section>
                </aside>
            </div>
        </form>
    );
}