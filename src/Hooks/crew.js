import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function createCrew(data) {
  const response = await axios.post(`http://localhost:4000/api/project/add-crew-account`, data)
  .then((response) => response)
  .catch(err => console.error(err));

  return await response;
}

export async function getAllCrew() {
    const response = await axios.get(`http://localhost:4000/api/project/get-all-crew`)
   .then((response) => response)
   .catch((err) => console.error(err));

   return await response;
}

export async function getCrewById(id) {
    const response = await axios.get(`http://localhost:4000/api/crew/get-crew-by-id/${id}`)
    .then((response) => response)
    .catch(err => console.error(err));

    return await response;
}

export async function updateCrewDetails(data) {
    const response = await axios.post(`http://localhost:4000/api/crew/update-crew-details`, data)
   .then((response) => response)
   .catch(err => console.error(err));

   return await response;
}