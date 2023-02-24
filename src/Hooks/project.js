import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function getAllProjects(projectEngineer) {
    const response = await axios.get(`http://localhost:4000/api/engineer/get-all-project/${projectEngineer}`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function getProjectById(id) {
    const response = await axios.get(`http://localhost:4000/api/project/get-project-by-id/${id}`)
   .then(response => console.log(response))
   .catch(err => console.error(err));

    return await response;
}

export async function createProject(data) {
    const response = await axios.post("http://localhost:4000/api/engineer/create-project", data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function editProject(data) {
    const response = await axios.put(`http://localhost:4000/api/engineer/edit-project`, data)
   .then(response => response)
   .catch(err => console.error(err));

   return await response;
}

export async function deleteProject(objId) {
    const response = await axios.delete(`http://localhost:4000/api/engineer/delete-project/${objId}`)
   .then(response => response)
   .catch(err => console.error(err));

   return await response;
}