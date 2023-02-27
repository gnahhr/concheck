import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllCrewByProject } from '../../Hooks/crew';
import CrewItem from '../../Components/Crew/CrewItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectsCrew = () => {
  const [ filterCrew, setFilterCrew ] = useState("");
  const [ crewList, setCrewList ] = useState("");
  const nav = useNavigate();

  const handleFilter = e => {
    e.preventDefault();
    setFilterCrew(e.target.value);
  }

  const createCrew = e => {
    nav("/crew/create-crew");
  }

  const handleGetAllCrew = async e => {

    const response = await getAllCrewByProject("63fcab189e38da13250607ac");
    setCrewList(response.response.data);
  }

  useEffect(() => {
    handleGetAllCrew();
  }, [])

  return (
    <>
    <main>
        <h1 className="text-center">Crew</h1>
        <div className="search-bar">
            <input type="text" name="searchbar" id="searchbar" placeholder="Search" value={filterCrew} onChange={e => handleFilter(e)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon magnify-icon"/>
        </div>
        <div className="add-button" onClick={(e) => (createCrew(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Add Crew</span>
        </div>
        <div className="main-component">
          <div className="crew-list">
              {crewList.length > 0 ? 
              crewList.filter(crew =>
                {if (`${crew.firstName} ${crew.lastName}`.includes(filterCrew))
                return crew }).map((crew) => <CrewItem crew={crew}/>)
              :
              <h2 className="text-center">No crews are listed in the project</h2>
              }
          </div>
        </div>
    </main>
    </>
  )
}

export default ProjectsCrew