import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function uploadImage (projId, data) {
    const reponse = await axios.post(`${import.meta.env.VITE_API}/api/project/upload-image/${projId}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await reponse;
};

export async function getImages(projId) {
    const response = await axios.get(`${import.meta.env.VITE_API}/api/project/get-image-by-project/${projId}`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function editCaption(imageId, data) {
    const response = await axios.put(`${import.meta.env.VITE_API}/api/project/edit-image/${imageId}`, data)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}

export async function deleteImage(imageId) {
    const response = await axios.delete(`${import.meta.env.VITE_API}/api/project/delete-image-by-id/${imageId}`)
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
}