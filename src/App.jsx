import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';

import Login from './Pages/Login/Login';
import Projects from './Pages/ProjectsPage/Projects';
import Register from './Pages/Register/Register';

function App() {

  return (
    <div className="App">
      <Header />
        <Projects />
      <Footer />
    </div>
  )
}

export default App
