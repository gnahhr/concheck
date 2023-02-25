import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function createEngineer(data) {
    const response = await axios.post(`http://localhost:4000/api/company/add-engineer-account`, data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function getAllEngineer() {
    const response = await axios.get(`http://localhost:4000/api/company/get-all-engineer-account`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function getEngineerById(id) {
    const response = await axios.get(`http://localhost:4000/api/company/get-engineer-account-by-id/${id}`)
   .then(response => response.data)
   .catch(err => console.error(err));
   
   return await response;
};

export async function editEngineer(id, data) {
    const response = await axios.put(`http://localhost:4000/api/company/edit-engineer-account/${id}`, data)
  .then(response => response)
  .catch(err => console.error(err));

  return await response;
}
