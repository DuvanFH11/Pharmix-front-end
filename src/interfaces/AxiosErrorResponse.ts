export interface AxiosErrorResponse {
    response?: {
        data?: {
            message: string;
            success: boolean;
            exception: string;
        }
    }
}