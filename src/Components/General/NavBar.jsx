import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUserAlt, faDashboard, faImages, faBookAtlas, faGear, faClose, faProjectDiagram, faUser} from '@fortawesome/free-solid-svg-icons'

import './NavBar.css';

const NavBar = ({setNavOpen, navOpen}) => {

  const closeNav = e => {
    const x = document.getElementsByClassName("close")[0];
    const check = window.getComputedStyle(x).display === "none";
    
    if (!check) {
        setNavOpen(false);
    }
  }

  const navigation = [
    {
        link: "/",
        icon: faHouseChimney,
        text: "Home"
    },
    {
        link: "/profile",
        icon: faUser,
        text: "Profile"
    },
    {
        link: "/dashboard",
        icon: faDashboard,
        text: "Dashboard"
    },
    {
        link: "/crew",
        icon: faUserAlt,
        text: "Crew"
    },
    {
        link: "/images",
        icon: faImages,
        text: "Image"
    },
    {
        link: "/daily-report",
        icon: faBookAtlas,
        text: "Daily Report"
    },
    {
        link: "/settings",
        icon: faGear,
        text: "Settings"
    },
  ]

  return (
    <nav className={`${navOpen ? "mobile-open" : ""}`}>
        <div className="mobile-exit">
            <FontAwesomeIcon icon={faClose}
                            className="close"
                            onClick={e => closeNav(e)}
                            />
        </div>
        <ul>
            {navigation.map((navItem) =>
            <li key={navItem.text}>
                <NavLink to={navItem.link}
                      onClick={e => closeNav(e)}
                      className={({ isActive }) => {
                        return isActive? "active" : "";
                      }}>
                    <span><FontAwesomeIcon icon={navItem.icon}/></span>
                    {navItem.text}
                </NavLink>
            </li>
            )}
        </ul>
    </nav>
  )
}

export default NavBar