// TO-DO: Add Toast
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ListItem from '../../Components/General/ListItem.jsx';

import { getAllAdmin} from '../../Hooks/admin.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
  const [ adminList, setAdminList ] = useState([]);

  const nav = useNavigate();

  const handleGetAccounts = async () => {
    const adminResponse = await getAllAdmin();
    const adminData = adminResponse.response.data;
    setAdminList(adminData);
  }

  const createAdmin = (e) => {
    e.preventDefault();

    nav('/admin/create-admin');
  }

  useEffect(() => {
    handleGetAccounts();
  }, [])

  return (
    <main>
        <h2 className="text-center">List of Admins</h2>
        <div className="add-button" onClick={(e) => (createAdmin(e))}>
          <FontAwesomeIcon icon={faPlus} className="icon magnify-icon"/>
          <span>Create New Admin</span>
        </div>
        <div className="main-component">
          <div className="admin-list">
            <h2>Admin Accounts</h2>
            <div className="list">
                {!adminList.length ?
                <h2>No Admin Account</h2>
                :
                adminList.map(admin => 
                  <ListItem   name={admin.email}
                              key={admin.userId}
                              id={admin.userId}
                              showToast={setShowToast}
                              setToastData={setToastData}
                              type="admin" />
                  )
                }
            </div>
          </div>
        </div>
    </main>
  )
}

export default AdminPage