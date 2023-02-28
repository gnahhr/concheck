import { useState, useEffect } from 'react';
import { addDailyReport } from '../../Hooks/dailyReport';

const DailyReport = ({projId, closeModal}) => {
    const [ remarks, setRemarks ] = useState("");
    const [ weatherReport, setWeatherReport ] = useState("");
    const [ causeOfDelay, setCauseOfDelay ] = useState("");
    const [ hoursOfDelay, setHoursOfDelay ] = useState(0);

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
        
        const response = await addDailyReport(projId, data);

        console.log(response)
        }

        const onChangeValue = (e) => {
        setFunctions[e.target.name](e.target.value);
    }

    const handleToggleModal = (e) => {
        e.preventDefault();

        closeModal(!true);
    }
        
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
            <h2>
                <span>Add Daily Report</span>
            </h2>
            <div className="exit" onClick={e => handleToggleModal(e)}>
                X
            </div>
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
      </div>
    </div>
  )
}

export default DailyReport