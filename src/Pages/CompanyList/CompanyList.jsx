import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import ListItem from '../../Components/General/ListItem';
import Toast from '../../Components/General/Toast';

import { getAllCompany } from '../../Hooks/company.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CompanyList = () => {
    const [ listCompanies, setListCompanies ] = useState([]);

    // Toast States
    const [ showToast, setShowToast ] = useState(false);
    const [ toastData, setToastData ] = useState(); 
   
    const nav = useNavigate();

    const handleGetCompanies = async () => {
        const query = await getAllCompany();
        setListCompanies(query.response.data);
    }

    const createCompany = (e) => {
        e.preventDefault();

        nav(`/company/create-company`);
    }

    useEffect(() => {
        handleGetCompanies();
    }, [])

    useEffect(() => {
        handleGetCompanies();
    }, [toastData])

  return (
    <main>
        <h2 className="text-center">List of Companies</h2>
        <div className="add-button" onClick={(e) => (createCompany(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Create New Company</span>
        </div>
        <div className="main-component">
            {listCompanies.length > 0 ?
                listCompanies.map(company => 
                    <ListItem name={company.companyName}
                              key={company.companyId}
                              image={company.imageUrl}
                              id={company.companyId}
                              showToast={setShowToast}
                              setToastData={setToastData}
                              type="company" />
                    )
             :
             <h2>No Account Companies</h2>
            }
        </div>
        {showToast && <Toast message={toastData.toastMsg}
                             toastType={toastData.toastType}
                             showToast={setShowToast}
                             toastState={showToast}/>}
    </main>
  )
}

export default CompanyList