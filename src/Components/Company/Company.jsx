import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const Company = () => {
  //Form Data 
  const [ companyName, setCompanyName ] = useState("Sample Project Name");
  const [ address, setAddress ] = useState("Somewhere");
  const [ password, setPassword ] = useState("2019-04-04");
  const [ email, setEmail ] = useState("Engineer 1");
  const [ contactNumber, setContactNumber ] = useState("Engineer 2");
  const [ roleId, setRoleId ] = useState("Officer 1");
  const [ image, setImage ] = useState("ABC123");

  // ID
  const { id } = useParams();
  const checkId = id === undefined;
  console.log(id, "Check");

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

  const createCompany = () => {
    // post request to create a project from form submit using axios

  }

  return (
    <div className="main-component">
        <h2>Company</h2>
        <div className="component-header">
            <div className="left-header">
                <div className="image">
                    IMAGE                
                </div>
            </div>
            <div className="right-header">
                <h3 className="hproject-name">Company Name</h3>
            </div>
        </div>
        <h2>Project Details</h2>
        <div className="upload-img">
            <FontAwesomeIcon icon={faUpload} className="form-icon"/>
            <span>Upload Image</span>
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
            <div className="form-input">
                <label htmlFor="role-id">Role ID:</label>
                <input type="text" name="role-id" id="role-id" value={roleId} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="image">Image:</label>
                <input type="text" name="image" id="image" value={image} onChange={onValueChange} disabled={!isEdit}/>
            </div>

            {id === undefined ?
            <div className="btn" onClick={(e) => toggleEdit(e)}>
              <span>Create Company</span>
            </div>
            :
            <div className="btn" onClick={(e) => toggleEdit(e)}>
                <span>{isEdit? "Save" : "Edit"}</span>
            </div>
            }
        </form>
    </div>
  )
}

export default Company