import axios from "axios"

export const createUser = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:4000/user/signup', {
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
        const response = await axios.post('http://localhost:4000/user/login', {
            "email": email,
            "password": password
        }, { withCredentials: true });
        return response;
    } catch (error: any) {
        return error?.response;
    }
}

export const findUserInfo = async () => {
    try {
        const response = await axios.get('http://localhost:4000/user/my-codes', { withCredentials: true });
        return response;
    } catch (error: any) {
        return error?.response;
    }
}

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:4000/user/logout', {}, { withCredentials: true })
        return response;
    } catch (error: any) {
        return error?.response;
    }
}

export const getProjects = async () => {
    try {
        const response = await axios.get('http://localhost:4000/user/my-codes', { withCredentials: true });
        console.log(response);
        return response;
    } catch (error: any) {
        return error?.response;
    }
}