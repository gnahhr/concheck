import React, { useState } from 'react';
import { createAdmin, getAllAdmin, editAdmin } from '../../Hooks/admin.js';

const AdminPage = () => {
  //Address, Email, Contact Number, Password, Role Id, Picture
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ id, setId ] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    
    const data = {
      "email": email,
      "password": password,
      "roleId": 1
    }

    const response = await createAdmin(data);
    console.log(response);
  }

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    
    const data = {
      "email": email,
      "password": password,
      "_id": String(id)
    }

    const response = await editAdmin(data);
    console.log(response);
  }

  const handleGetAccounts = async (e) => {
    e.preventDefault();

    const response = await getAllAdmin();
    console.log(response);
  }

  const setFunctions = {
    "email": setEmail,
    "password": setPassword,
    "id": setId
  }

  const onValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFunctions[name](value);
  }

  return (
    <main>
        <h1>Admin Page</h1>
        <div className="main-component">
            <div className="admin-side">
                <div className="btn" onClick={e => handleGetAccounts(e)}>
                  <span>Show all admin accounts</span>
                </div>

                <form method="post">
                  <div className={`form-input`}>
                      <label htmlFor="id">Id:</label>
                      <input type="number" name="id" id="id" value={id} onChange={(e) => onValueChange(e)}/>
                  </div>
                  <div className={`form-input`}>
                      <label htmlFor="email">Email:</label>
                      <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)}/>
                  </div>
                  <div className={`form-input`}>
                      <label htmlFor="password">Password:</label>
                      <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)}/>
                  </div>
                  <div className="btn" onClick={e => handleCreateAdmin(e)}>
                    <span>Add Admin Account</span>
                  </div>
                  <div className="btn" onClick={e => handleEditAdmin(e)}>
                    <span>Edit Admin Account</span>
                  </div>
                  </form>
            </div>
            <div className="company-side">
                <h2>Company</h2>
            </div>
        </div>
    </main>
  )
}

export default AdminPage