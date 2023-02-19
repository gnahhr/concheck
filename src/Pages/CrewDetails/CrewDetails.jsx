import React, { useState } from 'react';

// Design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import './CrewDetails.css';

const CrewDetails = () => {
  // Form Fields State
  const [ firstName, setFirstName ] = useState("Ash");
  const [ lastName, setLastName ] = useState("Ketchum");
  const [ address, setAddress ] = useState("Pallet Town");
  const [ age, setAge ] = useState("18");
  const [ phoneNum, setPhoneNum ] = useState("09089556666");
  const [ startShift, setStartShift ] = useState("10:00");
  const [ endShift, setEndShift ] = useState("23:00");
  const [ rate, setRate ] = useState(500);

  const [ isEdit, setIsEdit ] = useState(false);
  
  const setFunctions = {
    "first-name": setFirstName,
    "last-name": setLastName,
    "address": setAddress,
    "age": setAge,
    "phone": setPhoneNum,
    "start-shift": setStartShift,
    "end-shift": setEndShift,
    "rate": setRate
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
    <div className="main-component">
        <div className="component-header">
            <div className="left-header">
            <div className="image">
                    IMAGE
                </div>
            </div>
            <div className="right-header">
                    <h2 className="crew-name">{`${firstName} ${lastName}`}</h2>
                    <p className="location"><FontAwesomeIcon icon={faLocationDot} className="icon icon-trim"/> Locationism</p>

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
                <label htmlFor="age">Age:</label>
                <input type="number" name="age" id="age" value={age} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>    
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" name="phone" id="phone" value={phoneNum} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" onChange={(e) => onValueChange(e)} disabled={!isEdit}/>    
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="start-shift">Start of Shift:</label>
                <input type="time" name="start-shift" id="start-shift" value={startShift} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="end-shift">End of Shift:</label>
                <input type="time" name="end-shift" id="end-shift" value={endShift} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>
            </div>
            <div className={`form-input ${!isEdit && "form-borderless"}`}>
                <label htmlFor="rate">Rate:</label>
                <input type="number" name="rate" id="rate" value={rate} onChange={(e) => onValueChange(e)} disabled={!isEdit}/>
            </div>
        </form>
    </div>
  )
}

export default CrewDetails