import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../Hooks/project.js';
import { deleteCompany } from '../../Hooks/company.js';

import './ListItem.css';

const ListItem = ({name, image, id, openToast, type, setSelectedProject}) => {
  const nav = useNavigate();

  // const deleteFunction = {
  //   "project": deleteProject,
  //   "engineer": 
  // }
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (type === "project") {
      const response = await deleteProject(id);
      console.log(response);
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

  const handleSelect = (e) => {
    e.preventDefault();

    sessionStorage.setItem("selProjId", id);
    sessionStorage.setItem("selProjName", name);

    setSelectedProject({
      id: id,
      name: name,
    })
  }
  
  return (
    <div className="list-item" onClick={e => handleSelect(e)}>
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