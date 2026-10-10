import { useCallback, useState } from "react";
import type { AxiosErrorResponse } from "../interfaces/AxiosErrorResponse";
import type { DefaultResponse, PaginationResponse } from "../interfaces/ResponseInterface";

export const handleErrorResponse = (
    err: unknown,
    alert: string,
    setAlertState: (alert: { message: string, success: boolean, time: number } | null) => void
) => {
    const error = err as AxiosErrorResponse;

    const message = error.response?.data?.message || alert;
    const success = error.response?.data?.success || false;
    const exception = error.response?.data?.exception || alert;

    console.log({ exception });
    setAlertState({
        message, success, time: Date.now()
    });
    return success;
}
const useHandleFormsPages = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, success: boolean, time: number } | null>(null);

    const handleIndex = useCallback(async (service: (page: number, term?: string) => Promise<PaginationResponse>, page: number, term?: string) => {
        setLoading(true);
        try {
            const { data } = await service(page, term);
            return {
                "data": data.data.length > 0 ? data.data : null,
                "total": data.total,
                "per_page": data.per_page,
                "page": data.page
            }

        } catch (error: unknown) {
            handleErrorResponse(error, 'Error inesperado del servidor', setAlertMessage);
            return {
                "data": null,
                "total": 0,
                "per_page": 0,
                "page": 0
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
            handleErrorResponse(error, "Error al cargar los datos", setAlertMessage);
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
            const success = handleErrorResponse(error, "Error al guardar los datos", setAlertMessage);
            return success;
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = useCallback(async <T,>(service: (values: T) => Promise<DefaultResponse>, data: T) => {
        setLoading(true);
        try {
            const { message, success } = await service(data);
            setAlertMessage({ message, success, time: Date.now() });
            return success;
        } catch (error: unknown) {
            const success = handleErrorResponse(error, "Error al guardar los datos", setAlertMessage);
            return success;
        } finally {
            setLoading(false);
        }
    }, []);
    return {
        handleIndex,
        handleShow,
        handleSave,
        handleEdit,
        isLoading,
        setLoading,
        alertMessage,
        setAlertMessage
    }
}

export default useHandleFormsPages;