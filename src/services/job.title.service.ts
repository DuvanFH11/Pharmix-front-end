import type { JobTitleStoreInterface } from "../interfaces/JobTitleInterface";
import api from "../plugins/axios"

export const index = async (page: number, termSearch?: string) => {
    const response = await api.get('/job_titles', { params: { page: page, code: termSearch } });
    return response.data;
}
export const show = async (data: number) => {
    const response = await api.get(`/job_titles/${data}`);
    return response.data;
}
export const storeOrUpdate = async (data: JobTitleStoreInterface, id?: number) => {
    const response = await api.post(`/job_titles/save/${id ? id : ''}`, data);
    return response.data;
}
