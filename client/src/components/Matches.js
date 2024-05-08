import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Matches = () => {
  const [show, setShow] = useState(true);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMatches = () => {
    setLoading(true);
    axios
      .get("http://localhost:3001/matches/")
      .then((response) => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response?.data?.message);
        }
      });
  };
  return (
    <Container fluid="lg">
      <Row>
        <Col md={3}>
          {show ? (
            <Alert
              show={show}
              variant="secondary"
              dismissible
              onClose={() => setShow(false)}
            >
              <Alert.Heading>Info</Alert.Heading>
              <p>
                Please ensure that all students and faculty have submitted their
                rankings for the best results. Simply click on "Generate
                Matches" to view matches based on the current rankings.
              </p>
            </Alert>
          ) : (
            <Button variant="secondary" onClick={() => setShow(true)}>
              View Alert
            </Button>
          )}
        </Col>
        <Col md={6}>
          <div
            className="rounded-top p-2 text-center"
            style={{ backgroundColor: "#198754", color: "white" }}
          >
            <span className="text-light fw-bold" style={{ fontSize: "30px" }}>
              Matches
            </span>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Faculty</th>
                <th>Advisees</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {matches.length > 0 ? (
                matches.map((match) => (
                  <tr key={match.facultyId}>
                    <td>{match.facultyName}</td>
                    <td>{match.numStudents}</td>
                    <td>
                      {match.matchedStudents && match.matchedStudents.length > 0
                        ? match.matchedStudents
                            .map((student) => student.studentName)
                            .join(", ")
                        : "No Matches"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No matches found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>

        <Col
          md={3}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={fetchMatches}
            disabled={loading}
          >
            Generate Matches <i className="bi bi-play-fill"></i>
            {loading && (
              <Spinner
                as="span"
                animation="border"
                role="status"
                className="align-middle"
              />
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
