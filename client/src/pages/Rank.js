import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";

function Rank() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [numRankings, setNumRankings] = useState(3);
  const { user } = useContext(AuthContext);

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
  }, [user.role]);

  const handleSelection = (event, index) => {
    const updatedSelectedUsers = [...selectedUsers];
    updatedSelectedUsers[index] = event.target.value;
    setSelectedUsers(updatedSelectedUsers);
  }

  const submitRankings = async (event) => {
    event.preventDefault();
    console.log(selectedUsers);
    if(selectedUsers.length === 0){
      toast.error("Please select a faculty/student")
      return;
    }

    try {
      const completeRankings = selectedUsers
      .map((value, index) => ({ value, index }))
      .filter(({ value }) => value && value.rankedId !== undefined);

      const rankingData = completeRankings.map((value, index) => ({
        rankedId: value, 
        rank: index + 1,
      }));

      await axios.post('http://localhost:3001/rank/submit', rankingData,  {withCredentials: true});
      toast.success("Rank Submitted Successfully")

    } catch (error) {
      toast.error(error?.response?.data.Error);
    }
  };
  const addRanking = () => {
    setNumRankings(prevNumRankings => prevNumRankings + 1);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h3>Rank your Expierence</h3>
          <form onSubmit={submitRankings}>
          {[...Array(numRankings)].map((_, index) => (
            <>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">{user.role === 'student' ? 'Select Faculty' : 'Select Student'}</label>
              <select className="form-select" onChange={event => handleSelection(event, index)}>
              <option selected>{user.role === 'student' ? 'Please select a faculty' : 'Please select a student'}</option>
                {listOfUsers.map((user, key) => {
                  return(
                    <option key={key} value={user.id}>{user.firstName} {user.lastName}</option>
                  )
                }
                )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Additional Comments</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            </>
            ))}
            <button type="button" className="btn btn-primary" onClick={addRanking}>Add Ranking</button>
            <button type="submit" className="btn btn-primary">Submit Ranking</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Rank


