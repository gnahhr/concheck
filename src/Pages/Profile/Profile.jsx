
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [ firstName, setFirstName ] = useState("First Name");
  const [ lastName, setLastName ] = useState("Last Name");
  const [ username, setUsername ] = useState("Username");
  const [ password, setPassword ] = useState("ckret");

  const [ isEdit, setIsEdit ] = useState(false);

  const setFunctions = {
    "first-name": setFirstName,
    "last-name": setLastName,
    "username": setUsername,
    "password": setPassword
  }

  const onValueChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setFunctions[name](value);
  }

  const toggleEdit = (e) => {
    e.preventDefault();

    setIsEdit(() => !isEdit);
  }

  return (
    <main className="main-component">
        <h1 className="text-center">Profile</h1>
        <div className="component-header">
            <div className="left-header">
                <div className="image">
                    IMAGE
                </div>
            </div>
            <div className="right-header">
                <form action="" method="post">
                    <div className={`form-input ${!isEdit && "form-borderless"}`}>
                        <label htmlFor="first-name">First Name:</label>
                        <input type="text" name="first-name" id="first-name" value={firstName} onChange={onValueChange} disabled={!isEdit}/>
                    </div>
                    <div className={`form-input ${!isEdit && "form-borderless"}`}>
                        <label htmlFor="last-name">Last Name:</label>
                        <input type="text" name="last-name" id="last-name" value={lastName} onChange={onValueChange} disabled={!isEdit}/>
                    </div>
                    <div className={`form-input ${!isEdit && "form-borderless"}`}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" value={username} onChange={onValueChange} disabled={!isEdit}/>
                    </div>
                    <div className={`form-input ${!isEdit && "form-borderless"}`}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={onValueChange} disabled={!isEdit}/>
                    </div>
                </form>
            </div>
        </div>

        <h2>Projects Handled</h2>
        <div className="projects-handled">
            <h3 className="empty-indicator">No Projects Found.</h3>
        </div>

        <div className="btn" onClick={(e) => toggleEdit(e)}>
            {isEdit ? "Save" : "Edit"}
        </div>
    </main>
  )
}

export default Profile