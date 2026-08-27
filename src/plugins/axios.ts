import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Request-With': 'XMLHttpRequest'
    }
});

export const tokenCSRF = async (): Promise<void> => {
    const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
}

export default api;
