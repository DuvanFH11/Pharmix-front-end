/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseInterface {
    message: string,
    success: boolean,
    data?: any
}
export interface IndexResponseInterface extends ResponseInterface {
    message: string,
    succes: boolean,
    data: {
        per_page: number,
        current_page: number,
        total: number,
        data: any
    }
}