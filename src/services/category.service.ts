import api from "../plugins/axios"

export const index = async () => {
    const response = await api.get('categories/index');
    return response.data;
}