import React, { useEffect, useState } from "react";
import axios from "axios";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Schedule() {
  const [listofFaculty, setListOfFaculty] = useState([]);
  const [selectedTime, setSelectedTime] = useState("8:00 AM - 9:00 AM");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [date, setDate] = useState(new Date());
    
  const formattedDate = date.toLocaleString('default', {weekday: 'short', day: 'numeric', month: 'short' });
  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3001/faculty", { withCredentials: true })
      .then((response) => {
        setListOfFaculty(response.data);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  }, []);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };



  

  const handleSubmit = async () => {
    const [startTime, endTime] = selectedTime.split(" - ");

    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(startTime.split(":")[0], 10));
    startDateTime.setMinutes(parseInt(startTime.split(":")[1], 10));

    const endDateTime = new Date(date);
    endDateTime.setHours(parseInt(endTime.split(":")[0], 10));
    endDateTime.setMinutes(parseInt(endTime.split(":")[1], 10));

    try {
      await axios.post(
        "http://localhost:3001/meetings/schedule",
        {
          startDate: startDateTime,
          endDate: endDateTime,
          facultyId: listofFaculty[selectedItemIndex].id,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Meeting scheduled successfully!");
    } catch (err) {
      toast.error("Internal Server Error");
    }
  };

  const handleNextFaculty = () => {
    setSelectedItemIndex((prevIndex) => (prevIndex + 1) % listofFaculty.length);
  };

  const handlePrevFaculty = () => {
    setSelectedItemIndex((prevIndex) =>
      prevIndex === 0 ? listofFaculty.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container">
      <div className="row mt-3 border-top border-success border-4" style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}>
        <div className="col-md-4 mt-3 border-end p-4" style={{ maxHeight: "600px"}}>
          <div className="d-flex justify-content-end">
            <i class="bi bi-chevron-left fs-5 me-4" onClick={handlePrevFaculty} style={{ cursor: 'pointer' }}></i>
            <i class="bi bi-chevron-right fs-5" onClick={handleNextFaculty} style={{ cursor: 'pointer' }}></i>
          </div>
          <div className="d-flex flex-column mt-3">
            <img className="rounded-circle border border-success" src={`/assets/profilepics/${listofFaculty[selectedItemIndex]?.profilepic}`} alt="Profile Pic" style={{ width: "100px" }}/>
            <h3 className="mt-3">{listofFaculty[selectedItemIndex]?.firstName} {listofFaculty[selectedItemIndex]?.lastName}</h3>
          </div>
          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
            <hr />
            <p className="text-secondary"style={{ fontSize: "14px", lineHeight: "1.5"}}>{listofFaculty[selectedItemIndex]?.information}</p>
          </div>
          <hr />
        </div>
        <div className="col-md-4 mt-3 border-end p-4" style={{ maxHeight: "600px"}}>
          <h4 className="text-uppercase text-center">Select a Date & Time</h4>
          <Calender onChange={setDate} />
        </div>
        <div className="col-md-4 mt-2 border-end p-4" style={{ maxHeight: "600px", overflow: "auto"}}>
          <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-success" onClick={handleSubmit}>Schedule Meeting</button>
            </div>
          <p className="mt-1 text-center mb-4" style={{ color: '#008000' }}>{formattedDate} ({selectedTime})</p>
          <hr></hr>
          {timeSlots.map((time, index) => {
              return (
                <div
                className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                key={index}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </div>
              );
            })}
        </div>
      </div>
    </div>
    )}

export default Schedule;
