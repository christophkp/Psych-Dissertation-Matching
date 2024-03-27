import { Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import axios from "axios";

export const Login = () => {
  const username = useRef();
  const password = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: username.current.value,
        password: password.current.value,
      });
      console.log(response.data.message);
      setErrorMessage(response.data.message);
    } catch (error) {
      //error handling from axios docs
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
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
            ref={username}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={password}
          />
        </Form.Group>
        {errorMessage}

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
};
