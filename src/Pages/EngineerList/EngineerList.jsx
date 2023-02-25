import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '../../Components/General/ListItem';
import { getAllEngineer } from '../../Hooks/engineer.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EngineerList = () => {
  const [ engineerList, setEngineerList ] = useState([]);
  const [ toast, setOpenToast ] = useState(false);

  const nav = useNavigate();
  
  const handleGetAllEngineer = async () => {
    const response = await getAllEngineer();
    const data = response.response.data;
    setEngineerList(data);
  }

  const createEngineer = (e) => {
    e.preventDefault();
    nav(`/engineer/create-engineer`)
  }

  useEffect(() => {
    handleGetAllEngineer();
  }, [])


  return (
    <main>
        <h2>Engineer List</h2>
        <div className="add-button" onClick={(e) => (createEngineer(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Create Engineer Account</span>
        </div>
        <div className="main-component">
            {engineerList.length > 0 ? 
                engineerList.map(engineer =>
                    <ListItem name={`${engineer.firstName} ${engineer.lastName}`}
                              image={engineer.imageUrl}
                              id={engineer.userId._id}
                              openToast={setOpenToast}
                              type="engineer"
                    />    
                )
                :
                <h2>hatdog</h2>
            }
        </div>
    </main>
  )
}

export default EngineerList