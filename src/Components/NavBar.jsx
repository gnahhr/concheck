import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faUserAlt, faImages, faBookAtlas, faGear, faClose, faProjectDiagram} from '@fortawesome/free-solid-svg-icons'

import './NavBar.css';

const NavBar = ({setNavOpen}) => {

  const closeNav = e => {
    setNavOpen(false);
  }

  const navigation = [
    {
        link: "/",
        icon: faHouseChimney,
        text: "Home"
    },
    {
        link: "/projects",
        icon: faProjectDiagram,
        text: "Projects"
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
    <nav>
        <div className="mobile-exit">
            <FontAwesomeIcon icon={faClose}
                             className="close"
                             onClick={e => closeNav(e)}
                             />
        </div>
        <ul>
            {navigation.map((navItem) =>
            <li>
                 <Link to={navItem.link} onClick={e => closeNav(e)}>
                    <span><FontAwesomeIcon icon={navItem.icon}/></span>
                    {navItem.text}
                </Link>
            </li>
            )}
        </ul>
    </nav>
  )
}

export default NavBar