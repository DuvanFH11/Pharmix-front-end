import type { UserLoginInterface, UserStoreInterface } from "../interfaces/UserInterface";
import api from "../plugins/axios"

//Servicio para traer todos los usuarios;
export const index = async (page: number, termSearch?: string) => {
    const response = await api.get('/users', { params: { page: page, email: termSearch } });
    return response.data;
}
//Mostrar un registro
export const show = async (data: number) => {
    const response = await api.get(`/users/${data}`);
    return response.data;
}
//Guardar o actualizar un registro
export const storeOrUpdate = async (data: UserStoreInterface, id?: number) => {
    const response = await api.post(`/users/save/${id ? id : ''}`, data);
    return response.data;
}
//Solicitar un código de usuario;
export const sendCode = async (email: string) => {
    const response = await api.post('/user/code', { email });
    return response.data;
}
export const verifyCode = async (email: string, userCode: number) => {
    const response = await api.post('/user/code/verify', { email: email, userCode: userCode });
    return response.data;
}
//Cerrar sesión.
export const logout = async () => {
    const response = await api.post('/logout');
    return response;
}
//Iniciar sesión.
export const login = async (data: UserLoginInterface) => {
    const response = await api.post('/login', data);
    return response;
}
