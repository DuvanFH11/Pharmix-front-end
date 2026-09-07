import api from "../plugins/axios"

export const index = async () => {
    const response = await api.get("/appointments");
    return response.data;
}