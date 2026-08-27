import { use, useState } from "react"
import type { LoginSchema } from "../schemas/user.schema"
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import type { UserLoginInterface } from "../interfaces/UserInterface";
import { AuthContext } from "../context/authContext";
import type { AxiosErrorResponse } from "../interfaces/AxiosErrorResponse";

export const useHandleForm = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<{ message: string, state: number, time: number } | null>(null);
    const navigate = useNavigate();
    const { checkAuth } = use(AuthContext);

    const submitFormLogin = async (service: (data: LoginSchema) => Promise<AxiosResponse>, data: UserLoginInterface) => {
        setLoading(true);
        try {
            const response = await service(data);
            const { message, state } = response.data;
            //componente para mostrar mensaje
            setAlertMessage({ message, state, time: Date.now() });
            if (checkAuth) await checkAuth();

            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 3000);

        } catch (error: unknown) {

            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.error || "Error en el inicio de sesión";
            const state = err.response?.data?.state || 500;

            setAlertMessage({ message, state, time: Date.now() });

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

    const handleLogout = async (service: () => Promise<AxiosResponse>) => {
        setLoading(true);
        try {
            const response = await service();

            const { message, state } = response.data;

            setAlertMessage({ message, state, time: Date.now() });
            if (checkAuth) await checkAuth();

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 3000);

        } catch (error) {
            const err = error as AxiosErrorResponse;

            const message = err.response?.data?.error || 'Error al cerrar sesión';
            const state = err.response?.data?.state || 500;

            setAlertMessage({ message, state, time: Date.now() });
        } finally {
            setLoading(false);
        }
    }

    return ({
        submitFormLogin,
        isLoading,
        // submitFormRegister,
        alertMessage,
        handleLogout
    })

}

