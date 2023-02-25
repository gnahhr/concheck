import {
  Routes,
  Route
} from "react-router-dom";
import { useState } from "react";
import './App.css';
import PageLayout from "./Components/General/PageLayout";

import AdminPage from './Pages/AdminPage/AdminPage';
import Login from './Pages/Login/Login';
import Projects from './Pages/ProjectsPage/Projects';
import CrewDetails from './Pages/CrewDetails/CrewDetails';
import Company from "./Components/Company/Company";
import CompanyList from './Pages/CompanyList/CompanyList';
import Engineer from "./Components/Engineer/Engineer";
import EngineerList from "./Pages/EngineerList/EngineerList";
import Project from './Components/Projects/Project';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProjectsCrew from './Pages/Crew/ProjectsCrew';
import CalendarPage from './Pages/CalendarPage/CalendarPage';
import ImagesPage from './Pages/ImagesPage/ImagesPage';
import Profile from './Pages/Profile/Profile';


function App() {
  const [ user, setUser ] = useState(localStorage.getItem("token") ? localStorage.token : null);
  const [ roleId, setRoleId ] = useState(localStorage.roleId ? Number(localStorage.getItem("roleId")) : null);
  const [ userId, setUserId ] = useState(localStorage._id ? Number(localStorage.getItem("_id"))  : null);
  const [ selectedProjectId, setSelectedProjectId ] = useState("");
  
  return (
    <div className="App">
      <Routes>
        {!user ? 
          <Route path="/" element={<Login setUser={setUser} setRoleId={setRoleId} setUserId={setUserId}/>} />
        :
          <Route element={<PageLayout roleId={roleId}/>}>
            
            {roleId === 1 &&
            <>
              <Route index element={<AdminPage />} />
            
              <Route path="admin">
                <Route path=":id" element={<Company />} />
                <Route path="create-admin" element={<Company />} />
              </Route>

              <Route path="company">
                <Route index element={<CompanyList />} />
                <Route path=":id" element={<Company />} />
                <Route path="create-company" element={<Company />} />
              </Route>
            </>}
            
            {roleId === 2 &&
              <>
                <Route index element={<Projects />} />
                <Route path="engineer">
                  <Route index element={<EngineerList />} />
                  <Route path=":id" element={<Engineer />} />
                  <Route path="create-engineer" element={<Engineer />} />
                </Route>
              </>
            }

            {roleId === 3 && 
            <>
              <Route index element={<Projects />} setSelectedProjectId={setSelectedProjectId}/>
              <Route path="projects">
                <Route path=":id" element={<Project />} />
                <Route path="create-project" element={<Project />} />
              </Route>

              <Route path="crew">
                <Route index element={<ProjectsCrew selectedProject={selectedProjectId}/>} />
                <Route path=":id" element={<CrewDetails />} />
                <Route path="create-crew" element={<CrewDetails />} />
              </Route>

              <Route path="images" element={<ImagesPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="daily-report" element={<CalendarPage />} />
              <Route path="settings" element={<Project />} />
              <Route path="profile" element={<Profile />} />
            </>}


            {roleId === 4 &&
              <>
                <Route path="/" element={<Projects />} />
                <Route path="/profile" element={<CrewDetails roleId={roleId} userId={userId}/>} />
              </>
            }

            <Route path="*" element={<h1>Page not found.</h1>} />
          </Route>
          } 
      </Routes>
    </div>
  )
}

export default App
