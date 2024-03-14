import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Rank from './pages/Rank';
import Registration from './pages/Registration';

import MeetingRequest from './pages/MeetingRequest';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Home </Link>
          <Link to="/schedule"> Schedule </Link>
          <Link to="/rank"> Rank </Link>
          <Link to="/meetingRequest"> Meeting Request </Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/schedule" element={ <Schedule /> } />
          <Route path="/rank" element={ <Rank /> } />
          <Route path="/meetingRequest" element={ <MeetingRequest /> } />
          <Route path="/register" element={ <Registration /> } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
