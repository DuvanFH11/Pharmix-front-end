import api from "../plugins/axios"

export const index = async () => {
    const response = await api.get('/job_titles');
    return response.data;
}