import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export const MeetingRequest = () => {
  const [listofFaculty, setListOfFaculty] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/faculty")
      .then((response) => {
        setListOfFaculty(response.data);
      })
      .catch((err) => {
        console.log(err?.response?.data.Error);
      });
  }, [listofFaculty]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col text-center mb-4">
          <h4>Please select who you would like to meet</h4>
          <h4>with for speed matching</h4>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div
          className="rectangle-box"
          style={{
            width: "300px",
            height: "500px",
            border: "3px solid #013220",
          }}
        ></div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col text-center">
          <Button size="lg" className="mt-2" variant="success">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
