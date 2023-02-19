import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

import './App.css';
import Header from './Components/Header';

import PageLayout from "./Components/PageLayout";

import Login from './Pages/Login/Login';
import Projects from './Pages/ProjectsPage/Projects';
import Register from './Pages/Register/Register';
import CrewDetails from './Pages/CrewDetails/CrewDetails';
import Dashboard from './Pages/Dashboard/Dashboard';
import CalendarPage from './Pages/CalendarPage/CalendarPage';
import ImagesPage from './Pages/ImagesPage/ImagesPage';
import Profile from './Pages/Profile/Profile';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<PageLayout />}>
      <Route path="/" default element={<Dashboard />} />
      <Route path="projects" element={<Projects />} />
      <Route path="crew" element={<CrewDetails />} />
      <Route path="images" element={<ImagesPage />} />
      <Route path="daily-report" element={<CalendarPage />} />
      <Route path="profile" element={<Profile />} />
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
