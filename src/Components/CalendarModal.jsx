import React, { useState } from 'react'

const CalendarModal = ({date, info}) => {
    const [task, setTask] = useState('');
    const [remarks, setRemarks] = useState('');
    const [weatherReport, setWeatherReport] = useState('');
    const [causeOfDelay, setCauseOfDelay] = useState('');
    const [hoursOfDelay, setHoursOfDelay] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const setFunctions = {
        "task": setTask,
        "remarks": setRemarks,
        "weatherReport": setWeatherReport,
        "causeOfDelay": setCauseOfDelay,
        "hoursOfDelay": setHoursOfDelay,
        "isEdit": setIsEdit
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const onValueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFunctions[name](value);
    }

    const toggleEdit = (e) => {
        e.preventDefault();
        setIsEdit(!isEdit);
    }

    const formatYear = (date) => {
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

  return (
    <>
        <h2 className="title">{formatYear(date[0])}</h2>

        <form action="" method="post">
            <div className={`form-input`}>
                <label htmlFor="tast">Task:</label>
                <input type="text" name="task" id="task" value={task} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="remarks">Remarks:</label>
                <input type="text" name="remarks" id="remarks" value={remarks} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="weather-report">Weather Report:</label>
                <input type="text" name="weather-report" id="weather-report" value={weatherReport} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="cause-delay">Cause of Delay:</label>
                <input type="text" name="cause-delay" id="cause-delay" value={causeOfDelay} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="hours-delay">Hours of Delay:</label>
                <input type="number" name="hours-delay" id="hours-delay" value={hoursOfDelay} onChange={onValueChange} disabled={!isEdit}/>
            </div>

            <div className="btn" onClick={(e) => toggleEdit(e)}>
                {isEdit ? <span className="save-btn">Save</span> : <span className="edit-btn">Edit</span>}
            </div>
        </form>
    </>
  )
}

export default CalendarModal