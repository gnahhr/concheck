import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUserAlt, faDashboard, faImages, faBookAtlas, faGear, faClose, faProjectDiagram, faUser} from '@fortawesome/free-solid-svg-icons'

import './NavBar.css';

const NavBar = ({setNavOpen, navOpen, roleId, selectedProject}) => {

  const closeNav = e => {
    const x = document.getElementsByClassName("close")[0];
    const check = window.getComputedStyle(x).display === "none";
    
    if (!check) {
        setNavOpen(false);
    }
  }

  if (!selectedProject) {
    if (roleId === 3){
      roleId = 0;
    }
  }

  const navigation = [
    {
        link: "/",
        icon: faHouseChimney,
        text: "Home",
        access: [0,1,2,3,4],
    },
    {
      link: "/company",
      icon: faHouseChimney,
      text: "Company",
      access: [1],
    },
    {
        link: "/profile",
        icon: faUser,
        text: "Profile",
        access: [2,3,4],
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

  return (
    <nav className={`${navOpen ? "mobile-open" : ""}`}>
        <div className="mobile-exit">
            <FontAwesomeIcon icon={faClose}
                            className="close"
                            onClick={e => closeNav(e)}
                            />
        </div>
        {roleId === 3 &&
        <div className="active-project">
            <h3>You're currently working on:</h3>
            <h2>{selectedProject}</h2>
            <p>Click here to change project</p>
        </div>
        }
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