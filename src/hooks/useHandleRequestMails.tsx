import { useCallback, useState } from "react";
import type { DefaultResponse } from "../interfaces/ResponseInterface";
import type { AxiosErrorResponse } from "../interfaces/AxiosErrorResponse";

const useHandleRequestMails = () => {
    const [timeOutCode, setTimeOutCode] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, success: boolean, time: number } | null>(null);

    const requestCodeToEmail = useCallback(async (service: (email: string) => Promise<DefaultResponse>, email: string) => {
        setLoading(true);
        try {
            const { success } = await service(email);
            if (success) {
                let seconds = 60;
                const interval = setInterval(() => {
                    setTimeOutCode(`${seconds} Segundos`);
                    seconds = seconds - 1;
                    if (seconds < 0) {
                        clearInterval(interval);
                        setTimeOutCode(null);
                    }
                }, 1000);
                return true;
            } else {
                return false;
            }
        } catch (error: unknown) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || 'Error al enviar el código';
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || 'Error al enviar el código';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() });

        } finally {
            setLoading(false);
        }

    }, []);
    return {
        isLoading,
        alertMessage,
        timeOutCode,
        requestCodeToEmail,
    }
}

export default useHandleRequestMails;
