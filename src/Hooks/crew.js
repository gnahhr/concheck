import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function createCrew(projId, data) {
  const response = await axios.post(`${import.meta.env.VITE_API}/api/project/add-crew-account/${projId}`, data)
  .then((response) => response)
  .catch(err => console.error(err));

  return await response;
}

export async function getAllCrewByProject(projId) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/project/get-all-crew-by-project/${projId}`)
   .then((response) => response.data)
   .catch((err) => console.error(err));

   return await response;
}

// Object Id
export async function getCrewById(id) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/crew/get-crew-by-id/${id}`)
    .then((response) => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function updateCrewDetails(id, data) {
    const response = await axios.put(`${import.meta.env.VITE_API}/api/crew/update-crew-account-details/${id}`, data)
   .then((response) => response)
   .catch(err => console.error(err));

   return await response;
}

export async function getCrewDTR(id) {
  const response = await axios.get(`${import.meta.env.VITE_API}/api/crew/get-dtr-by-id/${id}`)
  .then((response) => response.data)
  .catch((err) => console.error(err));

  return await response;
}

export async function crewTimeIn(id) {
  const response = await axios.post(`${import.meta.env.VITE_API}/api/crew/crew-timein/${id}`)
  .then((response) => response.data)
  .catch((err) => console.error(err));

  return await response;
}

export async function crewTimeOut(id) {
  const response = await axios.post(`${import.meta.env.VITE_API}/api/crew/crew-timeout/${id}`)
  .then((response) => response.data)
  .catch((err) => console.error(err));

  return await response;
}