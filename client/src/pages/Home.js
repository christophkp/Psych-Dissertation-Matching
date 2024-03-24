import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../assets/testimage.jpeg"
function Home() {
  const [listofFaculty, setListOfFaculty] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/faculty').then((response) => {
      setListOfFaculty(response.data);
    });

  }, []);

  return (
    <div className="row">
      {listofFaculty.map((value, key) => {
        return(
          <Card key={key} className="m-auto mt-3" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{value.firstName} {value.lastName}</Card.Title>
            <Card.Subtitle>Information:</Card.Subtitle>
            <Card.Text>
              {value.information}
            </Card.Text>
            <Card.Subtitle>Research:</Card.Subtitle>
            <Card.Text>
              {value.research}
            </Card.Text>
            <Button variant="primary">Schedule Meeting</Button>
          </Card.Body>
        </Card>
        )
      })}
    </div>
  )
}

export default Home