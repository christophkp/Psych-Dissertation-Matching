import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Rank from "./pages/Rank";
import Registration from "./pages/Registration";
import {UserSettings} from "./pages/UserSettings";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";


import {MeetingRequest} from "./pages/MeetingRequest";

import { NavbarComponent } from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./ProtectedRoutes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <ToastContainer toastStyle={{ marginTop: "50px" }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpanel" element={<Admin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/meetingRequest" element={<MeetingRequest />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;