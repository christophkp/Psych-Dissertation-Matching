import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from "../assets/testimage.jpeg"

function Home() {
  const [listofFaculty, setListOfFaculty] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:3001/faculty').then((response) => {
        setListOfFaculty(response.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center mt-4" style={{ textTransform: 'uppercase', color: '#007b5e' }}>Faculty</h1>
        {listofFaculty.map((value, key) => {
          return(
            <div key={key} className="flip-card col-md-3 mt-4 mb-3" >
              <div className="flip-card-inner border border-success" >
                <div className="flip-card-front">
                  <div className="card border-0">
                    <div className="card-body p-0">
                      <img className="img-fluid" src={img} alt="card" />
                      <h4 className="card-title mt-3">{value.firstName} {value.lastName}</h4>
                      <button className="btn btn-success"><i className="bi bi-arrow-repeat"></i></button>
                    </div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card border-0">
                    <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <h5>Information:</h5>
                      <p>{value.information}</p>
                      <h5>Research:</h5>
                      <p>{value.research}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          )
        })}
      </div>
    </div>
  )
}

export default Home