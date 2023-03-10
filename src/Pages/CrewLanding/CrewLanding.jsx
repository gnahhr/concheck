// TODO: Convert to 12 Hours time format
import { useState, useEffect } from 'react';

import Toast from '../../Components/General/Toast';
import { getCrewById, crewTimeIn, crewTimeOut, getCrewDTR } from '../../Hooks/crew';

import './CrewLanding.css';

const CrewLanding = ({userId}) => {
  const [ date, setDate ] = useState();
  const [ timeIn, setTimeIn ] = useState("N/A");
  const [ timeOut, setTimeOut ] = useState("N/A");
  const [ name, setName ] = useState();

  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState({});

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const handleGetDetails = async () => {
    const response = await getCrewById(userId);
    const data = response.response.data;
    
    setName(`${data.firstName} ${data.lastName}`)
    document.getElementById("image-display").src = data.imageUrl;
  }

  const getDate = () => {
    const date = new Date();
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const handleGetTimeCrew = async () => {
    const response = await getCrewDTR(userId);
    const data = response.response.data;
    
    if(response.statusCode !== 400){
      setTimeIn(data.timein);
      setTimeOut(() => (typeof data.timeout === "string") ? data.timeout : "N/A");
    } else {
      setToastData({
        toastType: "warning",
        toastMsg: data.message
      })
      setShowToast(true);
    }
  }

  const formatTime = (time) => {
    const splitTime = time.split(":");
    const AMPM = splitTime[0] > 11 ? "PM" : "AM";
    if (time !== "N/A") return `${splitTime[0] > 12 ? splitTime[0] - 12 : splitTime[0]} : ${splitTime[1]} ${AMPM}`;
    return "N/A";
  }

  const handleTimeInOutCrew = async (e) => {
    e.preventDefault();
    let response;

    if (timeIn === "N/A") {
        response = await crewTimeIn(userId);
    } else {
        response = await crewTimeOut(userId);
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
    
    setShowToast(true);
    handleGetTimeCrew();
  }

  useEffect(() => {
    handleGetDetails();
    setDate(getDate);
    handleGetTimeCrew();
  }, []);

  return (
    <main>
        <div className="main-component crew-landing">
            <h2 className="date">{date}</h2>
            <img src="" alt="" id="image-display" className="image"/>
            <h2 className="name">{name}</h2>
            <div className="btn crew-time-in" onClick={e => handleTimeInOutCrew(e)}>Time in/Out</div>

            <div className="date-wrapper">
                <div className="time-in">
                    <h3>Time in</h3>
                    <p>{formatTime(timeIn)}</p>
                </div>
                <div className="time-out">
                    <h3>Time out</h3>
                    <p>{formatTime(timeOut)}</p>
                </div>
            </div>
        </div>

        {showToast && <Toast message={toastData.toastMsg}
                             toastType={toastData.toastType}
                             showToast={setShowToast}
                             toastState={showToast}/>}
    </main>
  )
}

export default CrewLanding