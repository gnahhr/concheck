import React from 'react';

//Styles
import './Footer.css';
//Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons'


const middleButton = [
    {
        state: "projects",
        icon: faPlus,
        text: "Start New Project"
    }
]


const Footer = ({showMiddle, middleState}) => {

  return (
    <footer>
      <button className="footer-btn">
        <FontAwesomeIcon icon={faHome} className="icon home-icon"/>
        <p>Home</p>
      </button>
      <button className="footer-btn">
        <FontAwesomeIcon icon={faPlus} className="icon plus-icon"/>
        <p>Start New Project</p>
      </button>
      <button className="footer-btn">
        <FontAwesomeIcon icon={faUserAlt} className="icon user-icon"/>
        <p>Profile</p>
      </button>
    </footer>
  )
}

export default Footer