export interface StoreProduct {
    name: string;
    brand: string;
    description: string;
    unit_price: number;
    package_price: number;
    invima_registration: string;
    strength: number;
    unit: string;
}

export interface ProductInterface extends StoreProduct {
    id: number;
    user_creator: number | null,
    created_at: string;
    updated_at: string;
}