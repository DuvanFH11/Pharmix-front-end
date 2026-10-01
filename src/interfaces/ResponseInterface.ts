/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseInterface {
    message: string,
    success: boolean,
}
export interface DefaultResponse extends ResponseInterface {
    data?: any
}
export interface PaginationResponse extends ResponseInterface {
    data: {
        data: [],
        total: number,
        per_page: number,
        page: number
    }
}