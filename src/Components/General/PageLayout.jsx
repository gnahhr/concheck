import React, { useState } from 'react'

import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PageLayout = ({roleId, selectedProject, selectedEngineer, handleLogout}) => {
  const [ navOpen, setNavOpen ] = useState(false);


  const openNav = (e) => {
    e.preventDefault();
    setNavOpen(true);
  }

  return (
    <> 
      <div className="desktop-left">
        <NavBar setNavOpen={setNavOpen}
                navOpen={navOpen}
                roleId={roleId}
                selectedProject={selectedProject}
                selectedEngineer={selectedEngineer}/>
      </div>
      <div className="desktop-right">
        <Header openNav={openNav} 
                handleLogout={handleLogout}/>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default PageLayout