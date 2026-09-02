"use client";

import Image from "next/image";
import { useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaExpand,
} from "react-icons/fa6";

type PropertyGalleryProps = {
    images: string[];
    title: string;
};

export default function PropertyGallery({
    images,
    title,
}: PropertyGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedImage = images[selectedIndex];

    function showPreviousImage() {
        setSelectedIndex((currentIndex) =>
            currentIndex === 0 ? images.length - 1 : currentIndex - 1,
        );
    }

    function showNextImage() {
        setSelectedIndex((currentIndex) =>
            currentIndex === images.length - 1 ? 0 : currentIndex + 1,
        );
    }

    if (images.length === 0) {
        return (
            <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                Imóvel sem imagens
            </div>
        );
    }

    return (
        <section aria-label={`Galeria de fotos de ${title}`}>
            <div className="group relative aspect-video overflow-hidden rounded-xl bg-slate-200">
                <Image
                    key={selectedImage}
                    src={selectedImage}
                    alt={`${title} - foto ${selectedIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                />

                <span className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
                    <FaExpand aria-hidden="true" />
                    {selectedIndex + 1} de {images.length}
                </span>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={showPreviousImage}
                            aria-label="Exibir imagem anterior"
                            className="absolute top-1/2 left-4 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition hover:bg-white"
                        >
                            <FaChevronLeft aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            onClick={showNextImage}
                            aria-label="Exibir próxima imagem"
                            className="absolute top-1/2 right-4 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition hover:bg-white"
                        >
                            <FaChevronRight aria-hidden="true" />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {images.map((image, index) => {
                        const isSelected = selectedIndex === index;

                        return (
                            <button
                                key={`${image}-${index}`}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                aria-label={`Exibir foto ${index + 1}`}
                                aria-pressed={isSelected}
                                className={`relative aspect-4/3 overflow-hidden rounded-lg border-2 transition ${isSelected
                                        ? "border-blue-700"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    sizes="160px"
                                    className="object-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}