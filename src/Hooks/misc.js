import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function addTask(data) {
    const response = await axios.post(`${import.meta.env.VITE_API}/api/project/add-task`, data)
    .then((response) => response)
    .catch(err => console.error(err));

    return await response;
}

export async function addDailyReport(data) {
    const response = await axios.post(`${import.meta.env.VITE_API}/api/project/add-daily-report`, data)
   .then((response) => response)
   .catch(err => console.error(err));

   return await response;
}

export async function uploadImage(data) {
  const response = await axios.post(`${import.meta.env.VITE_API}/api/project/upload-image`, data)
  .then((response) => response)
  .catch(err => console.error(err));

  return await response;
}