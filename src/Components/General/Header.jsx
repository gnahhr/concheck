//TO-DO
//Add Different User Restrictions

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Header.css';

//Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons'
import MobileLogo from '../../assets/images/concheck-logo-h.png';


const Header = ({openNav, handleLogout}) => {
  const nav = useNavigate();

  const logout = () => {
      localStorage.clear();
      sessionStorage.clear();
      handleLogout();
      setTimeout(() => {nav("/")}, 1000);
  }

  return (
    <>
      <header>
        <FontAwesomeIcon icon={faBars}
                        className="icon menu-icon mobile-only"
                        onClick={(e) => openNav(e)}/>
          <img src={MobileLogo} alt="logo" className="header-logo mobile-logo"/>
        <FontAwesomeIcon icon={faSignOut} className="icon settings-icon mobile-only"/>
      <div className="header-body">
        <Link to="/" onClick={e => logout(e)}>Logout</Link>
      </div>
      </header>
    </>
  )
}

export default Header