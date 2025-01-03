import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
});

export const get =  async (url: string) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const post = async (url: string, data: any) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const del = async (id: string) => {
    try {
        const response = await api.delete(`delete_data/${id}/`)
        console.log("item deleted succesfully", response)
    } catch (error) {
        console.error("Error deleting item", error)
    }
}