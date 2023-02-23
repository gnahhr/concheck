import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Styles
import './Footer.css';

//Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useMatch } from 'react-router-dom';


const middleButton = [
  {
    id: 'projects',
    url: "/projects",
    icon: faPlus,
    text: "Start New Project",
  },
  {
    id: 'dashboard',
    url: "/dashboard",
    icon: faPlus,
    text: "Dashboard",
  },
  {
    id: 'calendar',
    url: "/calendar",
    icon: faPlus,
    text: "Daily Report",
    toUrl: 'calendar'
  }
]


const Footer = () => {
  const midButton = middleButton.filter((button) => Boolean(useMatch(button.url)) === true);

  return (
    <footer>
      <Link to={`/`}>
        <button className="footer-btn">
          <FontAwesomeIcon icon={faHome} className="icon home-icon"/>
          <p>Home</p>
        </button>
      </Link >
      {midButton.length !== 0 &&
        <button className="footer-btn">
          <FontAwesomeIcon icon={midButton[0].icon} className="icon plus-icon"/>
          <p>{midButton[0].text}</p>
        </button>
      }
      <Link to={`/profile`}>
        <button className="footer-btn">
          <FontAwesomeIcon icon={faUserAlt} className="icon user-icon"/>
          <p>Profile</p>
        </button>
      </Link>
    </footer>
  )
}

export default Footer