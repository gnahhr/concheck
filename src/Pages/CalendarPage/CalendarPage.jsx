import { useState, useEffect } from 'react'
import { getAllDailyReport } from '../../Hooks/dailyReport';

import Toast from '../../Components/General/Toast';
import DailyReport from '../../Components/DailyReport/DailyReport';
import Calendar from 'react-calendar';
import CalendarModal from '../../Components/Calendar/CalendarModal';

import './CalendarPage.css';

const CalendarPage = () => {
  const [ selectedDate, setSelectedDate ] = useState();
  const [ hasSelected, setHasSelected ] = useState(false);
  const [ showReportModal, setShowReportModal ] = useState(false);
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
              onClickDay={(value) => clickDay(value)}
              />
            <div className="btn" onClick={e => toggleReportModal(e)}>
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