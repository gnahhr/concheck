import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function addDailyReport (projId, data) {
    const reponse = await axios.post(`${import.meta.env.VITE_API}/api/project/add-daily-report/${projId}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function getAllDailyReport (projId) {
    const reponse = await axios.get(`${import.meta.env.VITE_API}/api/project/get-all-daily-report-by-project/${projId}`)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function getDailyReportById (id) {
    const reponse = await axios.get(`${import.meta.env.VITE_API}/api/project/get-daily-report-by-id/${id}`)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function getDailyReportByDate (projId, date) {
    const reponse = await axios.get(`${import.meta.env.VITE_API}/api/project/get-daily-report-by-date/${projId}/${date}`)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function editDailyReport (id, data) {
    const reponse = await axios.put(`${import.meta.env.VITE_API}/api/project/edit-daily-report/${id}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};