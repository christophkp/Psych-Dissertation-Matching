import Table from "react-bootstrap/Table";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    information: "",
    research: "",
  });
  const [currentUser, setCurrentUser] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setFormData({ ...user, password: "" });
    setShow(true);
    console.log(user);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/users", {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response?.data?.message);
        }
      });
  }, []);

  const formatCreatedAtDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = async () => {
    try {
      const res = axios.put(
        "http://localhost:3001/admin/updateuser",
        formData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="users"
        id="admin-tabs"
        className="mb-3"
        fill
        justify
      >
        <Tab eventKey="users" title="Users">
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="mx-auto"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>createdAt</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr className="table-secondary" key={key}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>******</td>
                  <td>{formatCreatedAtDate(user.createdAt)}</td>
                  <td>{user.role}</td>

                  <td>
                    <div className="d-flex">
                      <Button
                        variant="outline-success"
                        className="me-3"
                        onClick={() => handleShow(user)}
                      >
                        Edit
                      </Button>
                      <Button variant="outline-danger">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="CurrentPassword">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    value={formData.firstName}
                    type="text"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="NewPassword">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    value={formData.lastName}
                    type="text"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="ConfirmPassword">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    value={formData.username}
                    type="email"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        username: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="ConfirmPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        password: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="ConfirmPassword">
                  <Form.Label>Role:</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        role: e.target.value,
                      }))
                    }
                  >
                    <option value="student">student</option>
                    <option value="faculty">faculty</option>
                    <option value="admin">admin</option>
                  </Form.Select>
                </Form.Group>
                {formData.role === "faculty" && (
                  <>
                    <Form.Group controlId="formInfo">
                      <Form.Label>Information:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        value={formData.information}
                        type="text"
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            information: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formInfo">
                      <Form.Label>Research:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        value={formData.research}
                        type="text"
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            research: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                  </>
                )}
                {/* <p
                  className={
                    matchPassword ? "text-danger text-center mt-3" : "d-none"
                  }
                >
                  {matchPassword}
                </p> */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="srankings" title="Student Rankings"></Tab>
        <Tab eventKey="frankings" title="Faculty Rankings"></Tab>
        <Tab eventKey="matches" title="Matches"></Tab>
      </Tabs>
    </div>
  );
};
