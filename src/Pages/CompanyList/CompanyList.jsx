import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import ListItem from '../../Components/General/ListItem';
import { getAllCompany } from '../../Hooks/company.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CompanyList = () => {
    const [ listCompanies, setListCompanies ] = useState([]);
    const [ openToast, setOpenToast ] = useState(false);

    const nav = useNavigate();

    const handleGetCompanies = async () => {
        const query = await getAllCompany();
        setListCompanies(query.response.data);
    }

    const createCompany = (e) => {
        e.preventDefault();

        nav(`/projects/create-project`);
    }

    useEffect(() => {
        handleGetCompanies();
    }, [])
  return (
    <main>
        <h2 className="text-center">List of Companies</h2>
        <div className="add-button" onClick={(e) => (createCompany(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Start New Project</span>
        </div>
        <div className="main-component">
            {listCompanies.length > 0 ?
                listCompanies.map(company => 
                    <ListItem name={company.companyName}
                              image={company.imageUrl}
                              id={company.userId._id}
                              openToast={setOpenToast}
                              type="company" />
                    )
             :
             <h2>No Account Companies</h2>
            }
        </div>
    </main>
  )
}

export default CompanyList