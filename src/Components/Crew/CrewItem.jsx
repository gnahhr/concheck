// TODO: Clarify Time in Time Out kineme

import React from 'react'

import './CrewItem.css';

const CrewItem = () => {
  return (
    <div className="crew-item">
        <div className="left-item">
            <div className="image">
                IMAGE
            </div>
        </div>
        <div className="middle-item">
            <h3 className="crew-name">Name</h3>
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
            <a href="#">Edit</a>
            <a href="#">Delete</a>
        </div>
    </div>
  )
}

export default CrewItem