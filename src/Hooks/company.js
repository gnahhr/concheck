import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function createCompany (data) {
    const response = await axios.post(`http://localhost:4000/api/admin/add-company-account`, data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function getCompanyById (id) {
    const response = await axios.get(`http://localhost:4000/api/admin/get-company-account-by-id/${id}`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
};

export async function getAllCompany() {
    const response = await axios.get(`http://localhost:4000/api/admin/get-all-company-account/`)
   .then(response => response.data)
   .catch(err => console.error(err));

   return await response;
}

export async function editCompany(id, data) {
    const response = await axios.put(`http://localhost:4000/api/admin/edit-company-account/${id}`, data)
    .then(response => response)
    .catch(err => console.error(err));

    return await response;
}

export async function deleteCompany(id) {
    console.log(`Haha delete company: ${id}`)
    // const response = await axios.delete(``)
}