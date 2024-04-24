import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";

function Rank() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [numRankings, setNumRankings] = useState(3);
  const { user } = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [commentBody, setCommentBody] = useState([]);

  useEffect(() => {
    if (user.role === 'faculty') {
      axios.get('http://localhost:3001/students', { withCredentials: true }).then((response) => {
          setListOfUsers(response.data);
        }).catch((err) => {
          toast.error('Internal Server Error');
        });
    } else {
      axios.get('http://localhost:3001/faculty', { withCredentials: true }).then((response) => {
          setListOfUsers(response.data);
        }).catch((err) => {
          toast.error('Internal Server Error');
        });
    }
    axios.get('http://localhost:3001/rank/isSubmitted', { withCredentials: true }).then((response) => {
      setIsSubmitted(response.data.hasRankSubmitted)
    }).catch((err) => {
      toast.error('Internal Server Error')
    });
  }, [user.role]);

  const handleSelection = (event, index) => {
    const updatedSelectedUsers = [...selectedUsers];
    const value = event.target.value;
    updatedSelectedUsers[index] = { value, index };
    setSelectedUsers(updatedSelectedUsers);
  }
  const handleComment = (event, index) => {
    const updatedComments = [...commentBody];
    const value = event.target.value;
    updatedComments[index] = value;
    setCommentBody(updatedComments);
  }

  const submitRankings = async (event) => {
    event.preventDefault();
    if(selectedUsers.length === 0){
      toast.error("Please select a faculty/student")
      return;
    }

    try {
      const filteredUsers = selectedUsers.filter(user => user !== undefined);
      const rankingData = filteredUsers.map((value) => ({
        rankedId: value.value, 
        rank: value.index + 1,
        comments: commentBody[value.index]
      }));
      console.log(commentBody)
      await axios.post('http://localhost:3001/rank/submit', rankingData,  {withCredentials: true});
      setIsSubmitted(true);
      toast.success("Rank Submitted Successfully");
    } catch (error) {
      toast.error(error?.response?.data.Error);
    }
  };
  const addRanking = () => {
    setNumRankings(prevNumRankings => prevNumRankings + 1);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6 border-top border-success border-4" style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", maxHeight: "650px", overflowY: "auto" }}>
          <div className='p-3'>
            {isSubmitted ? (
              <div>
                <h3 className='mb-3 mt-3'>Thank You!</h3>
                <p>Your rankings have been submitted successfully.</p>
              </div>
            ) : (
              <div>
                <h3 className='mb-3 mt-3'>{user.role === 'student' ? 'Faculty Ranking' : 'Student Ranking'}</h3>
                <p>Select {user.role === 'student' ? 'faculty' : 'students'} in order of most want to work with to least. <br></br> You are not required to rank every {user.role === 'student' ? 'faculty' : 'students'}, only rank the {user.role === 'student' ? 'faculty' : 'students'} you met with.</p>
                <hr></hr>
                <form onSubmit={submitRankings}>
                  {[...Array(numRankings)].map((_, index) => (
                    <div key={index}>
                      <div className="form-group">
                        <label htmlFor={`select${index}`} className='mt-3 '>{user.role === 'student' ? 'Select Faculty' : 'Select Student'}</label>
                        <select className="form-select mb-3 " id={`select${index}`} onChange={event => handleSelection(event, index)}>
                          <option selected>{user.role === 'student' ? 'Please select a faculty' : 'Please select a student'}</option>
                          {listOfUsers.map((user, key) => (
                            <option key={key} value={user.id}>{user.firstName} {user.lastName}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group" >
                        <label htmlFor={`comments${index}`}>Additional Comments</label>
                        <textarea className="form-control bg-light" onChange={event => handleComment(event, index)} id={`comments${index}`} rows="3" placeholder="Enter additional comments here..."></textarea>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mt-3">
                    <button type="button" className="btn btn-success" onClick={addRanking}>Add More Rankings</button>
                    <button type="submit text-light" className="btn btn-success">Submit Ranking</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank;