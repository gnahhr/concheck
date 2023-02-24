import React, { useState} from 'react';
import {createCompany, editCompany, getCompanyById} from '../../Hooks/company.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const Company = () => {
  //Form Data 
  const [ companyName, setCompanyName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ contactNumber, setContactNumber ] = useState("");
  const [ roleId, setRoleId ] = useState("");
  const [ image, setImage ] = useState("");

  // ID
  const { id } = useParams();
  const checkId = id === undefined;

  //Toggle
  const [ isEdit, setIsEdit ] = useState(checkId);

  //Form Functions  
  const setFunctions = {
    "company-name": setCompanyName,
    "address": setAddress,
    "password": setPassword,
    "email": setEmail,
    "contact-number": setContactNumber,
    "role-id": setRoleId,
    "image": setImage
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

  const createFormData = () => {
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("imageUrl", image);
    formData.append("email", email);
    formData.append("roleId", 2);

    return formData;
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    document.getElementById("image-display").src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    const data = createFormData();
    const response = await createCompany(data);

    console.log(response);

  }

  const handleEditCompany = async (e) => {
    e.preventDefault();
    console.log(editCompany);
    // const data = createFormData();
    // const response = await editCompany(data);

    // console.log(response);

  }

  return (
    <div className="main-component">
        <h2>Company</h2>
        <div className="component-header">
            <div className="left-header">
                <img src="" alt="image" className="image" id="image-display"/>
            </div>
            <div className="right-header">
                <h3 className="hproject-name">Company Name</h3>
            </div>
        </div>
        <h2>Project Details</h2>
        <div className="upload-img">
                <FontAwesomeIcon icon={faUpload} className="form-icon"/>
                <input type="file" name="project-image" id="project-image" accept=".jpg .jpeg .png" onChange={e => handleChangeImage(e)}/>
            </div>
        {/* Fields */}
        <form action="#" method="post" className="project-details">
            <div className="form-input">
                <label htmlFor="company-name">Company name:</label>
                <input type="text" name="company-name" id="company-name" value={companyName} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="address">Address:</label>
                <input type="text" name="address" id="address" value={address} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={password} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="email" className="email">E-mail:</label>
                <input type="email" name="email" id="email" value={email} onChange={onValueChange} disabled={!isEdit} />
            </div>
            <div className="form-input">
                <label htmlFor="contact-number">Contact Number:</label>
                <input type="text" name="contact-number" id="contact-number" value={contactNumber} onChange={onValueChange} disabled={!isEdit}/>
            </div>

            {id === undefined ?
            <div className="btn" onClick={(e) => handleCreateCompany(e)}>
              <span>Create Company</span>
            </div>
            :
            <div className="btn" onClick={(e) => handleEditCompany(e)}>
                <span>"Save"</span>
            </div>
            }
        </form>
    </div>
  )
}

export default Company