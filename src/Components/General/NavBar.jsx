import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUserAlt, faDashboard, faImages, faBookAtlas, faGear, faClose, faProjectDiagram, faUser} from '@fortawesome/free-solid-svg-icons'

import './NavBar.css';

const NavBar = ({setNavOpen, navOpen, roleId}) => {
    
  console.log(typeof roleId);

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
        text: "Home",
        access: [1,2,3,4],
    },
    {
        link: "/profile",
        icon: faUser,
        text: "Profile",
        access: [1,2,3,4],
    },
    {
        link: "/dashboard",
        icon: faDashboard,
        text: "Dashboard",
        access: [3],
    },
    {
        link: "/crew",
        icon: faUserAlt,
        text: "Crew",
        access: [3],
    },
    {
        link: "/images",
        icon: faImages,
        text: "Image",
        access: [3],
    },
    {
        link: "/daily-report",
        icon: faBookAtlas,
        text: "Daily Report",
        access: [3],
    },
    {
        link: "/settings",
        icon: faGear,
        text: "Settings",
        access: [3],
    },
  ]

  console.log(navigation.filter((navItem) => 
  navItem.access.includes(roleId)));

  return (
    <nav className={`${navOpen ? "mobile-open" : ""}`}>
        <div className="mobile-exit">
            <FontAwesomeIcon icon={faClose}
                            className="close"
                            onClick={e => closeNav(e)}
                            />
        </div>
        <ul>
            {navigation.filter((navItem) => 
            navItem.access.includes(roleId))
            .map((navItem) =>
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