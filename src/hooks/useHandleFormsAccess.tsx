import { use, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { UserLoginInterface } from "../interfaces/UserInterface";
import { AuthContext } from "../context/authContext";
import { login, logout } from "../services/user.service";
import { handleErrorResponse } from "./useHandleFormsPages";

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
            setAlertMessage({ message, success, time: Date.now() });
            if (checkAuth) await checkAuth();
            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 3000);
        } catch (error: unknown) {
            handleErrorResponse(error, "Error en el inicio de sesión", setAlertMessage);
        } finally {
            setLoading(false);
        }
    }
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            if (checkAuth) await checkAuth();
        } catch (error) {
            handleErrorResponse(error, "Error al cerrar sesión", setAlertMessage);
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

