import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { toast } from "react-toastify";

export const Profile = () => {
  const { user, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const [firstName, setFirstName] = useState((user && user.firstName) || "");
  const [lastName, setLastName] = useState((user && user.lastName) || "");
  const [username, setUsername] = useState((user && user.username) || "");
  //const [password, setPassword] = useState((user && user.password) || "");

  const [information, setInformation] = useState(
    (user && user.information) || ""
  );
  const [research, setResearch] = useState((user && user.research) || "");

  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);

    if (user.role === "faculty") {
      formData.append("information", information);
      formData.append("research", research);
      formData.append("profilepic", file);
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

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div
        style={{
          width: "850px",
          height: "650px",
          border: "1px solid black",
          borderRadius: "20px",
          padding: "60px",
          backgroundColor: "white",
          marginBottom: "50px",
        }}
      >
        <h2 className="pb-3" style={{ position: "relative" }}>
          General Info
        </h2>
        <Form encType="multipart/form-data">
          <Row>
            {user && user.role === "faculty" && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Profile Picture:</Form.Label>
                <Form.Control
                  type="file"
                  name="profilepic"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
            )}
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label>First Name</Form.Label>

              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4">
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formEmail1">
              <Form.Label>Password</Form.Label>

              <Form.Control />
            </Form.Group>
          </Row>
          {user && user.role === "faculty" && (
            <Row className="mt-4">
              <Form.Group as={Col} controlId="formInformation">
                <Form.Label>Information</Form.Label>

                <Form.Control
                  as="textarea"
                  value={information}
                  onChange={(e) => {
                    setInformation(e.target.value);
                  }}
                  style={{ height: "150px", width: "350px" }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formResearch">
                <Form.Label>Research</Form.Label>

                <Form.Control
                  as="textarea"
                  value={research}
                  onChange={(e) => {
                    setResearch(e.target.value);
                  }}
                  style={{ height: "150px", width: "350px" }}
                />
              </Form.Group>
            </Row>
          )}
          <Button
            className="mt-3"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
};
