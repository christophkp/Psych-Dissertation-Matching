import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/auth/login", {
      username,
      password,
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Form
        className="p-4"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#013220",
          color: "#ffffff",
          width: "400px",
          borderRadius: "10px",
          height: "400px",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
};
