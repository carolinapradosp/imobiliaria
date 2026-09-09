// interfaces\PropertyMutation.tsx
import type {
    PropertyPurpose,
    PropertyType,
} from "@/interfaces/Property";

export type PropertyMutationInput = {
    id?: string;
    slug: string;
    title: string;
    description: string;
    type: PropertyType;
    purpose: PropertyPurpose;
    price: number;
    condominium?: number;
    propertyTax?: number;
    city: string;
    state: string;
    neighborhood: string;
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    area: number;
    images: string[];
    featured: boolean;
    active: boolean;
};

export type PropertyActionState = {
    success: boolean;
    message: string;
    propertyId?: string;
    slug?: string;
    active?: boolean;
};