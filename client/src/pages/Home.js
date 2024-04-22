import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [listofFaculty, setListOfFaculty] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/faculty", { withCredentials: true })
      .then((response) => {
        setListOfFaculty(response.data);
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });
  }, []);
  return (
    <div className="container" >
      <div className="row">
        <h1
          className="text-center mt-4"
          style={{ textTransform: "uppercase", color: "#007b5e" }}
        >
          Faculty
        </h1>
        {listofFaculty.map((value, key) => {
          return (
            <div key={key} className="col-md-3 mt-4 mb-3">
              <div
                className="card border border-success"
                style={{ maxHeight: "600px", overflowY: "auto" }}
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
                    className="mt-4 border border-success rounded"
                    style={{ padding: "5px", display: "inline-block" }}
                  >
                    Information{" "}
                  </h6>
                  <p> {value.information}</p>
                  <h6
                    className=" border border-success rounded"
                    style={{ padding: "5px", display: "inline-block" }}
                  >
                    Research{" "}
                  </h6>
                  <p>{value.research}</p>
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
