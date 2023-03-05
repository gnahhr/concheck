import { useState, useEffect } from 'react';

import Toast from '../../Components/General/Toast';
import DailyReport from '../../Components/DailyReport/DailyReport';
import Calendar from 'react-calendar';
import CalendarModal from '../../Components/Calendar/CalendarModal';

import { getProjectById } from '../../Hooks/project';

import './CalendarPage.css';

const CalendarPage = () => {
  const [ selectedDate, setSelectedDate ] = useState();
  const [ hasSelected, setHasSelected ] = useState(false);
  const [ showReportModal, setShowReportModal ] = useState(false);
  const [ startDate, setStartDate ] = useState("");
  const [ endDate, setEndDate ] = useState("");
  const projId = sessionStorage.getItem("selProjId");

  // Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState(); 

  const clickDay = (day) => {
    setSelectedDate([day]);
    setHasSelected(true);
  };

  const toggleReportModal = (e) => {
    e.preventDefault;
    setShowReportModal(!showReportModal);
  }

  
  const handleSetDates = async (e) => {
    const response = await getProjectById(projId);
    const data = response.data;
    
    setStartDate(new Date(data.startDate))
    setEndDate(new Date(data.endDate))
  }

  useEffect(() => {
    handleSetDates();
  }, [])

  return (
    <>
    <main>
      <h1 className="text-center">Daily Report</h1>
      <div className="main-component">
        {hasSelected ?
          <CalendarModal date={selectedDate}
                         projId={projId}
                         hasSelected={setHasSelected}
                         showToast={setShowToast}
                         setToastData={setToastData}
                         />
          : 
          <>
            <Calendar
              minDate={startDate}
              maxDate={endDate}
              onClickDay={(value) => clickDay(value)}
              />
            <div className="btn daily-report-btn" onClick={e => toggleReportModal(e)}>
              <span>Add Daily Report</span>
            </div>
          </>
        }
        
      </div>
    </main>
    {showReportModal && <DailyReport projId={projId}
                                     closeModal={setShowReportModal}
                                     showToast={setShowToast}
                                     setToastData={setToastData}
                                     />}
    {showToast && <Toast message={toastData.toastMsg}
                        toastType={toastData.toastType}
                        showToast={setShowToast}
                        toastState={showToast}/>}
    </>
  )
}

export default CalendarPage