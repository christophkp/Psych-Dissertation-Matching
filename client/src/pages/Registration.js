import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function Registration() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var form = document.getElementById("registration-form");

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
    } else {
      try {
        await axios.post("http://localhost:3001/register", {
          firstName,
          lastName,
          username,
          password,
        });
        toast.success('Registration Success');
        navigate('/login');
      } catch (err) {
        toast.error(err?.response?.data.Error);
      }
    }
  };

  return (
    <div
      className="container h-100 mt-3"
      
    >
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card w-75 mx-auto" style={{ borderRadius: "10px" }}>
            <div className="card-body p-5">
              <h3 className="text-uppercase text-center mb-3 ">
                Create an account
              </h3>

              <hr></hr>
              <div className="d-flex justify-content-center">
                <form
                  id="registration-form"
                  className="needs-validation"
                  data-testid="registration-form"
                  onSubmit={handleSubmit}
                  noValidate
                  
                >
                  <div className="form-group">
                    <label htmlFor="validationCustom01">First Name </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "250px" }}
                      id="validationCustom01"
                      onChange={(event) => setFirstname(event.target.value)}
                      minLength="3"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your first name
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "250px" }}
                      id="lastName"
                      onChange={(event) => setLastname(event.target.value)}
                      minLength="3"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your last name
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input
                      type="email"
                      className="form-control"
                      style={{ width: "250px" }}
                      id="email"
                      onChange={(event) => setUsername(event.target.value)}
                      minLength="3"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter an email
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "250px" }}
                      id="password"
                      onChange={(event) => setPassword(event.target.value)}
                      minLength="5"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a password
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg"
                    >
                      Register
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5">
                    Have an account already?{" "}
                    <Link to="/login">
                      <u>Login here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
