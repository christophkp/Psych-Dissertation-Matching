import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [listofFaculty, setListOfFaculty] = useState([]);
  const { fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
    axios
      .get("http://localhost:3001/faculty")
      .then((response) => {
        setListOfFaculty(response.data);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row" style={{ maxHeight: "100vh", overflowY: "auto" }}>
        {listofFaculty.map((value, key) => {
          return (
            <div key={key} className="col-md-3 mt-4 mb-3">
              <div
                className="card border-0 border-top border-success border-4"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={`/assets/profilepics/${value.profilepic}`}
                    className="card-img-top rounded-circle mt-3"
                    style={{ width: "100px" }}
                    alt="card"
                  />
                </div>
                <div className="card-body p-0 text-center">
                  <div
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h4 className="card-title mt-3 mb-4 text-center">
                        <strong>
                          {value.firstName} {value.lastName}
                        </strong>
                      </h4>
                      <hr style={{ width: "50%", margin: "0 auto" }} />
                    </div>
                  </div>
                  <h6
                    className="mt-4 font-weight-bold"
                    style={{
                      padding: "5px",
                      display: "inline-block",
                      fontSize: "18px",
                      backgroundColor: "#f0f0f0",
                      color: "#333",
                      borderBottom: "2px solid #007b5e",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Information
                  </h6>
                  <p
                    className="mx-auto"
                    style={{
                      textAlign: "justify",
                      width: "85%",
                      hyphens: "auto",
                    }}
                  >
                    {value.information}
                  </p>
                  <h6
                    className="mt-2 font-weight-bold"
                    style={{
                      padding: "5px",
                      display: "inline-block",
                      fontSize: "18px",
                      backgroundColor: "#f0f0f0",
                      color: "#333",
                      borderBottom: "2px solid #007b5e",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Research
                  </h6>
                  <p
                    className="mb-3 mx-auto"
                    style={{
                      textAlign: "justify",
                      width: "85%",
                      hyphens: "auto",
                    }}
                  >
                    {value.research}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
