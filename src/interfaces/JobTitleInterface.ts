export interface JobTitleStoreInterface {
    code: string;
    name: string;
    description: string;
}

export interface JobTitleInterface extends JobTitleStoreInterface {
    id: number;
}