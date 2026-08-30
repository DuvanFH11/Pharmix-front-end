import api from "../plugins/axios"

export const index = async () => {
    const response = await api.get('/categories');
    return response.data;
}