export interface AppointmentStoreInterface {
    code: string;
    name: string;
    description: string;
}

export interface AppointmentInterface extends AppointmentStoreInterface {
    id: number;
}