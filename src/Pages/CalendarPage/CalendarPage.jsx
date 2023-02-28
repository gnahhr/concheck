import { useState, useEffect } from 'react'
import { getAllDailyReport } from '../../Hooks/dailyReport';
import Task from '../../Components/Task/task';
import DailyReport from '../../Components/DailyReport/DailyReport';
import Calendar from 'react-calendar';
import CalendarModal from '../../Components/Calendar/CalendarModal';

import './CalendarPage.css';

const CalendarPage = ({projId}) => {
  const [ selectedDate, setSelectedDate ] = useState();
  const [ hasSelected, setHasSelected ] = useState(false);
  const [ dailyReport, setDailyReport ] = useState([]);
  const [ showTaskModal, setShowTaskModal ] = useState(false);
  const [ showReportModal, setShowReportModal ] = useState(false);

  const clickDay = (day) => {
    setSelectedDate([day]);
    setHasSelected(true);
  };

  const getDailyReport = async () => {
    const response = await getAllDailyReport(projId);
    const data = response.response.message;

    setDailyReport(data);
  }

  const formatDate = (date) => {

  };

  const toggleTaskModal = (e) => {
    e.preventDefault;
    setShowTaskModal(!showTaskModal);
  }

  const toggleReportModal = (e) => {
    e.preventDefault;
    setShowReportModal(!showReportModal);
  }

  useEffect(() => {
    getDailyReport();
  }, [])

  return (
    <>
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

        <div className="btn" onClick={e => toggleTaskModal(e)}>
          <span>Add Task</span>
        </div>
        <div className="btn" onClick={e => toggleReportModal(e)}>
          <span>Add Daily Report</span>
        </div>
      </div>
    </main>
    {showTaskModal && <Task projId={projId} closeModal={setShowTaskModal}/>}
    {showReportModal && <DailyReport projId={projId} closeModal={setShowReportModal}/>}
    </>
  )
}

export default CalendarPage