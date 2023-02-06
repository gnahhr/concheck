import React from 'react';
import img from '../assets/placeholder/project.png';
import './Project.css';
const Project = ({projectName}) => {

  return (
    <div className="project-item">
        <img src={img} alt="" />
        <h2>{projectName}</h2>
        <a href="#"> Delete</a>
    </div>
  )
}

export default Project