import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function addTask (projId, data) {
    const reponse = await axios.post(`${import.meta.env.VITE_API}/api/project/add-task/${projId}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function getAllTasks (projId) {
    const reponse = await axios.get(`${import.meta.env.VITE_API}/api/project/get-all-task/${projId}`)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function getTaskById (id) {
    const reponse = await axios.get(`${import.meta.env.VITE_API}/api/project/get-task-by-id/${id}`)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function editTask (id, data) {
    const reponse = await axios.get(`${import.meta.env.VITE_API}/api/project/edit-task/${id}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};