import type { productStoreInterface } from "../interfaces/ProductInterface";
import api from "../plugins/axios"

export const index = async (data?: string) => {
    const response = await api.get('/products', { params: { name: data } });
    return response.data;
}
export const show = async (data: number) => {
    const response = await api.get(`/products/${data}`);
    return response.data;
}

export const storeOrUpdate = async (data: productStoreInterface, id: number | undefined) => {
    const response = await api.post(`/products/${id ? id : ''}`, data);
    return response.data;
}
// export const store = async (data: products) => {
//     const response = await api.post('product/store', data);
//     return response;
// }

// export const getByCategory = async (productCategory: string) => {
//     const response = await api.get('/product/nationality', { params: productCategory });
//     return response.data;
// }

// export const destroy = async (data: product) => {
//     const response = await api.delete('product/delete', data);
//     return response;
// }
