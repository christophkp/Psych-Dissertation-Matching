import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export const Rankings = () => {
  const [studentRankings, setStudentRankings] = useState([]);
  const [facultyRankings, setFacultyRankings] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (comment) => {
    setSelectedComment(comment);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/rank/studentrankings")
      .then((response) => {
        setStudentRankings(response.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response?.data?.message);
        }
      });

    axios
      .get("http://localhost:3001/rank/facultyrankings")
      .then((response) => {
        setFacultyRankings(response.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response?.data?.message);
        }
      });
  }, []);

  const formatRankings = (rankings) => {
    return rankings.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      choices: user.GivenRanks.map((rank) => ({
        name: `${rank.Ranked.firstName} ${rank.Ranked.lastName}`,
        comment: rank.commentBody || "No comment provided",
      }))
        .concat(Array(10).fill("N/A"))
        .slice(0, 10),
    }));
  };
  return (
    <div>
      <div className="rounded-top p-3" style={{ backgroundColor: "#203354" }}>
        <span className="text-light fw-bold" style={{ fontSize: "30px" }}>
          Student Rankings
        </span>
      </div>
      <div
        className="rounded-bottom"
        style={{
          border: "1px solid",
          maxHeight: "400px",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>1st Choice</th>
              <th>2nd Choice</th>
              <th>3rd Choice</th>
              <th>4th Choice</th>
              <th>5th Choice</th>
              <th>6th Choice</th>
              <th>7th Choice</th>
              <th>8th Choice</th>
              <th>9th Choice</th>
              <th>10th Choice</th>
            </tr>
          </thead>
          <tbody>
            {formatRankings(studentRankings).map((student, key) => (
              <tr key={key}>
                <td>{student.name}</td>
                {student.choices.map((choice, key) => (
                  <td key={key}>
                    {choice.name} {choice.comment ? <i onClick={() => handleShow(choice.comment)} className="bi bi-chat-dots-fill"></i> : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <div style={{ maxWidth: "500px", wordWrap: "break-word" }}>
            {selectedComment}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      


      <div
        className="rounded-top p-3 mt-4"
        style={{ backgroundColor: "#CC6600" }}
      >
        <span className="text-light fw-bold" style={{ fontSize: "30px" }}>
          Faculty Rankings
        </span>
      </div>
      <div
        className="rounded-bottom mb-5"
        style={{
          border: "1px solid",
          maxHeight: "400px",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>1st Choice</th>
              <th>2nd Choice</th>
              <th>3rd Choice</th>
              <th>4th Choice</th>
              <th>5th Choice</th>
              <th>6th Choice</th>
              <th>7th Choice</th>
              <th>8th Choice</th>
              <th>9th Choice</th>
              <th>10th Choice</th>
            </tr>
          </thead>
          <tbody>
            {formatRankings(facultyRankings).map((faculty, key) => (
              <tr key={key}>
                <td>{faculty.name}</td>
                {faculty.choices.map((choice, key) => (
                  <td key={key}>
                    {choice.name} {choice.comment ? <i onClick={() => handleShow(choice.comment)} className="bi bi-chat-dots-fill"></i> : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
    </div>
  );
};
