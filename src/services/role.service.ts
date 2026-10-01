
import type { roleStoreInterface } from "../interfaces/RoleInterface";
import api from "../plugins/axios"

export const index = async (page: number, termSearch?: string) => {
    const response = await api.get("/roles", { params: { page: page, code: termSearch } });
    return response.data;
}

export const storeOrUpdate = async (data: roleStoreInterface, id?: number) => {
    const response = await api.post(`/roles/save/${id ? id : ''}`, data);
    return response.data;
}

export const show = async (data: number) => {
    const response = await api.get(`/roles/${data}`);
    return response.data;
}