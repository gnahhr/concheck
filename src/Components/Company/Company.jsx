import React, { useState, useEffect} from 'react';
import {createCompany, editCompany, getCompanyById} from '../../Hooks/company.js';
import Toast from '../../Components/General/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const Company = ({companyId}) => {
  //Form Data 
  const [ companyName, setCompanyName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ contactNumber, setContactNumber ] = useState("");
  const [ roleId, setRoleId ] = useState("");
  const [ image, setImage ] = useState("");
  const [ userId, setUserId ] = useState("");

  // ID
  let { id } = useParams();
  if (companyId) id = companyId;
  const checkId = id === undefined;

  //Toast
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMsg, setToastMsg ] = useState("");
  const [ toastType, setToastType ] = useState("");

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

  const createFormData = () => {
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("imageUrl", image);
    formData.append("email", email);
    formData.append("roleId", 2);
    console.log(formData);
    return formData;
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    document.getElementById("image-display").src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    if(!companyName || !address || !password || !email || !contactNumber){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }

    const data = createFormData();
    const response = await createCompany(data);

    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setToastMsg(response.data.response.message);
    setShowToast(true);
  }

  const handleGetCompanyById = async () => {
    const query = await getCompanyById(id);
    const data = query.response.data;

    setCompanyName(data.companyName);
    setAddress(data.address);
    setContactNumber(data.contactNumber);
    setImage(data.imageUrl);
    setUserId(data.companyId);

    document.getElementById("image-display").src = data.imageUrl;

  }

  const handleEditCompany = async (e) => {
    e.preventDefault();
    // console.log(editCompany);
    if(!companyName || !address || !password || !email || !contactNumber){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }
    const data = createFormData();
    const response = await editCompany(userId, data);


    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setToastMsg(response.data.response.message);
    setShowToast(true);
  }

  useEffect(() => {
    if (!checkId) {
      handleGetCompanyById();
    }
  }, [])

  return (
    <main>
        <h2>Company</h2>
        <div className="main-component">
            <div className="component-header">
                <div className="left-header">
                    <img src="" alt="image" className="image" id="image-display"/>
                </div>
                <div className="right-header">
                    <h3 className="hproject-name">{companyName}</h3>
                </div>
            </div>
            <h2>Project Details</h2>
            <div className="upload-img">
                    <FontAwesomeIcon icon={faUpload} className="form-icon"/>
                    <input type="file" name="project-image" id="project-image" accept=".jpg .jpeg .png" onChange={e => handleChangeImage(e)} />
                </div>
            {/* Fields */}
            <form action="#" method="post" className="project-details">
                <div className="form-input">
                    <label htmlFor="company-name">Company name:</label>
                    <input type="text" name="company-name" id="company-name" value={companyName} onChange={onValueChange} required/>
                </div>
                <div className="form-input">
                    <label htmlFor="address">Address:</label>
                    <input type="text" name="address" id="address" value={address} onChange={onValueChange} required/>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={onValueChange} required/>
                </div>
                {checkId &&
                <div className="form-input">
                    <label htmlFor="email" className="email">E-mail:</label>
                    <input type="email" name="email" id="email" value={email} onChange={onValueChange} required/>
                </div>}
                <div className="form-input">
                    <label htmlFor="contact-number">Contact Number:</label>
                    <input type="text" name="contact-number" id="contact-number" value={contactNumber} onChange={onValueChange} required/>
                </div>

                {id === undefined ?
                <div className="btn" onClick={(e) => handleCreateCompany(e)}>
                  <span>Create Company</span>
                </div>
                :
                <div className="btn" onClick={(e) => handleEditCompany(e)}>
                    <span>Edit</span>
                </div>
                }
            </form>
        </div>
        {showToast && <Toast message={toastMsg} toastType={toastType} showToast={setShowToast} toastState={showToast}/>}
    </main>
  )
}

export default Company