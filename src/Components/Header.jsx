//TO-DO
//Add Different User Restrictions

import React from 'react';

import './Header.css';

//Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/images/concheck-logo-h.png';

const Header = () => {
  return (
    <header>
      <FontAwesomeIcon icon={faBars} className="icon menu-icon"/>
      <img src={Logo} alt="logo" className="header-logo"/>
      <FontAwesomeIcon icon={faGear} className="icon settings-icon"/>
    </header>
  )
}

export default Header