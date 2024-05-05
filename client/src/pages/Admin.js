import Table from "react-bootstrap/Table";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Rankings } from "../components/Rankings";

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
  const [createUserForm, setCreateUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "student",
    information: "",
    research: "",
  });

  const [selectedUser, setSelectedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    role: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setFormData({ ...user, password: "" });
    setShow(true);
  };
  const [showSecondModal, setShowSecondModal] = useState(false);
  const handleCloseSecondModal = () => setShowSecondModal(false);
  const handleShowSecondModal = (user) => {
    setSelectedUser(user);
    setShowSecondModal(true);
  };

  const [showUserCreateModal, setShowUserCreateModal] = useState(false);
  const handleCloseUserCreateModal = () => {
    setCreateUserForm({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: "student",
      information: "",
      research: "",
    });
    setShowUserCreateModal(false);
  };
  const handleShowCreateUserModal = () => {
    setShowUserCreateModal(true);
  };
  const fetchUsers = () => {
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
  };
  useEffect(() => {
    fetchUsers();
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
      const response = await axios.put(
        "http://localhost:3001/admin/updateuser",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      handleClose();
      fetchUsers();
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/admin/deleteuser/${selectedUser.id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      handleCloseSecondModal();
      fetchUsers();
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleUserCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/createuser",
        createUserForm,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      handleCloseUserCreateModal();
      fetchUsers();
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <Container fluid className="mt-3">
      <Tab.Container id="left-tabs" defaultActiveKey="first">
        <Row>
          <Col xs="auto">
            <Nav variant="tabs" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="first"
                  className="p-3"
                  style={{
                    fontSize: "17px",
                    color: "black",
                  }}
                >
                  <i className="bi bi-person-fill"></i> User Management
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  className="p-3"
                  style={{ fontSize: "17px", color: "black" }}
                >
                  <i className="bi bi-list-stars"></i> View Rankings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="third"
                  className="p-3"
                  style={{ fontSize: "17px", color: "black" }}
                >
                  <i className="bi bi-people-fill"></i> View Matches
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div
                  className="d-flex align-items-center rounded-top"
                  style={{ backgroundColor: "#013220" }}
                >
                  <span
                    className="text-light p-3 ms-3"
                    style={{ fontSize: "30px" }}
                  >
                    User Management
                  </span>
                  <Button
                    variant="light"
                    className="ms-auto me-4"
                    onClick={handleShowCreateUserModal}
                  >
                    <i
                      className="bi bi-plus-circle-fill"
                      style={{ color: "grey" }}
                    ></i>{" "}
                    Create New User
                  </Button>
                </div>
                <div
                  className="rounded-bottom"
                  style={{
                    border: "1px solid",
                    maxHeight: "500px",
                    height: "500px",
                    overflowY: "scroll",
                  }}
                >
                  <Table
                    hover
                    striped
                    className="mx-auto mt-3"
                    style={{ width: "97%" }}
                  >
                    <thead style={{ fontSize: "15px", fontWeight: "normal" }}>
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Date Created</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, key) => (
                        <tr className="table-light align-middle" key={key}>
                          <td>{user?.id}</td>
                          <td>{user?.firstName}</td>
                          <td>{user?.lastName}</td>
                          <td>{user?.username}</td>
                          <td>********</td>
                          <td>{formatCreatedAtDate(user?.createdAt)}</td>
                          <td>{user?.role}</td>

                          <td>
                            <Button
                              variant="outline-success"
                              className="me-3"
                              onClick={() => handleShow(user)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => handleShowSecondModal(user)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Rankings />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFirstName" className="mb-2">
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
            <Form.Group controlId="editLastName" className="mb-2">
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
            <Form.Group controlId="editUsername" className="mb-2">
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
            <Form.Group controlId="editPassword" className="mb-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                value={formData.password}
                type="password"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="editRole" className="mb-2">
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
                <Form.Group controlId="editInfo" className="mb-2">
                  <Form.Label>Information:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={formData.information || ""}
                    type="text"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        information: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="editResearch" className="mb-2">
                  <Form.Label>Research:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={formData.research || ""}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the following user? This action cannot
          be undone.
          <p className="mb-2 mt-3">
            <span className="fw-bold">ID:</span> {selectedUser.id},&nbsp;
            <span className="fw-bold">Username:</span> {selectedUser.username}
            ,&nbsp;
            <span className="fw-bold">Role:</span> {selectedUser.role}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSecondModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUserCreateModal} onHide={handleCloseUserCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createFirstName" className="mb-2">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                required
                type="text"
                value={createUserForm.firstName}
                onChange={(e) =>
                  setCreateUserForm((prevData) => ({
                    ...prevData,
                    firstName: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="createLastName" className="mb-2">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                required
                type="text"
                value={createUserForm.lastName}
                onChange={(e) =>
                  setCreateUserForm((prevData) => ({
                    ...prevData,
                    lastName: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="createUsername" className="mb-2">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                required
                type="email"
                value={createUserForm.username}
                onChange={(e) =>
                  setCreateUserForm((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="createPassword" className="mb-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                required
                type="password"
                value={createUserForm.password}
                onChange={(e) =>
                  setCreateUserForm((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="createRole" className="mb-2">
              <Form.Label>Role:</Form.Label>
              <Form.Select
                value={createUserForm.role}
                onChange={(e) =>
                  setCreateUserForm((prevData) => ({
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
            {createUserForm.role === "faculty" && (
              <>
                <Form.Group controlId="createInfo" className="mb-2">
                  <Form.Label>Information:</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={6}
                    type="text"
                    value={createUserForm.information}
                    onChange={(e) =>
                      setCreateUserForm((prevData) => ({
                        ...prevData,
                        information: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="createResearch" className="mb-2">
                  <Form.Label>Research:</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={6}
                    type="text"
                    value={createUserForm.research}
                    onChange={(e) =>
                      setCreateUserForm((prevData) => ({
                        ...prevData,
                        research: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUserCreate}>
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
