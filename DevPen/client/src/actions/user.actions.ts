import axios from "axios"

export const createUser = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/signup`, {
            "username": username,
            "email": email,
            "password": password
        }, { withCredentials: true });
        return response;
    } catch (error: any) {
        return error?.response;
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/login`, {
            "email": email,
            "password": password
        }, { withCredentials: true });
        return response;
    } catch (error: any) {
        return error?.response;
    }
}

export const findUserInfo= async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/my-codes`, { withCredentials: true });
        return response;
    } catch (error: any) {
        return error?.response;
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/logout`, {}, { withCredentials: true })
        return response;
    } catch (error: any) {
        return error?.response;
    }
}
