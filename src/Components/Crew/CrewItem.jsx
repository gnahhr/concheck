// TODO: Clarify Time in Time Out kineme

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DeleteModal from '../General/DeleteModal';
import { getCrewDTR, crewTimeIn, crewTimeOut } from '../../Hooks/crew';

import Profile from '../../assets/placeholder/profile-blank.webp';
import './CrewItem.css';

const CrewItem = ({crew, setToastData, showToast}) => {
  const [ timeIn, setTimeIn ] = useState("N/A");
  const [ timeOut, setTimeOut ] = useState("N/A");
  const { firstName, lastName, crewId} = crew;
  const [ showDelete, setShowDelete ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState(crew.ImageUrl ? crew.imageUrl : Profile);

  const handleGetTimeCrew = async () => {
    const response = await getCrewDTR(crewId);
    const data = response.data.response.data;
    
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
    } else {
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

  const toggleDelete = (e) => {
    e.preventDefault();

    setShowDelete(!showDelete)
  }

  const formatTime = (time) => {
    const splitTime = time.split(":");
    const AMPM = splitTime[0] > 11 ? "PM" : "AM";
    if (time !== "N/A") return `${splitTime[0] > 12 ? splitTime[0] - 12 : splitTime[0]} : ${splitTime[1]} ${AMPM}`;
    return "N/A";
  }

  useEffect(() => {
    handleGetTimeCrew();

    if (crew.imageUrl && crew.imageUrl !== "") {
      setImageUrl(crew.imageUrl)
    }

  }, [])

  useEffect(() => {
    handleGetTimeCrew();
  }, [showDelete])

  
  return (
    <>
        <td>
            <img src={imageUrl} alt={`${firstName} ${lastName}`} className="image" />
        </td>
        <td>
            <h3 className="crew-name"><span className="desktop-only">{`${firstName}`}</span> <span>{`${lastName}`}</span></h3>
            <div className="btn" onClick={e => handleTimeInOutCrew(e)}>Time in/out</div>
        </td>
        <td><p>{formatTime(timeIn)}</p></td>
        <td><p>{formatTime(timeOut)}</p></td>
        <td>
            <div className="right-item btn-group">
                <Link to={`/crew/${crewId}`} className="btn">Edit</Link>
                <div className="btn red-btn" onClick={e => toggleDelete(e)}>Delete</div>
            </div>
        </td>
        {showDelete && <DeleteModal type={"crew"}
                                id={crewId}
                                setToastData={setToastData}
                                showToast={showToast}
                                showDelete={setShowDelete}/>}
    </>
  )
}

export default CrewItem