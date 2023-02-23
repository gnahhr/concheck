import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Engineer = () => {
  // Form Fields State
  const [ firstName, setFirstName ] = useState("Ash");
  const [ lastName, setLastName ] = useState("Ketchum");
  const [ address, setAddress ] = useState("Pallet Town");
  const [ licenseNumber, setLicenseNumber ] = useState("18");
  const [ email, setEmail ] = useState("09089556666");
  const [ password, setPassword ] = useState("13121321");

// ID
const { id } = useParams();
const checkId = id === undefined;

//Toggle
const [ isEdit, setIsEdit ] = useState(checkId);
  
  const setFunctions = {
    "first-name": setFirstName,
    "last-name": setLastName,
    "address": setAddress,
    "license-number": setLicenseNumber,
    "email": setEmail,
    "password": setPassword,
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
        <div className="component-header">
            <div className="left-header">
            <div className="image">
                    IMAGE
            </div>
            </div>
            {id !== undefined &&
            <div className="right-header">
                    <h2 className="crew-name">{`${firstName} ${lastName}`}</h2>
                    <p className="location"><FontAwesomeIcon icon={faLocationDot} className="icon icon-trim"/> Locationism</p>
            </div>
            }
        </div>

        <form action="" method="post">
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="first-name">First Name:</label>
                <input type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="address">Address:</label>
                <input type="text" name="address" id="address" value={address} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>    
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="license-number">License Number:</label>
                <input type="text" name="license-number" id="license-number" value={licenseNumber} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" onChange={(e) => onValueChange(e)} disabled={!isEdit}/>    
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>    
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>    
            </div>
        </form>

        {id === undefined ?
            <div className="btn" onClick={(e) => toggleEdit(e)}>
              <span>Create Engineer</span>
            </div>
            :
            <div className="btn" onClick={(e) => toggleEdit(e)}>
                <span>{isEdit? "Save" : "Edit"}</span>
            </div>
        }
    </main>
  )
}

export default Engineer