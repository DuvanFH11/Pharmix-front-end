import { useCallback, useState } from "react";
import type { DefaultResponse } from "../interfaces/ResponseInterface";
import { handleErrorResponse } from "./useHandleFormsPages";

const useHandleRequestMails = () => {
    const [timeOutCode, setTimeOutCode] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, success: boolean, time: number } | null>(null);

    const requestCodeToEmail = useCallback(async (service: (email: string) => Promise<DefaultResponse>, email: string) => {
        setLoading(true);
        try {
            const { message, success } = await service(email);

            setAlertMessage({ message, success, time: Date.now() });
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
            handleErrorResponse(error, 'Error al enviar el código', setAlertMessage);
        } finally {
            setLoading(false);
        }

    }, []);
    const handleVerifyCode = async (service: (data: string, email: string) => Promise<DefaultResponse>, data: string, email: string) => {
        setLoading(true);
        try {
            const { message, success } = await service(data, email);

            setAlertMessage({ message, success, time: Date.now() });

            return success;
        } catch (error: unknown) {
            const success = handleErrorResponse(error, 'Error al verificar el código', setAlertMessage);
            return success;
        } finally {
            setLoading(false);
        }
    }
    return {
        isLoading,
        alertMessage,
        timeOutCode,
        requestCodeToEmail,
        handleVerifyCode,
    }
}

export default useHandleRequestMails;
