import { Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Login = () => {
  const username = useRef();
  const password = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: username.current.value,
        password: password.current.value,
      });
      console.log(response.data.message);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        style={{
          width: "500px",
          height: "600px",
          border: "1px solid black",
          borderRadius: "20px",
          padding: "95px",
          marginBottom: "70px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <h2
            className="mb-5 text-center"
            style={{ borderBottom: "1px solid black", paddingBottom: "20px" }}
          >
            Login
          </h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              ref={username}
              onChange={() => setErrorMessage("")}
            />
            {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              ref={password}
              onChange={() => setErrorMessage("")}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group> */}
          <p className={errorMessage ? "text-danger text-center" : "d-none"}>
            {errorMessage}
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button
              size="lg"
              variant="success"
              type="submit"
              style={{ width: "125px" }}
            >
              Login
            </Button>
          </div>
          <p className="text-muted text-center" style={{ marginTop: "90px" }}>
            Don't have an account? <Link to="/registration">Register here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
