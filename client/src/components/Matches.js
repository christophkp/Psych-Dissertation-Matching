import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

export const Matches = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <div className="text-center">
        <Button variant="success" size="lg">
          Generate Matches
        </Button>
      </div>
      {!show && (
        <Button variant="secondary" onClick={() => setShow(true)}>
          View Alert
        </Button>
      )}

      <div className="inline-block" style={{ width: "350px" }}>
        <Alert
          show={show}
          dismissible
          onClose={() => setShow(false)}
          variant="secondary"
        >
          <Alert.Heading>Info</Alert.Heading>
          <p>
            Please ensure that all students and faculty have submitted their
            rankings for the best results. Simply click on "Generate Matches" to
            view matches based on the current rankings.
          </p>
        </Alert>
      </div>
    </div>
  );
};
