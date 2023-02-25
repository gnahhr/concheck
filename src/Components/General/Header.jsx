//TO-DO
//Add Different User Restrictions

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Header.css';

//Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons'
import MobileLogo from '../../assets/images/concheck-logo-h.png';


const Header = ({openNav}) => {
  const nav = useNavigate();

  const handleLogout = () => {
      localStorage.clear();
      nav("/");
  }

  return (
    <>
      <header>
        <FontAwesomeIcon icon={faBars}
                        className="icon menu-icon mobile-only"
                        onClick={(e) => openNav(e)}/>
          <img src={MobileLogo} alt="logo" className="header-logo mobile-logo"/>
        <FontAwesomeIcon icon={faGear} className="icon settings-icon mobile-only"/>
      <div className="header-body">
        <span>Hi, usercakes!</span>
        <Link to="/" onClick={e => handleLogout(e)}>Logout</Link>
      </div>
      </header>
    </>
  )
}

export default Header