import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function createEngineer(companyId, data) {
    const response = await axios.post(`${import.meta.env.VITE_API}/api/company/add-engineer-account/${companyId}`, data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function getAllEngineer(companyId) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/company/get-all-engineer-account-by-company/${companyId}`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function getEngineerById(id) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/company/get-engineer-account-by-id/${id}`)
   .then(response => response.data)
   .catch(err => console.error(err));
   
   return await response;
};

export async function editEngineer(id, data) {
    const response = await axios.put(`${import.meta.env.VITE_API}/api/company/edit-engineer-account/${id}`, data)
  .then(response => response)
  .catch(err => console.error(err));

  return await response;
}

export async function deleteEngineer(id) {
  const response = await axios.delete(`${import.meta.env.VITE_API}/api/company/delete-engineer/${id}`)
  .then(response => response)
  .catch(err => console.error(err));

  return await response;
}
