//TO-DO
//Add Different User Restrictions

import React, { useState } from 'react';
import NavBar from './NavBar';

import './Header.css';

//Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/images/concheck-logo-h.png';


const Header = ({}) => {
  const [ navOpen, setNavOpen ] = useState(false);

  const openNav = (e) => {
    e.preventDefault();
    setNavOpen(true);
  }

  return (
    <>
      <header>
        <FontAwesomeIcon icon={faBars}
                         className="icon menu-icon"
                         onClick={(e) => openNav(e)}/>
          <img src={Logo} alt="logo" className="header-logo"/>
        <FontAwesomeIcon icon={faGear} className="icon settings-icon"/>
      </header>
      {navOpen && <NavBar setNavOpen={setNavOpen}/>}
    </>
  )
}

export default Header