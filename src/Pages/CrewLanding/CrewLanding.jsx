import { useState, useEffect } from 'react';

import './CrewLanding.css';

const CrewLanding = () => {
  return (
    <main>
        <div className="main-component crew-landing">
            <h2 className="date">March 02, 2023</h2>
            <div className="image">
                IMAGE
            </div>
            <h2 className="name">Son Chaeyoung</h2>
            <div className="btn crew-time-in">Time in</div>

            <div className="date-wrapper">
                <div className="time-in">
                    <h3>Time in</h3>
                    <p>N/A</p>
                </div>
                <div className="time-out">
                    <h3>Time out</h3>
                    <p>N/A</p>
                </div>
            </div>
        </div>
    </main>
  )
}

export default CrewLanding