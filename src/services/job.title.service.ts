import api from "../plugins/axios"

export const index = async () => {
    const response = await api.get('/roles');
    return response.data;
}