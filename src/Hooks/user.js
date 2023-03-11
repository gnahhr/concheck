import axios from "axios";

export async function login (email, password) {
    const reponse = await axios.post(`${import.meta.env.VITE_API}/api/user/login`, {
        "email": email,
        "password": password,
    })
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function updatePassword (email, data) {
    const response = await axios.put(`${import.meta.env.VITE_API}/api/user/change-password/${email}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function forgotPasswordReq(email) {
    const response = await axios.post(`${import.meta.env.VITE_API}/api/user/forgot-password/`, {
        email
    })
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};