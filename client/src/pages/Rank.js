import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function Rank() {
  const [listofFaculty, setListOfFaculty] = useState([]);
  const [rankedFaculty, setRankedFaculty] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/faculty', { withCredentials: true }).then((response) => {
      setListOfFaculty(response.data);
    }).catch((err) => {
      toast.error('Internal Server Error');
      });
  }, []);


  const handleItemClick = (value) => {
    if (rankedFaculty.includes(value)) {
      setRankedFaculty(rankedFaculty.filter(faculty => faculty !== value));
      setListOfFaculty([...listofFaculty, value]);
    } else {
      setListOfFaculty(listofFaculty.filter(faculty => faculty !== value));
      setRankedFaculty([...rankedFaculty, value]);
    }
  }

  const submitRankings = async () => {
    try {
      const rankingData = rankedFaculty.map((faculty, index) => ({
        facultyId: faculty.id, 
        rank: index + 1,
      }));

      const response = await axios.post('http://localhost:3001/rank/submit', rankingData);

    } catch (error) {
      console.error('Error submitting rankings:', error);
    }
  };

  
  return (
    <div className="container mt-3">
      <div className="row">
        <div
          className="col-md-3 border border-success d-flex flex-wrap text-center rounded"
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3 className="flex-basis-100 w-100">Faculty List</h3>
          <p className="flex-basis-100 w-100">Select a Faculty</p>
          <i class="bi bi-arrow-down w-100"></i>
          {listofFaculty.map((value, key) => {
            return (
              <div
                key={key}
                style={{ width: "50%", cursor: "pointer" }}
                onClick={() => handleItemClick(value)}
              >
                <img
                  src={`/assets/profilepics/${value.profilepic}`}
                  className="rounded-circle mt-3 p-3"
                  style={{ width: "125px" }}
                  alt="pfp"
                  onMouseEnter={(e) =>
                    (e.target.style.boxShadow = "0 0 5px 2px green")
                  }
                  onMouseLeave={(e) => (e.target.style.boxShadow = "")}
                />
                <p className="mb-2" style={{ overflowWrap: "break-word" }}>
                  {value.firstName} {value.lastName}
                </p>
              </div>
            );
          })}
        </div>
        <div
          className="col-md-5 border offset-md-1 border-success "
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
            borderRadius: "50px",
          }}
        >
          <h3 className="mb-3 text-center">Rankings:</h3>
          <p className="text-center">
            Rank your preference for working with each faculty member, starting
            with 1 as your top choice
          </p>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              onclick={submitRankings}
            >
              Submit Rankings
            </button>
          </div>
          <hr class="border border-success" />
          <ol className="list-unstyled">
            {rankedFaculty.map((faculty, index) => (
              <li
                key={index}
                className="list-group-item mb-3 w-50 mx-auto"
                style={{
                  borderRadius: "50px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => handleItemClick(faculty)}
              >
                <span className="" style={{ marginRight: "10px" }}>
                  {index + 1}
                </span>
                <img
                  src={`/assets/profilepics/${faculty.profilepic}`}
                  alt={`${faculty.firstName} ${faculty.lastName}`}
                  style={{
                    marginRight: "10px",
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                  }}
                />
                <span>
                  {faculty.firstName} {faculty.lastName}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Rank