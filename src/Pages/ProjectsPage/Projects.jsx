import React, { useState } from 'react'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Project from '../../Components/Project';

import './Projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
  const [ projectsList, setProjectsList ] = useState([
    {
      projectName: "Owshi"
    },
    {
      projectName: "Minecart"
    },
    {
      projectName: "Something 1"
    },
    {
      projectName: "Something 2"
    },
    {
      projectName: "Something 3"
    },
    {
      projectName: "Something 5"
    },
    {
      projectName: "Something 4"
    },
    
  ]);

  return (
    <main>
        <div className="search-bar">
            <input type="text" name="searchbar" id="searchbar" placeholder="Search"/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon magnify-icon"/>
        </div>
        <div className="projects">
            {!projectsList ? 
              <div className="project-item">
                <p>
                  No Projects Found. <br />
                  Click "Start New Project"
                </p>
              </div>
              :
              projectsList.map(project => <Project projectName={project.projectName} />)
          }
        </div>
    </main>
  )
}

export default Projects