import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Rank from "./pages/Rank";
import Registration from "./pages/Registration";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import { MySchedule } from "./pages/MySchedule";
import { Unauthorized } from "./pages/Unauthorized";

import { MeetingRequest } from "./pages/MeetingRequest";

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
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/meetingRequest" element={<MeetingRequest />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myschedule" element={<MySchedule />} />
          </Route>
          <Route element={<ProtectedRoute isAdminRoute={true} />}>
            <Route path="/adminpanel" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
