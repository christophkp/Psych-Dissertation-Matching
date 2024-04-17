import Table from "react-bootstrap/Table";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState();

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

  return (
    <div>
      <h1>Admin Panel:</h1>
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
              <td style={{ maxWidth: "100px" }}>{user.firstName}</td>
              <td style={{ maxWidth: "100px" }}>{user.lastName}</td>
              <td style={{ maxWidth: "100px" }}>{user.username}</td>
              <td>******</td>
              <td style={{ maxWidth: "100px" }}>
                {formatCreatedAtDate(user.createdAt)}
              </td>

              <td>{user.role}</td>
              <td>
                <div className="d-flex">
                  <Button variant="outline-success" className="me-3">
                    Edit
                  </Button>
                  <Button variant="outline-danger">Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
