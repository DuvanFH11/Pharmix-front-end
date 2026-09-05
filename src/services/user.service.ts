import type { UserLoginInterface, UserStoreInterface } from "../interfaces/UserInterface";
import api from "../plugins/axios"

//Servicio para traer todos los usuarios;
export const index = async (data?: string) => {
    const response = await api.get('/users', { params: { name: data } });
    return response.data;
}
//Servicio para crear usuario;
export const store = async (data: UserStoreInterface) => {
    const response = await api.post('/users', data);
    return response;
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