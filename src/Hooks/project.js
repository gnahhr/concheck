import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function getAllProjects(projectEngineer) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/engineer/get-all-project/${projectEngineer}`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function getProjectById(id) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/project/get-project-by-id/${id}`)
   .then(response => response.data.response)
   .catch(err => console.error(err));

    return await response;
}

// engineer id
export async function createProject(engId, data) {
    const response = await axios.post(`${import.meta.env.VITE_API}/api/engineer/create-project/${engId}`, data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function editProject(projId, data) {
    const response = await axios.put(`${import.meta.env.VITE_API}/api/engineer/edit-project/${projId}`, data)
   .then(response => response)
   .catch(err => console.error(err));

   return await response;
}

export async function deleteProject(projId) {
    const response = await axios.delete(`${import.meta.env.VITE_API}/api/engineer/delete-project/${projId}`)
   .then(response => response)
   .catch(err => console.error(err));

   return await response;
}

export async function downloadCSV(projId) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/project/download-csv-by-project/${projId}`)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}