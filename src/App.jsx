import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

import './App.css';
import PageLayout from "./Components/General/PageLayout";

import Login from './Pages/Login/Login';
import Projects from './Pages/ProjectsPage/Projects';
import CrewDetails from './Pages/CrewDetails/CrewDetails';
import Company from "./Components/Company/Company";
import Engineer from "./Components/Engineer/Engineer";
import Project from './Components/Projects/Project';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProjectsCrew from './Pages/Crew/ProjectsCrew';
import CalendarPage from './Pages/CalendarPage/CalendarPage';
import ImagesPage from './Pages/ImagesPage/ImagesPage';
import Profile from './Pages/Profile/Profile';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />



    {/* HIDE THIS SOMETHING FOR OTHER USERS */}

    <Route element={<PageLayout />}>
      <Route path="/" default element={<Projects />} />
      <Route path="dashboard" default element={<Dashboard />} />

      {/* HIDE THIS SOMETHING FOR OTHER USERS */}
      <Route path="company">
        {/* Company List */}
        <Route path=":id" element={<Company />} />
        <Route path="create-company" element={<Company />} />
      </Route>

      <Route path="engineer">
        {/* Engineer List */}
        <Route path=":id" element={<Engineer />} />
        <Route path="create-engineer" element={<Engineer />} />
      </Route>

      <Route path="projects">
        <Route path=":id" element={<Project />} />
        <Route path="create-project" element={<Project />} />
      </Route>

      <Route path="crew">
        <Route index element={<ProjectsCrew />} />
        <Route path=":id" element={<CrewDetails />} />
        <Route path="create-crew" element={<CrewDetails />} />
      </Route>

      <Route path="images" element={<ImagesPage />} />

      <Route path="daily-report" element={<CalendarPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Project />} />
      <Route path="*" element={<h1>Page not found.</h1>} />
    </Route>
  </>
));

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
