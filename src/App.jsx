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
import CrewLanding from './Pages/CrewLanding/CrewLanding';
import Admin from './Components/Admin/Admin';

function App() {
  const [ user, setUser ] = useState(localStorage.getItem("token") ? localStorage.token : null);
  const [ roleId, setRoleId ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ selectedProject, setSelectedProject ] = useState("");
  const [ selectedEngineer, setSelectedEngineer ] = useState("");

  const initIds = () => {
    const data = parseToken(localStorage.getItem("token"));
    setRoleId(data.roleId);
    setUserId(data.id);
  };

  const handleLogout = () => {
    setUserId("");
    setRoleId("");
    setUserId("");
    setSelectedEngineer("");
    setSelectedProject("");
  }

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
          <Route element={<PageLayout roleId={roleId}
                                      selectedProject={selectedProject.name}
                                      selectedEngineer={selectedEngineer.id}
                                      handleLogout={handleLogout}/>}>
            {roleId === 1 &&
            <>
              <Route index element={<AdminPage />} />
            
              <Route path="admin">
                <Route path=":id" element={<Admin />} />
                <Route path="create-admin" element={<Admin />} />
              </Route>

              <Route path="company">
                <Route index element={<CompanyList />} />
                <Route path=":id" element={<Company />} />
                <Route path="create-company" element={<Company />} />
              </Route>
            </>}
            
            {roleId === 2 &&
              <>
                <Route index element={<EngineerList companyId={userId} setSelectedEngineer={setSelectedEngineer}/>} />    
                <Route path="engineer">
                  <Route path="create-engineer" element={<Engineer companyId={userId} />} />
                  <Route path=":id" element={<Engineer companyId={userId}/>} />
                </Route>

                <Route path="project">
                  <Route index element={<Projects engId={selectedEngineer.id} editable={false}/>} />
                  <Route path=":id" element={<Project editable={false}/>} />
                </Route>

                <Route path="profile" element={<Company companyId={userId}/>} />
              </>
            }

            {roleId === 3 && 
            <>
              <Route index element={<Projects engId={userId} setSelectedProject={setSelectedProject}/>} />
              <Route path="profile" element={<Engineer userId={userId}/>} />
              
              <Route path="project">
                <Route path="create-project" element={<Project engId={userId}/>} />
                <Route path=":id" element={<Project />} />
              </Route>

              {selectedProject &&
              <>
              <Route path="crew">
                <Route index element={<ProjectsCrew/>} />
                <Route path="create-crew" element={<CrewDetails engId={userId}/>} />
                <Route path=":id" element={<CrewDetails />} />
              </Route>

              <Route path="images" element={<ImagesPage projId={selectedProject.id}/>} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="daily-report" element={<CalendarPage />} />
              <Route path="settings" element={<Project profileId={selectedProject.id}/>} />
              </>
              }
            </>
            }


            {roleId === 4 &&
              <>
                <Route path="/" element={<Projects />} />
                <Route path="/profile" element={<CrewDetails roleId={roleId} userId={userId}/>} />
              </>
            }
            <Route path="*" element={<h1>Page not found.</h1>} />

          </Route>
          } 
          <Route path="*" element={<h1>Page not found.</h1>} />
      </Routes>
    </div>
  )
}

export default App
