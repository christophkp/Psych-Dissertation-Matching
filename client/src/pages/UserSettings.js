import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export const Settings = () => {
  const [toggleEditInfo, setToggleEditInfo] = useState(false);
  const [toggleEditResearch, setToggleEditResearch] = useState(false);

  const handleInfoEditClick = () => {
    setToggleEditInfo((prev) => !prev);
  };

  const handleResearchEditClick = () => {
    setToggleEditResearch((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form className="mt-5" style={{ maxWidth: "600px", width: "100%" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Information:
            <Button
              variant="secondary"
              onClick={handleInfoEditClick}
              style={{ marginLeft: "auto" }}
            >
              <i class="bi bi-pencil-square"></i>
            </Button>
          </Form.Label>

          <Form.Control
            readOnly={!toggleEditInfo}
            as="textarea"
            rows={3}
            style={{ width: "100%" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Research:
            <Button
              variant="secondary"
              onClick={handleResearchEditClick}
              style={{ marginLeft: "auto" }}
            >
              <i class="bi bi-pencil-square"></i>
            </Button>
          </Form.Label>
          <Form.Control
            readOnly={!toggleEditResearch}
            as="textarea"
            rows={3}
            style={{ width: "100%" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};
