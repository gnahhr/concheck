import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { parseToken } from '../../Hooks/parseToken';

import { getAllProjects } from '../../Hooks/project';

// Components
import ListItem from '../../Components/General/ListItem';

// Styles
import './Projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const Projects = ({setSelectedProject, engId}) => {
  const [ projectsList, setProjectsList ] = useState([]);
  const [ openToast, setOpenToast ] = useState(false);

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    fetchProject();
  }, [openToast]);

  const fetchProject = async () => {
    const query = await getAllProjects(engId);
    const data = await query.response.data;
    setProjectsList(data);
  };

  const [ filterProject, setFilterProject ] = useState("");
  const nav = useNavigate();

  const handleFilter = e => {
    e.preventDefault();
    setFilterProject(e.target.value);
  }

  const createProject = (e) => {
    nav("/project/create-project")
  };

  return (
    <main>
        <h1 className="text-center">Projects</h1>
        <div className="search-bar">
            <input type="text" name="searchbar" id="searchbar" placeholder="Search" value={filterProject} onChange={e => handleFilter(e)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon magnify-icon"/>
        </div>
        <div className="add-button" onClick={(e) => (createProject(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Start New Project</span>
        </div>
        <div className="main-component">
            {projectsList.length < 1 ? 
              <div className="project-item">
                <p>
                  No Projects Found. <br />
                  Click "Start New Project"
                </p>
              </div>
              :
              projectsList.filter(project => project.projectName.toUpperCase().includes(filterProject.toUpperCase()))
                          .map(project =>
                          <ListItem name={project.projectName}
                                    image={project.imageUrl}
                                    id={project.projectId}
                                    openToast={setOpenToast}
                                    type="project"
                                    key={project.projectName}
                                    setSelectedProject={setSelectedProject}/>
                          )
          }
        </div>
    </main>
  )
}

export default Projects