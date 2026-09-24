export interface productStoreInterface {
    name: string;
    brand: string;
    description: string;
    invima_registration: string;
    unit: string;

    unit_price: number;
    package_price: number;
    strength: number;
}

export interface ProductInterface extends productStoreInterface {
    id: number;
}