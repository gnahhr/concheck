import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function createAdmin(data) {
    const response = await axios.post(`http://localhost:4000/api/admin/add-admin-account`, data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function getAdminById(id) {
    const response = await axios.get(`http://localhost:4000/api/admin/get-admin-account-by-id/${id}`)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function getAllAdmin() {
    const response = await axios.get(`http://localhost:4000/api/admin/get-all-admin-account`)
   .then(response => response.data)
   .catch(err => console.error(err));

   return await response;
}

export async function editAdmin(id, data) {
    const response = await axios.put(`http://localhost:4000/api/admin/edit-admin-account/${id}`, data)
  .then(response => response)
  .catch(err => console.error(err));

  return await response;
}

export async function deleteAdmin(id) {
    const response = await axios.delete()
}