import React, { useState } from 'react'
import Calendar from 'react-calendar';
import CalendarModal from '../../Components/Calendar/CalendarModal';

import './CalendarPage.css';

const CalendarPage = () => {
  const [ selectedDate, setSelectedDate ] = useState();
  const [ hasSelected, setHasSelected ] = useState(false);

  const clickDay = (day) => {
    setSelectedDate([day]);
    setHasSelected(true);
  };

  return (
    <main className="main-component">
      <h1 className="text-center">Daily Report</h1>
      {hasSelected ?
        <CalendarModal date={selectedDate} info={""} />
        : 
        <Calendar
          onClickDay={(value) => clickDay(value)}
        />
      }
    </main>
  )
}

export default CalendarPage