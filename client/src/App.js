import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Rank from "./pages/Rank";
import Registration from "./pages/Registration";
import {UserSettings} from "./pages/UserSettings";
import {Login} from "./pages/Login";

import {MeetingRequest} from "./pages/MeetingRequest";

import { NavbarComponent } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/meetingRequest" element={<MeetingRequest />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;