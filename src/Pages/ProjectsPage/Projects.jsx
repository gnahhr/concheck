import React, { useState } from 'react'

import ProjectItem from '../../Components/ProjectItem';

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

  const [ filterProject, setFilterProject ] = useState("");

  const handleFilter = e => {
    e.preventDefault();
    setFilterProject(e.target.value);
  }

  return (
    <main>
        <div className="search-bar">
            <input type="text" name="searchbar" id="searchbar" placeholder="Search" value={filterProject} onChange={e => handleFilter(e)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon magnify-icon"/>
        </div>
        <div className="main-component">
            {!projectsList ? 
              <div className="project-item">
                <p>
                  No Projects Found. <br />
                  Click "Start New Project"
                </p>
              </div>
              :
              projectsList.filter(project => project.projectName.toUpperCase().includes(filterProject.toUpperCase())).map(project => <ProjectItem projectName={project.projectName} key={project.projectName}/>)
          }
        </div>
    </main>
  )
}

export default Projects