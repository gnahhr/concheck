import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ListItem from '../../Components/General/ListItem';
import Toast from '../../Components/General/Toast';
import { getAllEngineer } from '../../Hooks/engineer.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EngineerList = ({companyId}) => {
  const [ engineerList, setEngineerList ] = useState([]);
  const nav = useNavigate();

  // Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState(); 
  
  const handleGetAllEngineer = async () => {
    const response = await getAllEngineer(companyId);
    const data = response.response.data;
    if (response.response.data) {
      setEngineerList(data);
    }
  }

  const createEngineer = (e) => {
    e.preventDefault();
    nav(`/engineer/create-engineer`)
  }

  useEffect(() => {
    handleGetAllEngineer();
  }, [])

  useEffect(() => {
    handleGetAllEngineer();
  }, [toastData])


  return (
    <main>
        <h2>Engineer List</h2>
        <div className="add-button" onClick={(e) => (createEngineer(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Create Engineer Account</span>
        </div>
        <div className="main-component">
            {!engineerList.length ? 
                <h2>No Engineers</h2>
                :
                engineerList.map(engineer =>
                  <ListItem name={`${engineer.firstName} ${engineer.lastName}`}
                            image={engineer.imageUrl}
                            id={engineer.engineerId}
                            showToast={setShowToast}
                            setToastData={setToastData}
                            type="engineer"
                  />    
              )
            }
        </div>

        {showToast && <Toast message={toastData.toastMsg}
                             toastType={toastData.toastType}
                             showToast={setShowToast}
                             toastState={showToast}/>}
    </main>
  )
}

export default EngineerList