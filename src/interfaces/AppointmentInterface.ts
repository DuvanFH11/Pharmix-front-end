export interface AppointmentStoreInterface {
    code: string;
    name: string;
    description: string;
}

export interface AppointmentInterface extends AppointmentStoreInterface {
    id: number;
    created_at: string;
    updated_at: string;
}