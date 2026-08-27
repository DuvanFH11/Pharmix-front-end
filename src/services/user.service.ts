import api from "../plugins/axios"
import type { LoginSchema, RegisterSchema } from "../schemas/user.schema";

export const logout = async () => {
    const response = await api.post('/logout');
    return response;
}
export const login = async (data: LoginSchema) => {
    const response = await api.post('/login', data);
    return response;
}
export const create = async (data: RegisterSchema) => {
    const response = await api.post('/register', data);
    return response;
} 