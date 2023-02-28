import {
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from "react";
import { parseToken } from "./Hooks/parseToken";
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
  const [ roleId, setRoleId ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ engineerId, setEngineerId ] = useState("");
  const [ selectedProject, setSelectedProject ] = useState("");
  
  const initIds = () => {
    const data = parseToken(localStorage.getItem("token"));
    setRoleId(data.roleId);
    setUserId(data.id);

    if(data.roleId === 3) {
      setEngineerId(data.engineerId);
    } 
  };

  //OnMount
  useEffect(() => {
    if (localStorage.getItem("token")) initIds();
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) initIds();
  }, [user, selectedProject]) 

  return (
    <div className="App">
      <Routes>
        {!user ? 
          <Route path="/" element={<Login setUser={setUser}/>} />
        :
          <Route element={<PageLayout roleId={roleId} selectedProject={selectedProject.name}/>}>
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
              <Route index element={<Projects setSelectedProject={setSelectedProject}/>} />
              <Route path="project">
                <Route path=":id" element={<Project />} />
                <Route path="create-project" element={<Project />} />
              </Route>

              <Route path="crew">
                <Route index element={<ProjectsCrew selectedProject={selectedProject.id}/>} />
                <Route path=":id" element={<CrewDetails />} />
                <Route path="create-crew" element={<CrewDetails projId={selectedProject.id}/>} />
              </Route>

              <Route path="images" element={<ImagesPage />} />
              <Route path="dashboard" element={<Dashboard projId={selectedProject.id}/>} />
              <Route path="daily-report" element={<CalendarPage projId={selectedProject.id}/>} />
              <Route path="settings" element={<Project projId={selectedProject.id}/>} />
              <Route path="profile" element={<Engineer userId={userId}/>} />
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
