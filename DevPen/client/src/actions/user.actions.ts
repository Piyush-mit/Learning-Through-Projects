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