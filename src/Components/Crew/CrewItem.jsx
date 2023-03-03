// TODO: Clarify Time in Time Out kineme

import { useState, useEffect } from 'react';
import { getCrewDTR, crewTimeIn, crewTimeOut } from '../../Hooks/crew';
import { Link } from 'react-router-dom';
import { deleteCrew } from '../../Hooks/crew';

import './CrewItem.css';

const CrewItem = ({crew, setToastData, showToast}) => {
  const [ timeIn, setTimeIn ] = useState("N/A");
  const [ timeOut, setTimeOut ] = useState("N/A");
  const {imageUrl, firstName, lastName, crewId} = crew;

  const handleGetTimeCrew = async () => {
    const response = await getCrewDTR(crewId);
    const data = response.response.data;
    
    if(response.statusCode !== 400){
      setTimeIn(data.timein);
      setTimeOut(() => (typeof data.timeout === "string") ? data.timeout : "N/A");
  }
  }

  const handleTimeInOutCrew = async (e) => {
    e.preventDefault();
    let response;

    if (timeIn === "N/A") {
        response = await crewTimeIn(crewId);
    } else if (timeOut === "N/A") {
        response = await crewTimeOut(crewId);
    }

    let toastType;

    if (response.statusCode === 200) {
      toastType = "success";
    } else {
      toastType = "warning";
    } 

    setToastData({
      toastMsg: response.response.message,
      toastType: toastType,
    });
    showToast(true);

    handleGetTimeCrew();
  }

  const handleDeleteCrew = async (e) => {
    e.preventDefault();
    const response = await deleteCrew(crewId);
    let toastType;

    if (response.statusCode === 200) {
      toastType = "success";
    } else {
      toastType = "warning";
    } 

    setToastData({
      toastMsg: response.response.message,
      toastType: toastType,
    });
    showToast(true);
    handleGetTimeCrew();
  }

  useEffect(() => {
    handleGetTimeCrew();
  }, [])

  
  return (
    <>
        <td>
            <img src={imageUrl} alt={`${firstName} ${lastName}`} className="image" />
        </td>
        <td>
            <h3 className="crew-name">{`${firstName} ${lastName}`}</h3>
            <div className="btn" onClick={e => handleTimeInOutCrew(e)}>Time in/out</div>
        </td>
        <td><p>{timeIn}</p></td>
        <td><p>{timeOut}</p></td>
        <td><p>Remarks</p></td>
        <td>
            <div className="right-item btn-group">
                <Link to={`/crew/${crewId}`} className="btn">Edit</Link>
                <div className="btn red-btn" onClick={e => handleDeleteCrew(e)}>Delete</div>
            </div>
        </td>
    </>
  )
}

export default CrewItem