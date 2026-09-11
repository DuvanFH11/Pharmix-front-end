export interface roleStoreInterface {
    code: string;
    name: string;
    description: string;
}
export interface roleInterface extends roleStoreInterface {
    id: number;
}