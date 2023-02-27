import React, { useState } from 'react'
import { addDailyReport } from '../../Hooks/dailyReport';
import Calendar from 'react-calendar';
import CalendarModal from '../../Components/Calendar/CalendarModal';

import './CalendarPage.css';

const CalendarPage = () => {
  const [ selectedDate, setSelectedDate ] = useState();
  const [ hasSelected, setHasSelected ] = useState(false);

  // Daily Report
  const [ remarks, setRemarks ] = useState("");
  const [ weatherReport, setWeatherReport ] = useState("");
  const [ causeOfDelay, setCauseOfDelay ] = useState("");
  const [ hoursOfDelay, setHoursOfDelay ] = useState(0);


  const clickDay = (day) => {
    setSelectedDate([day]);
    setHasSelected(true);
  };

  const setFunctions = {
    "remarks": setRemarks,
    "weather-report": setWeatherReport,
    "cause-delay": setCauseOfDelay,
    "hours-delay": setHoursOfDelay,
  }

  const handleAddDailyReport = async (e) => {
    e.preventDefault();

    const data = {
      "remarks": remarks,
      "weatherReport": weatherReport,
      "causeOfDelay": causeOfDelay,
      "hoursDelay": hoursOfDelay,
    }
    
    const response = await addDailyReport("63fcab189e38da13250607ac", data);

    console.log(response)
  }

  const onChangeValue = (e) => {
    setFunctions[e.target.name](e.target.value);
  }

  return (
    <main>
      <h1 className="text-center">Daily Report</h1>
      <div className="main-component">
        {hasSelected ?
          <CalendarModal date={selectedDate} info={""} />
          : 
          <Calendar
            onClickDay={(value) => clickDay(value)}
          />
        }
      </div>

      <form method="post">
        <div className="form-input">  
          <label htmlFor="remarks">Remarks:</label>
          <input type="text" name="remarks" id="remarks" value={remarks} onChange={e => onChangeValue(e)} required/>
        </div>
        <div className="form-input">
          <label htmlFor="weather-report">Weather Report:</label>
          <input type="text" name="weather-report" id="weather-report" value={weatherReport} onChange={e => onChangeValue(e)} required/>
        </div>
        <div className="form-input">
          <label htmlFor="cause-delay">Cause of Delay:</label>
          <input type="text" name="cause-delay" id="cause-delay" value={causeOfDelay} onChange={e => onChangeValue(e)} required/>
        </div>
        <div className="form-input">
          <label htmlFor="hours-delay">Hours of Delay:</label>
          <input type="number" name="hours-delay" id="hours-delay" value={hoursOfDelay} onChange={e => onChangeValue(e)} required/>
        </div>
        <div className="btn" onClick={e => handleAddDailyReport(e)}>
          <span>Add Daily Report</span>
        </div>
      </form>
      
    </main>
  )
}

export default CalendarPage