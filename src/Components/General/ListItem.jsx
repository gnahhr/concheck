import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../Hooks/project.js';
import { deleteCompany } from '../../Hooks/company.js';
import { deleteAdmin } from '../../Hooks/admin.js';
import { deleteEngineer } from '../../Hooks/engineer.js';

import './ListItem.css';

const ListItem = ({name, image, id, showToast, type, setToastData, setSelectedProject}) => {
  const nav = useNavigate();
  
  const handleDelete = async (e) => {
    e.preventDefault();

    let response;

    if (type === "project") {
      response = await deleteProject(id);
    } else if (type === "company") {
      response = await deleteCompany(id);
    } else if (type === "engineer") {
      response = await deleteEngineer(id);
    } else if (type === "admin") {
      response = await deleteAdmin(id);
    }
    
    let toastType;

    if (response.data.statusCode === 200) {
      toastType = "success";
    } else {
      toastType = "warning";
    } 

    setToastData({
      toastMsg: response.data.response.message,
      toastType: toastType,
    });

    showToast(true);
  }

  const handleEdit = (e) => {
    e.preventDefault();

    nav(`/${type}/${id}`);
  }

  const handleSelect = (e) => {
    if (type == "project") {
      e.preventDefault();

      sessionStorage.setItem("selProjId", id);
      sessionStorage.setItem("selProjName", name);
  
      setSelectedProject({
        id: id,
        name: name,
      })
    }
  }
  
  return (
    <div className="list-item" onClick={e => handleSelect(e)}>
        {image && <img src={image} alt={name} />}
        <h2>{name}</h2>
        <div className="btn-group">
          <div className="btn" onClick={e => handleEdit(e)}>Edit</div>  
          <div className="btn red-btn" onClick={e => handleDelete(e)}>Delete</div>  
        </div>
    </div>
  )
}

export default ListItem