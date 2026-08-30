import { use, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { UserLoginInterface } from "../interfaces/UserInterface";
import { AuthContext } from "../context/authContext";
import type { AxiosErrorResponse } from "../interfaces/AxiosErrorResponse";
import { login, logout } from "../services/user.service";

export const useHandleFormAccess = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, success: boolean, time: number } | null>(null);
    const navigate = useNavigate();
    const { checkAuth } = use(AuthContext);

    const submitFormLogin = async (data: UserLoginInterface) => {
        setLoading(true);
        try {
            const response = await login(data);
            const { message, success } = response.data;
            //componente para mostrar mensaje
            setAlertMessage({ message, success, time: Date.now() });
            if (checkAuth) await checkAuth();

            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 3000);

        } catch (error: unknown) {

            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || "Error en el inicio de sesión";
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || 'Error al inicio de sesión';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() });

        } finally {
            setLoading(false);
        }
    }

    // const submitFormRegister = async (service: (data: RegisterSchema) => Promise<AxiosResponse>, data: UserRegisterInterface) => {
    //     setLoading(true);
    //     try {
    //         const response = await service(data);

    //         const { message, state } = response.data;

    //         setAlertMessage({ message, state, time: Date.now() });
    //         setTimeout(() => {
    //             navigate('/login', { replace: true });
    //         }, 3000);

    //     } catch (error) {
    //         const err = error as AxiosErrorResponse;

    //         const message = err.response?.data?.error || 'Error al registrarse';
    //         const state = err.response?.data?.state || 500;

    //         setAlertMessage({ message, state, time: Date.now() });
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();

            // const { message, success } = response.data;

            // setAlertMessage({ message, success, time: Date.now() });
            if (checkAuth) await checkAuth();

        } catch (error) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.message || 'Error al cerrar sesión';
            const success = err.response?.data?.success || false;
            const exception = err.response?.data?.exception || '';

            console.log({ exception });
            setAlertMessage({ message, success, time: Date.now() });
        } finally {
            setLoading(false);
        }
    }

    return ({
        submitFormLogin,
        isLoading,
        alertMessage,
        handleLogout
    })

}

