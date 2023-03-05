import { useState } from 'react';
import { addDailyReport } from '../../Hooks/dailyReport';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const DailyReport = ({projId, closeModal, showToast, setToastData}) => {
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
      
      if (!remarks || !weatherReport || !causeOfDelay || hoursOfDelay) {
        setToastData({
          toastMsg: "Please input all fields.",
          toastType: "warning"
        })
        showToast(true)
        return;
      }

      const data = {
          "remarks": remarks,
          "weatherReport": weatherReport,
          "causeOfDelay": causeOfDelay,
          "hoursDelay": hoursOfDelay,
      }
      
      const response = await addDailyReport(projId, data);
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
      closeModal(!true);
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
        <FontAwesomeIcon icon={faClose} className="icon icon-trim exit" onClick={e => handleToggleModal(e)}/>
        <div className="modal-header">
            <h2>
                <span>Add Daily Report</span>
            </h2>
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