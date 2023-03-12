import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createCompany, editCompany, getCompanyById} from '../../Hooks/company.js';
import { updatePassword } from '../../Hooks/user.js';
//Components
import Toast from '../../Components/General/Toast';
import Loader from '../General/Loader.jsx';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons'

const Company = ({companyId}) => {
  //Form Data 
  const [ companyName, setCompanyName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ contactNumber, setContactNumber ] = useState("");
  const [ roleId, setRoleId ] = useState("");
  const [ image, setImage ] = useState("");
  const [ userId, setUserId ] = useState("");
  
  // Toggle Change Password
  const [ changePassword, setChangePassword ] = useState(false);

  // ID
  let { id } = useParams();
  if (companyId) id = companyId;
  const checkId = id === undefined;

  //Toast
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMsg, setToastMsg ] = useState("");
  const [ toastType, setToastType ] = useState("");

  // Loader state
  const [ isLoading, setIsLoading ] = useState(false);

  const nav = useNavigate();

  //Form Functions  
  const setFunctions = {
    "company-name": setCompanyName,
    "address": setAddress,
    "password": setPassword,
    "email": setEmail,
    "contact-number": setContactNumber,
    "role-id": setRoleId,
    "image": setImage,
    "new-password": setNewPassword,
    "confirm-password": setConfirmPassword,
  }

  const onValueChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setFunctions[name](value);
  }

  const createFormData = () => {
    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("imageUrl", image);
    formData.append("email", email);
    formData.append("roleId", 2);
    
    if (checkId) {
      formData.append("password", password);
    }

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

    setIsLoading(true);

    const data = createFormData();
    const response = await createCompany(data);

    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setIsLoading(false);
    setToastMsg(response.data.response.message);
    setShowToast(true);

    if (response.data.statusCode !== 400) setTimeout(() => {nav('/company')}, 1500);
  }

  const handleGetCompanyById = async () => {
    const query = await getCompanyById(id);
    const data = query.response.data;

    setCompanyName(data.companyName);
    setAddress(data.address);
    setContactNumber(data.contactNumber);
    setImage(data.imageUrl);
    setUserId(data.companyId);
    setEmail(data.email);

    document.getElementById("image-display").src = data.imageUrl;

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

  const handleEditCompany = async (e) => {
    e.preventDefault();
    if(!companyName || !address || !contactNumber){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    const data = createFormData();
    const response = await editCompany(userId, data);


    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setIsLoading(false);
    setToastMsg(response.data.response.message);
    setShowToast(true);

    if (response.data.statusCode !== 400) setTimeout(() => {nav('/crew')}, 1500);
  }

  useEffect(() => {
    if (!checkId) {
      handleGetCompanyById();
    }
  }, [])

  return (
    <>
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
                    <input type="file" name="project-image" id="project-image" accept="image/png, image/jpeg" onChange={e => handleChangeImage(e)} />
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
                {checkId && 
                  <div className="form-input">
                      <label htmlFor="password">Password:</label>
                      <input type="password" name="password" id="password" value={password} onChange={onValueChange} required/>
                  </div>
                }
                <div className="form-input">
                    <label htmlFor="email" className="email">E-mail:</label>
                    <input type="email" name="email" id="email" value={email} onChange={onValueChange} required disabled={!checkId}/>
                </div>
                <div className="form-input">
                    <label htmlFor="contact-number">Contact Number:</label>
                    <input type="text" name="contact-number" id="contact-number" value={contactNumber} onChange={onValueChange} required/>
                </div>
                {id === undefined ?
                  <div className="btn" onClick={(e) => handleCreateCompany(e)}>
                    <span>Create Company</span>
                  </div>
                  :
                  <div className="btn-group btn-group-vertical">
                    <div className="btn" onClick={(e) => handleEditCompany(e)}>
                        <span>Edit</span>
                    </div>
                    <div className="btn" onClick={e => handleToggleChangePass(e)}>
                        <span>Change Password</span>
                    </div>
                  </div>
                }
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
                </>}
            </form>
        </div>
        {showToast && <Toast message={toastMsg} toastType={toastType} showToast={setShowToast} toastState={showToast}/>}
    </main>
    {isLoading && <Loader />}
    </>
  )
}

export default Company