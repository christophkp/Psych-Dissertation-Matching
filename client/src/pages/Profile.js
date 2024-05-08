import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

export const Profile = () => {
  const { user, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const [firstName, setFirstName] = useState((user && user.firstName) || "");
  const [lastName, setLastName] = useState((user && user.lastName) || "");
  const [username, setUsername] = useState((user && user.username) || "");
  const [numStudents, setNumStudents] = useState(
    (user && user.numStudents) || ""
  );
  const [information, setInformation] = useState(
    (user && user.information) || ""
  );
  const [research, setResearch] = useState((user && user.research) || "");
  const [file, setFile] = useState();
  const [meetingLink, setMeetingLink] = useState(
    (user && user.meetingLink) || ""
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);

    if (user.role === "faculty") {
      formData.append("numStudents", numStudents);
      formData.append("information", information);
      formData.append("research", research);
      formData.append("profilepic", file);
      formData.append("meetingLink", meetingLink);
    }
    try {
      const response = await axios.put(
        `http://localhost:3001/update/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await fetchUser();
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMatchPassword("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/pass",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      handleClose();
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const formatCreatedAtDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const uploadNewPhotoClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Container className="mt-4 pb-5">
      <Row>
        <Col md={4}>
          <div
            className="profilecard d-flex flex-column align-items-center justify-content-center rounded"
            style={{
              border: "1px solid black",
              width: "300px",
              height: "350px",
            }}
          >
            <div className="title fw-bold" style={{ fontSize: "20px" }}>
              {user.firstName + " " + user.lastName}
            </div>

            <div style={{ fontSize: "15px" }}>{user.username}</div>

            <div className="profilepic mt-3">
              <Image
                src={`/assets/profilepics/${user.profilepic}`}
                roundedCircle
                style={{ width: "150px" }}
              />
            </div>

            <div className="upload mt-3">
              {user.role === "faculty" && (
                <Form>
                  <Form.Group>
                    <Button
                      variant="success"
                      onClick={uploadNewPhotoClick}
                      style={{ borderRadius: "0" }}
                    >
                      Upload New Photo
                    </Button>
                    <Form.Control
                      type="file"
                      id="fileInput"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                  </Form.Group>
                </Form>
              )}
            </div>

            <div className="mt-4" style={{ fontSize: "13px", color: "grey" }}>
              Member Since:{" "}
              <span className="fw-bold">
                {formatCreatedAtDate(user.createdAt)}
              </span>
            </div>
          </div>
        </Col>
        <Col md={7}>
          <Form className="rounded p-4" style={{ border: "1px solid black" }}>
            <Form.Label className="fw-bold fs-2 mb-3">
              Edit Profile ({user.role})
            </Form.Label>

            <Row>
              <Col
                className={
                  user.role === "student" || user.role === "admin" ? "mt-5" : ""
                }
              >
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col
                className={
                  user.role === "student" || user.role === "admin" ? "mt-5" : ""
                }
              >
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col
                className={
                  user.role === "student" || user.role === "admin" ? "mt-5" : ""
                }
              >
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col
                className={
                  user.role === "student" || user.role === "admin" ? "mt-5" : ""
                }
              >
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Button
                    className="d-block"
                    variant="secondary"
                    onClick={handleShow}
                  >
                    Change Password
                  </Button>
                </Form.Group>
              </Col>
            </Row>
            {user.role === "faculty" && (
              <>
                <Form.Group className="mb-3" controlId="formNumStudents">
                  <Form.Label>Number of Advisees</Form.Label>
                  <Form.Select
                    value={numStudents}
                    onChange={(e) =>
                      setNumStudents(parseInt(e.target.value, 10))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formInfo">
                  <Form.Label>Information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={information}
                    onChange={(e) => {
                      setInformation(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formResearch">
                  <Form.Label>Research</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={research}
                    onChange={(e) => {
                      setResearch(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMeetingLink">
                  <Form.Label>Meeting Link:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={meetingLink}
                    onChange={(e) => {
                      setMeetingLink(e.target.value);
                    }}
                  />
                </Form.Group>
              </>
            )}
            <div
              className={
                user.role === "student" || user.role === "admin"
                  ? "text-end mt-5"
                  : "text-end mt-4"
              }
            >
              <Button
                variant="success"
                type="submit"
                style={{ width: "150px" }}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="CurrentPassword">
              <Form.Label>Current Password:</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="NewPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setMatchPassword("");
                }}
              />
            </Form.Group>
            <p
              className={
                matchPassword ? "text-danger text-center mt-3" : "d-none"
              }
            >
              {matchPassword}
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
