// TODO: Clarify Time in Time Out kineme

import React from 'react'
import { Link } from 'react-router-dom';

import './CrewItem.css';

const CrewItem = ({crew}) => {
  const {imageUrl, firstName, lastName} = crew;
  const objId = crew._id;

  return (
    <>
        <td>
            <img src={imageUrl} alt={`${firstName} ${lastName}`} className="image" />
        </td>
        <td><h3 className="crew-name">{`${firstName} ${lastName}`}</h3></td>
        <td><p>Time in</p></td>
        <td><p>Time out</p></td>
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

{/* <div className="crew-item">
        <div className="left-item">
            <img src={imageUrl} alt={`${firstName} ${lastName}`} className="image" />
        </div>
        <div className="middle-item">
            <h3 className="crew-name">{`${firstName} ${lastName}`}</h3>
            <div className="crew-details">
                <div className="form-input form-inverse">
                    <label htmlFor="time-in">Time in</label>
                    <input type="text" name="time-in" id="time-in" />
                </div>
                <div className="form-input form-inverse">
                    <label htmlFor="time-out">Time out</label>
                    <input type="text" name="time-out" id="time-out" />
                </div>
                <div className="form-input form-borderless">
                    <label htmlFor="remarks">Remarks</label>
                    <input type="text" name="remarks" id="remarks"/>
                </div>
            </div>
        </div>
        <div className="right-item">
            <Link to={`/crew/${objId}`}>Edit</Link>
            <a href="#">Delete</a>
        </div>
    </div> */}