import React, { useState } from 'react'

import ProjectList from '../../Components/ProjectList';
import Project from '../../Components/Project';
import Profile from '../../Components/Profile';
import ProjectsCrew from '../../Components/ProjectsCrew';
import CrewDetails from '../../Components/CrewDetails';

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
        {/* <div className="main-component">
            {!projectsList ? 
              <div className="project-item">
                <p>
                  No Projects Found. <br />
                  Click "Start New Project"
                </p>
              </div>
              :
              projectsList.map(project => <ProjectList projectName={project.projectName} />)
          }
        </div> */}
        <Project />
        {/* <ProjectsCrew /> */}
        {/* <CrewDetails /> */}
        {/* <Profile /> */}
        
    </main>
  )
}

export default Projects