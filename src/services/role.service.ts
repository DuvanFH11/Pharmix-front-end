
import type { roleStoreInterface } from "../interfaces/RoleInterface";
import api from "../plugins/axios"


export const storeOrUpdate = async (data: roleStoreInterface, id?: number) => {
    const response = await api.post(`/roles/save/${id ? id : ''}`, data);
    return response.data;
}

export const index = async () => {
    const response = await api.get("/roles");
    return response.data;
}
export const show = async (data: number) => {
    const response = await api.get(`/roles/${data}`);
    return response.data;
}