import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import CrewItem from '../../Components/Crew/CrewItem';
import Toast from '../../Components/General/Toast';

import { getAllCrewByProject } from '../../Hooks/crew';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import './ProjectsCrew.css';

const ProjectsCrew = ({}) => {
  const [ filterCrew, setFilterCrew ] = useState("");
  const [ crewList, setCrewList ] = useState("");
  const selectedProject = sessionStorage.getItem("selProjId");
  const nav = useNavigate();

 const [ showToast, setShowToast ] = useState(false);
 const [ toastData, setToastData ] = useState({});

  const handleFilter = e => {
    e.preventDefault();
    setFilterCrew(e.target.value);
  }

  const tableHeaders = ["Image", "Name", "Time In", "Time Out", "Remarks", "Actions"];

  const createCrew = e => {
    nav("/crew/create-crew");
  }

  const handleGetAllCrew = async e => {
    const response = await getAllCrewByProject(selectedProject);
    const data = response.response.data;
    if (data) setCrewList(data);
  }

  useEffect(() => {
    handleGetAllCrew();
  }, [])

  useEffect(() => {
    handleGetAllCrew();
  }, [showToast])

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
          {crewList && crewList.length > 0 ? 
            <table>
              <tr>
                {tableHeaders.map(header => <th>{header}</th>)}
              </tr>

              {crewList.filter(crew =>
                {if (`${crew.firstName} ${crew.lastName}`.includes(filterCrew))
                return crew }).map((crew) =>
                <tr><CrewItem crew={crew}
                              showToast={setShowToast}
                              setToastData={setToastData}/>
                </tr>)}

            </table>
            :
            <h2 className="text-center">No crews are listed in the project</h2>
          }
        </div>
      </div>
      {showToast && <Toast message={toastData.toastMsg}
                             toastType={toastData.toastType}
                             showToast={setShowToast}
                             toastState={showToast}/>}
    </main>
    </>
  )
}

export default ProjectsCrew