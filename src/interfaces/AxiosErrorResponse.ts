export interface AxiosErrorResponse {
    response?: {
        data?: {
            error?: string;
            state?: number
        }
    }
}