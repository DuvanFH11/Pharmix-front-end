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

    const handleIndex = async (service: (name?: string) => Promise<ResponseInterface>, name?: string) => {
        setLoading(true);
        try {
            const { data } = await service(name);
            return data.length > 0 ? data : null;

        } catch (error: unknown) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || 'Error al cargar los datos';
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || 'Error inesperado del servidor';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() })
        } finally {
            setLoading(false);
        }
    }
    const handleShow = async (service: (id: number) => Promise<ResponseInterface>, id: number) => {
        setLoading(true);
        try {
            const { data } = await service(id);
            return data;
        } catch (error: unknown) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || 'Error al cargar los datos';
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || 'Error inesperado del servidor';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() });
        } finally {
            setLoading(false);
        }
    }
    return {
        handleIndex,
        handleShow,
        isLoading,
        alertMessage
    }
}

export default useHandleFormsPages;