import React, { useState } from 'react'
import Calendar from 'react-calendar';
import CalendarModal from '../../Components/CalendarModal';

import './CalendarPage.css';

const CalendarPage = () => {
  const [ selectedDate, setSelectedDate ] = useState();
  const [ hasSelected, setHasSelected ] = useState(false);

  const clickDay = (day) => {
    setSelectedDate([day]);
    setHasSelected(true);
  };

  return (
    <div className="main-component">
      {hasSelected ?
        <CalendarModal date={selectedDate} info={""} />
        : 
        <Calendar
          onClickDay={(value) => clickDay(value)}
        />
      }
    </div>
  )
}

export default CalendarPage