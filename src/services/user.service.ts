import type { UserLoginInterface, UserStoreInterface } from "../interfaces/UserInterface";
import api from "../plugins/axios"

//PETICIONES GET//
/*traer todos los usuarios*/
export const index = async (page?: number, termSearch?: string) => {
    const response = await api.get('/users', { params: { page: page, email: termSearch } });
    return response.data;
}
/*Mostrar un registro*/
export const show = async (data: number) => {
    const response = await api.get(`/users/${data}`);
    return response.data;
}
//PETICIONES POST//
/*Guardar o actualizar un registro*/
export const storeOrUpdate = async (data: UserStoreInterface, id?: number) => {
    const response = await api.post(`/users/save/${id ? id : ''}`, data);
    return response.data;
}
/*Solicitar un código al email del usuario*/
export const sendCode = async (email: string) => {
    const response = await api.post('/users/code', { email });
    return response.data;
}
/*Verificar código del usuario*/
export const verifyCode = async (userCode: number, email: string) => {
    const response = await api.post('/users/code/verify', { email: email, code: userCode });
    return response.data;
}

//PETICIONES PATCH (MODIFICACIONES PARCIALES A UN REGISTRO);
/*Editar nombre y email del usuario*/
export const edit = async (id: number, data: { name: string, email: string }) => {
    const response = await api.patch(`/users/${id}`, { name: data.name, email: data.email });
    return response.data;
}
/*Cambiar contraseña del usuario*/
export const changePassword = async (id: number, newPass: string) => {
    const response = await api.patch(`/users/change_pass/${id}`, { newPass });
    return response.data;
}

//INICIAR Y CERRAR SESIÓN;
/*Iniciar sesión*/
export const login = async (data: UserLoginInterface) => {
    const response = await api.post('/login', data);
    return response.data;
}
/*Cerrar sesión*/
export const logout = async () => {
    const response = await api.post('/logout');
    return response;
}
