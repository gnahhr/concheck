import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../General/Toast.jsx';
import Loader from '../General/Loader.jsx';
import { createEngineer, editEngineer, getEngineerById } from '../../Hooks/engineer.js';
import { updatePassword } from '../../Hooks/user.js';
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
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ image, setImage ] = useState("");

  //Toast
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMsg, setToastMsg ] = useState("");
  const [ toastType, setToastType ] = useState("");

  // Toggle Change Password
  const [ changePassword, setChangePassword ] = useState(false);
  
  // ID
  let { id } = useParams();
  if (userId) id = userId;
  const checkId = id === undefined;

  // Loader state
  const [ isLoading, setIsLoading ] = useState(false);

  const nav = useNavigate();
  
  const setFunctions = {
    "first-name": setFirstName,
    "last-name": setLastName,
    "address": setAddress,
    "license-number": setLicenseNumber,
    "email": setEmail,
    "password": setPassword,
    "new-password": setNewPassword,
    "confirm-password": setConfirmPassword,
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
    setEmail(data.email);

    document.getElementById("image-display").src = data.imageUrl;
  }
  

  const handleEdit = async (e) => {
    e.preventDefault();
    
    if(!firstName || !lastName || !address || !licenseNumber){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }

    setIsLoading(true);
    
    const formData = createFormData();
    const response = await editEngineer(id, formData);
    
    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setIsLoading(false);
    setToastMsg(response.data.response.message);
    setShowToast(true);
    nav('/');
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!image || !firstName || !lastName || !address || !email || !licenseNumber || !password){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }
    
    setIsLoading(true);

    const formData = createFormData();
    const response = await createEngineer(companyId, formData);
    
    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }
    setIsLoading(false);
    setToastMsg(response.data.response.message);
    setShowToast(true);
    if (response.data.statusCode !== 400) setTimeout(() => {nav('/')}, 1500);
  }

  const createFormData = () => {
    const formData = new FormData();
    
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    formData.append("licenseNumber", licenseNumber);
    formData.append("roleId", 3);
    formData.append("email", email);
    formData.append("imageUrl", image);
    if (checkId) {
      formData.append("password", password);
    }
    return formData;
  }

  const handleToggleChangePass = (e) => {
    e.preventDefault();
    setChangePassword(!changePassword);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    const data = {
      password: password,
      newPassword: newPassword,
    }

    if (newPassword !== confirmPassword) {
      setToastType('warning');
      setToastMsg("Passwords do not match.");
      setShowToast(true);
    } else {
      const response = await updatePassword(email, data);
    
      if (response.statusCode === 200) {
        setToastType("success");
        setChangePassword(false);
      } else {
        setToastType("warning");
      }
    
      setToastMsg(response.response.message);
      setShowToast(true);
    }
  }

  useEffect(() => {
    if (!checkId) handleGetEngineerById();
  }, [])

  return (
    <>
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
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" onChange={e => handleChangeImage(e)}/>
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
            <div className={`form-input`}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)} disabled={!checkId}/>    
            </div>

            {checkId &&
              <div className={`form-input`}>
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)}/>    
              </div>
            }

        {id === undefined ?
            <div className="btn" onClick={(e) => handleSubmit(e)}>
              <span>Create Engineer</span>
            </div>
            :
            <div className="btn-group btn-group-vertical">
            <div className="btn" onClick={(e) => handleEdit(e)}>
                <span>Edit</span>
            </div>
            <div className="btn" onClick={e => handleToggleChangePass(e)}>
                <span>Change Password</span>
            </div>
          </div>}
          {changePassword && <>
            <div className="form-input">
                <label htmlFor="password">Old Password:</label>
                <input type="password" name="password" id="password" value={password} onChange={onValueChange} required/>
            </div>
            <div className="form-input">
                <label htmlFor="new-password">New Password:</label>
                <input type="password" name="new-password" id="new-password" value={newPassword} onChange={onValueChange} required/>
            </div>
            <div className="form-input">
                <label htmlFor="confirm-password">Confirm New Password:</label>
                <input type="password" name="confirm-password" id="confirm-password" value={confirmPassword} onChange={onValueChange} required/>
            </div>
            <div className="btn" onClick={e => handleChangePassword(e)}><span>Save Password</span></div>
          </>
          }
        </form>
      </div>
        {showToast && <Toast message={toastMsg} toastType={toastType} showToast={setShowToast} toastState={showToast}/>}
    </main>
    {isLoading && <Loader />}
    </>
  )
}

export default Engineer