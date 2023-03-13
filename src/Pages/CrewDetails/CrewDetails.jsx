import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Toast from '../../Components/General/Toast.jsx';
import Loader from '../../Components/General/Loader.jsx';

import { createCrew, getCrewById, updateCrewDetails, downloadCrewDTR } from '../../Hooks/crew.js';
import { updatePassword } from '../../Hooks/user.js';

// Design
import Profile from '../../assets/placeholder/profile-blank.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUpload } from '@fortawesome/free-solid-svg-icons';

import './CrewDetails.css';

const CrewDetails = ({projId, userId}) => {
  // Form Fields State
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ contactNumber, setContactNumber ] = useState("");
  const [ startShift, setStartShift ] = useState("");
  const [ endShift, setEndShift ] = useState("");
  const [ rate, setRate ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ image, setImage ] = useState("");
  const [ downloadData, setDownloadData ] = useState();
  
  // Toggle Change Password
  const [ changePassword, setChangePassword ] = useState(false);
  
  // ID
  let { id } = useParams();
  if ( userId ) id = userId;
  const checkId = id === undefined;


  //Toast
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMsg, setToastMsg ] = useState("");
  const [ toastType, setToastType ] = useState("");

  // Loader state
  const [ isLoading, setIsLoading ] = useState(false);

  const nav = useNavigate();

  //Toggle
  const setFunctions = {
    "first-name": setFirstName,
    "last-name": setLastName,
    "address": setAddress,
    "contact-number": setContactNumber,
    "start-shift": setStartShift,
    "end-shift": setEndShift,
    "rate": setRate,
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

  const handleGetCrewById = async e => {
    const response = await getCrewById(id);
    const data = response.response.data;

    setRate(data.dailyRate);
    setEndShift(data.endShift);
    setStartShift(data.startShift);
    setEmail(data.email);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.address);
    setContactNumber(data.contactNumber);

    if (data.imageUrl !== undefined) document.getElementById("image-display").src = data.imageUrl;
  }

  const createFormData = () => {
    const formData = new FormData();
    
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    
    if (checkId) {
      formData.append("password", password);
    } else {
      formData.append("imageUrl", image);
    }

    return formData;
  }


  const handleEdit = async () => {

    if(!firstName || !lastName || !address || !contactNumber){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }
    
    setIsLoading(true);

    const data = createFormData();
    const response = await updateCrewDetails(id, data);

    if(response.data.statusCode === 200){
      setToastType("success");
    } else {
      setToastType("warning");
    }

    setIsLoading(false);
    setToastMsg(response.data.response.message);
    setShowToast(true);
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    document.getElementById("image-display").src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const handleSubmit = async () => {

    if(!firstName || !lastName || !email || !password || !startShift || !endShift || !rate){
      setToastType("warning");
      setToastMsg("Please input all fields.");
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    const data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "dailyRate": rate,
        "startShift": startShift,
        "endShift": endShift,
        "roleId": 4
    };

    const response = await createCrew(projId, data);
    
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
      console.log(response);
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

  const handleDownload = async () => {
    const response = await downloadCrewDTR(id);
    setDownloadData(`data:text/csv;charset=utf-8,${(response)}`)
  }

  useEffect(() => {
    if (!checkId){
      handleGetCrewById();
      handleDownload();
    }
  }, [])

  useEffect(() => {
    if (downloadData) setTimeout(() => {setDownloadData()}, 2000);
  }, [downloadData])


  return (
    <>
    <main>
        <h2>Crew</h2>
        <div className="main-component">
        {checkId && <h1 className="text-center">Create Crew Account</h1>}
        {!checkId &&
        <div className="component-header">
            <div className="left-header">
                <img src={Profile} alt="image" className="image" id="image-display"/>
            </div>

                <div className="right-header">
                        {firstName && lastName &&
                        <h2 className="crew-name">{`${firstName} ${lastName}`}</h2> }
                        {address && <p className="location"><FontAwesomeIcon icon={faLocationDot} className="icon icon-trim"/>{address}</p> }
                        
                        <div className="crew-salary">
                            <div className="salary-item">
                                <p className="number">Php. {rate}</p>
                                <p className="label">Rate</p>
                            </div>
                        </div> 
                </div>
            
        </div>
        }
        

        <form action="" method="post">
            {!checkId &&
            <div className="upload-img">
                    <FontAwesomeIcon icon={faUpload} className="form-icon"/>
                    <input type="file" name="project-image" id="project-image" accept="image/png, image/jpg, image/jpeg" onChange={e => handleChangeImage(e)}/>
            </div>
            }

            <div className={`form-input`}>
                <label htmlFor="first-name">First Name:</label>
                <input type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => onValueChange(e)}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="last-name">Last Name:</label>
                <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => onValueChange(e)}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)} disabled={!checkId}/>
            </div>

            {!checkId ?
            <>    
                <div className={`form-input`}>
                    <label htmlFor="address">Address:</label>
                    <input type="text" name="address" id="address" value={address} onChange={(e) => onValueChange(e)}/>    
                </div>
                <div className={`form-input`}>
                    <label htmlFor="contact-number">Contact Number:</label>
                    <input type="tel" name="contact-number" id="contact-number" value={contactNumber} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" onChange={(e) => onValueChange(e)}/>    
                </div>
            </>
            :
            <>
                <div className={`form-input`}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)}/>
                </div>
                <div className={`form-input`}>
                    <label htmlFor="start-shift">Start of Shift:</label>
                    <input type="time" name="start-shift" id="start-shift" value={startShift} onChange={(e) => onValueChange(e)}/>
                </div>
                <div className={`form-input`}>
                    <label htmlFor="end-shift">End of Shift:</label>
                    <input type="time" name="end-shift" id="end-shift" value={endShift} onChange={(e) => onValueChange(e)}/>
                </div>
                <div className={`form-input`}>
                    <label htmlFor="rate">Daily Rate:</label>
                    <input type="number" name="rate" id="rate" value={rate} onChange={(e) => onValueChange(e)}/>
                </div>
            </>
            }

            {id === undefined ?
                <div className="btn" onClick={(e) => handleSubmit(e)}>
                  <span>Create Crew</span>
                </div>
                :
                <div className="btn-group btn-group-vertical">
                  <div className="btn" onClick={(e) => handleEdit(e)}>
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
        {!checkId && <a className="btn green-btn download-btn"
                        href={downloadData}
                        download="dtr.csv">
                          Download DTR
                        </a>}
        </div>
      {showToast && <Toast message={toastMsg} toastType={toastType} showToast={setShowToast} toastState={showToast}/>}
    </main>
    {isLoading && <Loader />}
    </>
  )
}

export default CrewDetails