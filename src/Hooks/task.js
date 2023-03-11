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
    .then(response => response.data.response)
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
    const reponse = await axios.put(`${import.meta.env.VITE_API}/api/project/edit-task/${id}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function updateTask (id, data) {
    const reponse = await axios.put(`${import.meta.env.VITE_API}/api/project/update-task/${id}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function deleteTask(id) {
    const reponse = await axios.delete(`${import.meta.env.VITE_API}/api/project/delete-task/${id}`)
    .then(response => response)
    .catch(err => console.error(err));
    
    return await reponse;
}