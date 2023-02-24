import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../Hooks/project.js';

import './ProjectItem.css';

const ProjectItem = ({projectName, projectImage, projectId, openToast}) => {
  const nav = useNavigate();
  
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await deleteProject(projectId);
    openToast(true);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    nav(`/projects/${projectId}`);
  }
  
  return (
    <div className="project-item">
        <img src={projectImage} alt={projectName} />
        <h2>{projectName}</h2>
        <div className="btn-group">
          <div className="btn" onClick={e => handleEdit(e)}>Edit</div>  
          <div className="btn red-btn" onClick={e => handleDelete(e)}>Delete</div>  
        </div>
    </div>
  )
}

export default ProjectItem