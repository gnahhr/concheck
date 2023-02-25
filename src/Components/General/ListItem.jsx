import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../Hooks/project.js';
import { deleteCompany } from '../../Hooks/company.js';

import './ListItem.css';

const ListItem = ({name, image, id, openToast, type}) => {
  const nav = useNavigate();

  // const deleteFunction = {
  //   "project": deleteProject,
  //   "engineer": 
  // }
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (type === "project") {
      const response = await deleteProject(id);
    } else if (type === "company") {
      console.log("company delete");
    } else if (type === "engineer") {
      console.log("company delete");
    }
    openToast(true);
  }

  const handleEdit = (e) => {
    e.preventDefault();

    nav(`/${type}/${id}`);
  }
  
  return (
    <div className="list-item">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <div className="btn-group">
          <div className="btn" onClick={e => handleEdit(e)}>Edit</div>  
          <div className="btn red-btn" onClick={e => handleDelete(e)}>Delete</div>  
        </div>
    </div>
  )
}

export default ListItem