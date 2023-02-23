import React from 'react';
import img from '../../assets/placeholder/project.png';
import './ProjectItem.css';

const ProjectItem = ({projectName}) => {
  return (
    <div className="project-item">
        <img src={img} alt="" />
        <h2>{projectName}</h2>
        <a href="#"> Delete</a>
    </div>
  )
}

export default ProjectItem