import { useCallback, useState } from "react";
import type { AxiosErrorResponse } from "../interfaces/AxiosErrorResponse";
import type { DefaultResponse, PaginationResponse } from "../interfaces/ResponseInterface";

const useHandleFormsPages = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, success: boolean, time: number } | null>(null);


    const handleIndex = useCallback(async (service: (term?: string) => Promise<PaginationResponse>, term?: string) => {
        setLoading(true);
        try {
            const { data } = await service(term);
            return {
                'data': data.data.length > 0 ? data.data : null,
                'per_page': data.per_page,
                'total': data.total
            }
            // return data.length > 0 ? data : null;

        } catch (error: unknown) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || 'Error al cargar los datos';
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || 'Error inesperado del servidor';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() })
            return {
                "data": null,
                "per_page": 0,
                "total": 0
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const handleShow = useCallback(async (service: (id: number) => Promise<DefaultResponse>, id: number) => {
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
    }, [])

    const handleSave = async <T,>(service: (values: T, id?: number) => Promise<DefaultResponse>, values: T, id?: number) => {
        setLoading(true);
        try {
            const { success, message } = await service(values, id);

            setAlertMessage({ message, success, time: Date.now() });
            return success;
        } catch (error: unknown) {
            const err = error as AxiosErrorResponse;

            const message = err?.response?.data?.message || 'Error al guardar los datos';
            const success = err?.response?.data?.success || false;
            const exception = err?.response?.data?.exception || 'Error inesperado del servidor';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() });
            return success;
        } finally {
            setLoading(false);
        }
    };
    return {
        handleIndex,
        handleShow,
        handleSave,
        isLoading,
        alertMessage,
        setAlertMessage
    }
}

export default useHandleFormsPages;