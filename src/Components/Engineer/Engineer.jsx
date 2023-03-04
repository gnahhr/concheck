import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../General/Toast.jsx';
import { createEngineer, editEngineer, getEngineerById } from '../../Hooks/engineer.js';

// Design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUpload } from '@fortawesome/free-solid-svg-icons';

const Engineer = ({userId, companyId}) => {
  // Form Fields State
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ licenseNumber, setLicenseNumber ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ image, setImage ] = useState("");

  //Toast
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMsg, setToastMsg ] = useState("");
  const [ toastType, setToastType ] = useState("");
  
  // ID
  let { id } = useParams();
  if (userId) id = userId;
  const checkId = id === undefined;

  const nav = useNavigate();
  
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

  const handleChangeImage = (e) => {
    e.preventDefault();
    document.getElementById("image-display").src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const handleGetEngineerById = async () => {
    const response = await getEngineerById(id);
    const data = response.response.data;

    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.address);
    setLicenseNumber(data.licenseNumber);
    setImage(data.imageUrl);

    document.getElementById("image-display").src = data.imageUrl;
  }
  
  const handleEdit = async (e) => {
    e.preventDefault();

    if(!firstName || !lastName || !address || !email || !licenseNumber || !password){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }

    const formData = createFormData();
    const response = await editEngineer(id, formData);
    
    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setToastMsg(response.data.response.message);
    setShowToast(true);
    nav('/');
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!firstName || !lastName || !address || !email || !licenseNumber || !password){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }

    const formData = createFormData();
    const response = await createEngineer(companyId, formData);
    
    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setToastMsg(response.data.response.message);
    setShowToast(true);
    setTimeout(() => nav('/'), 1500);
  }

  const createFormData = () => {
    const formData = new FormData();
    
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    formData.append("licenseNumber", licenseNumber);
    formData.append("roleId", 3);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imageUrl", image);

    return formData;
  }

  useEffect(() => {
    if (!checkId) handleGetEngineerById();
  }, [])

  return (
    <main>
      <div className="main-component">
        <div className="component-header">
            <div className="left-header">
            <div className="left-header">
                <img src="" alt="image" className="image" id="image-display"/>
            </div>
            </div>
            {id !== undefined &&
            <div className="right-header">
                    <h2 className="crew-name">{`${firstName} ${lastName}`}</h2>
                    <p className="location"><FontAwesomeIcon icon={faLocationDot} className="icon icon-trim"/>{address}</p>
            </div>
            }
        </div>

        <form action="" method="post">
            <div className="upload-img">
                <FontAwesomeIcon icon={faUpload} className="form-icon"/>
                <input type="file" name="image" id="image" accept=".jpg .jpeg .png" onChange={e => handleChangeImage(e)}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="first-name">First Name:</label>
                <input type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => onValueChange(e)} />
            </div>
            <div className={`form-input`}>
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => onValueChange(e)} />
            </div>
            <div className={`form-input`}>
                <label htmlFor="address">Address:</label>
                <input type="text" name="address" id="address" value={address} onChange={(e) => onValueChange(e)} />    
            </div>
            <div className={`form-input`}>
                <label htmlFor="license-number">License Number:</label>
                <input type="text" name="license-number" id="license-number" value={licenseNumber} onChange={(e) => onValueChange(e)}/>    
            </div>
            {checkId &&
            <div className={`form-input`}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)}/>    
            </div> }
            <div className={`form-input`}>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)}/>    
            </div>
        </form>

        {id === undefined ?
            <div className="btn" onClick={(e) => handleSubmit(e)}>
              <span>Create Engineer</span>
            </div>
            :
            <div className="btn" onClick={(e) => handleEdit(e)}>
                <span>Edit</span>
            </div>
        }
      </div>

        {showToast && <Toast message={toastMsg} toastType={toastType} showToast={setShowToast} toastState={showToast}/>}
    </main>
  )
}

export default Engineer