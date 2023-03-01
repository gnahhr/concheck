// TODO: Clarify Time in Time Out kineme

import { useState, useEffect } from 'react';
import { getCrewDTR, crewTimeIn, crewTimeOut } from '../../Hooks/crew';
import { Link } from 'react-router-dom';

import './CrewItem.css';

const CrewItem = ({crew}) => {
  const [ timeIn, setTimeIn ] = useState("N/A");
  const [ timeOut, setTimeOut ] = useState("N/A");
  const {imageUrl, firstName, lastName} = crew;
  const objId = crew._id;

  const handleGetTimeCrew = async () => {
    const response = await getCrewDTR(objId);
    const data = response.response.data;

    if(response.statusCode !== 400){
        setTimeIn(data.timein);
        setTimeOut(() => (typeof data.timeout === "string") ? data.timeout : "N/A");
    }
    // console.log(response.response.messsage); modal message
  }

  const handleTimeInOutCrew = async (e) => {
    e.preventDefault();
    let response;

    if (timeIn === "N/A") {
        response = await crewTimeIn(objId);
    } else if (timeOut === "N/A") {
        response = await crewTimeOut(objId);
    }

    if (response) console.log(response.response);

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
                <Link to={`/crew/${objId}`} className="btn">Edit</Link>
                <div className="btn red-btn">Delete</div>
            </div>
        </td>
    </>
  )
}

export default CrewItem