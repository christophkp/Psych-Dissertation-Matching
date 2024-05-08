import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="fw-bold text-danger">Access Denied!</h1>
        <p>You do not have permission to view this page.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};
