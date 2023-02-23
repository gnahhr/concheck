import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function getAllProjects(projectEngineer) {
    const response = await axios.get("http://localhost:4000/api/engineer/get-all-project",
    {
        "projectEngineer": `${projectEngineer}`
    })
    .then(response => console.log(response))
    .catch(err => console.error(err));

    console.log(projectEngineer);

    return await response;
}

export async function createProject(data) {
    const response = await axios.post("http://localhost:4000/api/engineer/create-project", data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}