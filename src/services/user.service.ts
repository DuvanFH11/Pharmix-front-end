import api from "../plugins/axios"
import type { LoginSchema, RegisterSchema } from "../schemas/user.schema";

//Servicio para traer todos los usuarios;
export const index = async () => {
    const response = await api.get('/users');
    return response.data;
}
//Servicio para crear usuario;
export const store = async (data: RegisterSchema) => {
    const response = await api.post('/users', data);
    return response;
}
//Cerrar sesión.
export const logout = async () => {
    const response = await api.post('/logout');
    return response;
}
//Iniciar sesión.
export const login = async (data: LoginSchema) => {
    const response = await api.post('/login', data);
    return response;
}