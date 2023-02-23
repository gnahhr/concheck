import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import CrewItem from '../../Components/Crew/CrewItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectsCrew = () => {
  const [ filterCrew, setFilterCrew ] = useState("");
  const nav = useNavigate();

  const handleFilter = e => {
    e.preventDefault();
    setFilterCrew(e.target.value);
  }

  const createCrew = e => {
    nav("/crew/create-crew");
  }

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
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
              <CrewItem />
          </div>
        </div>
    </main>
    </>
  )
}

export default ProjectsCrew