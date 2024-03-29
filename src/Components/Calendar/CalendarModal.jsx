import { useState, useEffect } from 'react';
import { getDailyReportByDate, editDailyReport } from '../../Hooks/dailyReport';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const CalendarModal = ({date, hasSelected, projId, showToast, setToastData}) => {

    const [remarks, setRemarks] = useState('');
    const [weatherReport, setWeatherReport] = useState('');
    const [causeOfDelay, setCauseOfDelay] = useState('');
    const [hoursOfDelay, setHoursOfDelay] = useState('');
    const [dailyReportId, setDailyReportId] = useState(null);

    const setFunctions = {
        "remarks": setRemarks,
        "weather-report": setWeatherReport,
        "cause-delay": setCauseOfDelay,
        "hours-delay": setHoursOfDelay,
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const onValueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFunctions[name](value);
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        
        if (!remarks || !weatherReport || !causeOfDelay || !hoursOfDelay) {
            setToastData({
              toastMsg: "Please input all fields.",
              toastType: "warning"
            })
            showToast(true)
        }

        const data = {
            remarks: remarks,
            weatherReport: weatherReport,
            causeOfDelay: causeOfDelay,
            hoursDelay: hoursOfDelay,
        }

        const response = await editDailyReport(dailyReportId, data);

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
    }

    const formatYear = (date) => {
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    const formatDate = (date) => {
        let month = date.getMonth()+1;
        let day = date.getDate();

        if (date.getMonth()+1 < 10) month = `0${date.getMonth()+1}`
        if (date.getDate() < 10) day = `0${date.getDate()}`

        return `${month}-${day}-${date.getFullYear()}`
    }

    const handleExit = (e) => {
        e.preventDefault();
        hasSelected(false);
    }

    const handleGetDailyReport = async () => {
        const response = await getDailyReportByDate(projId, formatDate(new Date(date)));
        const data = response.response.data;
        
        if (data){
            setRemarks(data.remarks);
            setWeatherReport(data.weatherReport);
            setCauseOfDelay(data.causeOfDelay);
            setHoursOfDelay(data.hoursDelay);
            setDailyReportId(data.dailyReportId);
        }
    }

    useEffect(() => {
        handleGetDailyReport();
    }, [])

  return (
    <>
        <h2 className="title">{formatYear(date[0])}</h2>
        <form action="" method="post">
            <div className={`form-input`}>
                <label htmlFor="remarks">Remarks:</label>
                <input type="text" name="remarks" id="remarks" value={remarks} onChange={onValueChange} disabled={!dailyReportId}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="weather-report">Weather Report:</label>
                <input type="text" name="weather-report" id="weather-report" value={weatherReport} onChange={onValueChange} disabled={!dailyReportId}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="cause-delay">Cause of Delay:</label>
                <input type="text" name="cause-delay" id="cause-delay" value={causeOfDelay} onChange={onValueChange} disabled={!dailyReportId}/>
            </div>
            <div className={`form-input`}>
                <label htmlFor="hours-delay">Hours of Delay:</label>
                <input type="number" name="hours-delay" id="hours-delay" value={hoursOfDelay} onChange={onValueChange} disabled={!dailyReportId}/>
            </div>


            <div className="btn-group">
                {dailyReportId &&
                    <div className="btn" onClick={(e) => handleEdit(e)}>
                        <span className="edit-btn">Edit</span>
                    </div>
                }
                <div className="btn red-btn" onClick={e => handleExit(e)}>Go Back</div>
            </div>
        </form>
    </>
  )
}

export default CalendarModal