import React, {useEffect, useState} from 'react'
import axios from 'axios'
import img from "../assets/pfp.png"
import Calender from "react-calendar"
import 'react-calendar/dist/Calendar.css';

function Schedule() {
  const [listofFaculty, setListOfFaculty] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
  {"id": 0,
  "firstName": "Professor",
  "lastName": "Name",
  });
  const [selectedTime, setSelectedTime] = useState("8:00 AM - 9:00 AM");

  const [date, setDate] = useState(new Date());
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  const timeSlots = [
    '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM',
  ];
  
  

  useEffect(() => {
    axios.get('http://localhost:3001/faculty').then((response) => {
      setListOfFaculty(response.data);
    }).catch((err) => {
      console.log(err?.response?.data.Error);
    });
  }, []);

  const handleItemClick = (value) => {
    setSelectedItem(value);
  }
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    if (selectedItem.firstName === "Professor") {
      alert("Please select a faculty member.");
      return;
    }
    else{
      axios.post("")
    }
  }
  
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3 border border-dark d-flex flex-wrap text-center" style={{ maxHeight: "600px", overflowY: "auto", borderRadius: "8px",  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)"}}>
        <h3 className="flex-basis-100 w-100">Faculty List</h3>
          {listofFaculty.map((value, key) => {
            return(
              <div key={key} style={{ width: "50%", cursor: "pointer" }} onClick={() => handleItemClick(value)}>
                <img src={img} className="rounded-circle mt-3 p-3" style={{ width: "125px", backgroundColor: selectedItem === value ? '#59E659' : '' }} alt="pfp" onMouseEnter={(e) => e.target.style.boxShadow = "0 0 5px 2px green"} onMouseLeave={(e) => e.target.style.boxShadow = ""}/>
                <p className='mb-2' style={{ overflowWrap: 'break-word' }}>{value.firstName} {value.lastName}</p>
              </div>
          )})}
        </div>
        <div className="col-md-5">
          <Calender onChange={setDate}/>
          <div className="border border-dark p-3 mt-3" style={{ maxHeight: '300px', overflowY: "auto", borderRadius: "8px",  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)"}}>
            <h5 className='text-center mb-3'>Select a time on {month} {date.getDate()}, {year}</h5>
            {timeSlots.map((time, index) => {
              return(
                <div className="row border border-dark justify-content-center p-2 mb-1 rounded" style={{cursor: "pointer", backgroundColor: selectedTime === time ? '#59E659' : ''}} key={index} onClick={() => handleTimeClick(time)} onMouseEnter={(e) => e.target.style.boxShadow = "0 0 5px 2px green"} onMouseLeave={(e) => e.target.style.boxShadow = ""}>
                  {time}
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-md-4 text-center d-flex flex-column justify-content-center">
          <div className="border border-dark p-3 rounded">
            <h3> Meeting Details </h3>
            <p>Date: {month} {date.getDate()}, {year}</p>
            <p>Time: {selectedTime}</p>
            <p>Professor: {selectedItem.firstName} {selectedItem.lastName} </p>
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Schedule</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule