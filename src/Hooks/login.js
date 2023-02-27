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