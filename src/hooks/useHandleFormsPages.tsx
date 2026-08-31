/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { AxiosErrorResponse } from "../interfaces/AxiosErrorResponse";
interface ResponseInterface {
    message: string,
    success: boolean,
    data?: any
}
const useHandleFormsPages = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, success: boolean, time: number } | null>(null);

    const handleIndex = async (service: () => Promise<ResponseInterface>) => {
        setLoading(true);
        try {
            const response = await service();
            const { data } = response;
            return data;
        } catch (error: unknown) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || 'Error inesperado del servidor';
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || 'Error inesperado del servidor';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() })
        } finally {
            setLoading(false);
        }
    }


    return {
        handleIndex,
        isLoading,
        alertMessage
    }
}

export default useHandleFormsPages;