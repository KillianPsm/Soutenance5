import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getToken = () => {
    return localStorage.getItem('token');
};

export const apiGet = async (endpoint: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export const apiPost = async (endpoint: string, data: any, params: any) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export const apiDelete = async (endpoint: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.delete(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export const apiPut = async (endpoint: string, data: any) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};