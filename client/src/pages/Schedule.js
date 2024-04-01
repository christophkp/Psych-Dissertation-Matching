import React, {useEffect, useState} from 'react'
import axios from 'axios'
import img from "../assets/pfp.png"

function Schedule() {
  const [listofFaculty, setListOfFaculty] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date is today


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
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 border border-dark d-flex flex-wrap mt-3 text-center" style={{ maxHeight: "600px", overflowY: "auto" }}>
          {listofFaculty.map((value, key) => {
            return(
              <div key={key} style={{ width: "50%", cursor: "pointer" }} onClick={() => handleItemClick(value)}>
                <img src={img} className={`rounded-circle mt-3 p-3 ${selectedItem === value ? 'bg-success' : ''}`}  style={{ width: "125px" }} alt="pfp" />
                <p className='mb-2' style={{ overflowWrap: 'break-word' }}>{value.firstName} {value.lastName}</p>
              </div>
          )})}
        </div>
      </div>
    </div>
  )
}

export default Schedule