import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { createCrew, getCrewById, updateCrewDetails } from '../../Hooks/crew.js';

// Design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUpload } from '@fortawesome/free-solid-svg-icons';

import './CrewDetails.css';

const CrewDetails = ({}) => {
  // Form Fields State
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ contactNumber, setContactNumber ] = useState("");
  const [ startShift, setStartShift ] = useState("");
  const [ endShift, setEndShift ] = useState("");
  const [ rate, setRate ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ image, setImage ] = useState("");
  // ID
  const { id } = useParams();
  const checkId = id === undefined;

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
    "password": setPassword
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
    setEmail(data.userId.email);
    setUserId(data.userId._id);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.address);
    setContactNumber(data.contactNumber);

    document.getElementById("image-display").src = data.imageUrl;
  }

  const createFormData = () => {
    const formData = new FormData();
    
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("imageUrl", image);
    formData.append("password", password);

    return formData;
  }


  const handleEdit = async () => {
    const data = createFormData();
    const response = await updateCrewDetails(id, data);
    console.log(response);
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    document.getElementById("image-display").src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const handleSubmit = async () => {
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

    const response = await createCrew(id, data);
    console.log(await response);
  }

  useEffect(() => {
    if (!checkId){
      handleGetCrewById();
    }
  }, [])


  return (
    <main className="main-component">
        {checkId && <h1 className="text-center">Create Crew Account</h1>}
        {!checkId &&
        <div className="component-header">
            <div className="left-header">
                <img src="" alt="image" className="image" id="image-display"/>
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
                            <div className="salary-item">
                                <p className="number">Php. {rate}</p>
                                <p className="label">Earnings</p>
                            </div>
                        </div> 
                </div>
            
        </div>
        }
        

        <form action="" method="post">
            {!checkId &&
            <div className="upload-img">
                    <FontAwesomeIcon icon={faUpload} className="form-icon"/>
                    <input type="file" name="project-image" id="project-image" accept=".jpg .jpeg .png" onChange={e => handleChangeImage(e)}/>
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

            {!checkId ?
            <>    
                <div className={`form-input`}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)}/>
                </div>
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
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)}/>
                </div>
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
        </form>

        {id === undefined ?
            <div className="btn" onClick={(e) => handleSubmit(e)}>
              <span>Create Crew</span>
            </div>
            :
            <div className="btn" onClick={(e) => handleEdit(e)}>
                <span>Edit</span>
            </div>
        }
    </main>
  )
}

export default CrewDetails