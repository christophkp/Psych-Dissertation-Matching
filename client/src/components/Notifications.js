import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notifications() {
  const [meetings, setMeetings] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:3001/meetings/byRole", { withCredentials: true })
      .then((response) => {
        setMeetings(response.data);
      }).catch((err) => {
        console.log("ERROR");
      });
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleAccept = async (meetingId) => {
    try {
        await axios.put(`http://localhost:3001/meetings/accept`, { meetingId }, { withCredentials: true });
        toast.success("Meeting successfully accepted!");

    } catch (error) {
        toast.error("Internal Server Error");
    }
  };
  const handleDecline = async (meetingId) => {
    try {
        await axios.put(`http://localhost:3001/meetings/decline`, { meetingId }, { withCredentials: true });
        toast.success("Meeting successfully declined!");

    } catch (error) {
        toast.error("Internal Server Error");
    }
  };

  return (
    <div className='container mt-2' style={{ position: 'relative', zIndex: 9999 }}>
      <i className="bi bi-bell-fill text-white" onClick={toggleNotifications} style={{ cursor: 'pointer' }}></i>
      {showNotifications && (
        <div className="notifications-dropdown border rounded" style={{ position: 'absolute', top: '50px', right: '0', left: 'auto', backgroundColor: '#013220', minWidth: '325px', minHeight: '300px', maxHeight: '350px', overflowY: 'auto' }}>
          <div className="notifications-box text-white p-3">
            <h5 className=''><i className="bi bi-bell-fill text-white">{"  "}</i>Notifications</h5>
            {meetings.map((meeting, index) => {
                const formattedStartDate = new Date(meeting.startDate).toLocaleDateString();
                const formattedStartTime = new Date(meeting.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const formattedEndTime = new Date(meeting.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                if (user.role === 'student' && (meeting.status === 'Accepted' || meeting.status === 'Declined')) {
                    return (
                      <div className="border p-2 mb-2 rounded text-center" key={index} style={{ backgroundColor: '#025b36' }}>
                        <p className='mb-0' style={{ fontWeight: 'bold' }}>{formattedStartDate} {formattedStartTime} - {formattedEndTime}</p>
                        <p>Meeting with {meeting.student} {meeting.status}</p>
                      </div>
                    );
                } else if (user.role === 'faculty' && meeting.status === 'Pending') {
                    return (
                      <div className="border p-2 mb-2 rounded text-center" key={index} style={{ backgroundColor: '#025b36' }}>
                        <p className='mb-0' style={{ fontWeight: 'bold' }}>{formattedStartDate} {formattedStartTime} - {formattedEndTime}</p>
                        <p className='mb-0'>Meeting Request from {meeting.student}</p>
                        <i className="bi bi-check fs-3" style={{ cursor: 'pointer' }} onClick={() => handleAccept(meeting.id)}></i>
                        <i className="bi bi-x fs-3" style={{ cursor: 'pointer' }} onClick={() => handleDecline(meeting.id)}></i>
                      </div>
                    );
                  }
            })}
          </div>
        </div>
      )}
    </div>
  );
              }  

export default Notifications;
