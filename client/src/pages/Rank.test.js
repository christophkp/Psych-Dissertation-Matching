import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Rank from './Rank';
import mockAxios from 'axios';
import { AuthContext } from '../context/AuthContext'; 
import React from 'react'
import {ToastContainer, toast} from "react-toastify";
import '@testing-library/jest-dom';
jest.mock('axios');
afterEach(() => {
    jest.clearAllMocks();
  });

const MockAuthContextProvider = ({ user, fetchUser, children }) => {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

test('fetches list of users whose role is faculty', async () => {
  const fakeUser = {
    firstName: "Oliver",
    role: "faculty"
  };
  mockAxios.get.mockResolvedValue({ data: [{ id: 1, name: 'Student 1' }, { id: 2, name: 'Student 2' }] });


  const fetchUserSpy = jest.fn();

  render(
    <MockAuthContextProvider user={fakeUser} fetchUser={fetchUserSpy}>
      <Rank />
    </MockAuthContextProvider>
  );

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });
});

test('fetches list of users whose role is student', async () => {
    const fakeUser = {
      firstName: "Oliver",
      role: "student"
    };
    mockAxios.get.mockResolvedValue({ data: [{ id: 1, firstName: 'Student 1' }, { id: 2, firstName: 'Student 2' }] });
  
  
    const fetchUserSpy = jest.fn();
  
    render(
      <MockAuthContextProvider user={fakeUser} fetchUser={fetchUserSpy}>
        <Rank />
      </MockAuthContextProvider>
    );
  
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(2);

    });

});

test('submit rankings test to see if toast displays message if no faculty or students are selected', async () => {
    const fakeUser = {
      firstName: "Oliver",
      role: "student"
    };
    mockAxios.get.mockResolvedValue({ data: [{ id: 1, firstName: 'Student 1' }, { id: 2, firstName: 'Student 2' }] });
  
  
    const fetchUserSpy = jest.fn();
  
    render(
      <MockAuthContextProvider user={fakeUser} fetchUser={fetchUserSpy}>
        <ToastContainer/>
        <Rank />
      </MockAuthContextProvider>
    );
  
    const submitButton = screen.getByText('Submit Ranking'); 
    fireEvent.click(submitButton);
    expect(await screen.findByText('Please select a faculty/student')).toBeInTheDocument();


});
  
test('submit rankings test to see if toast displays error message theres an error', async () => {
    const fakeUser = {
      firstName: "Oliver",
      role: "faculty"
    };
    mockAxios.get.mockRejectedValue(new Error('Throw Error'));
  
  
    const fetchUserSpy = jest.fn();
  
    render(
      <MockAuthContextProvider user={fakeUser} fetchUser={fetchUserSpy}>
        <ToastContainer/>
        <Rank />
      </MockAuthContextProvider>
    );
  
    
    expect(await screen.findByText('Internal Server Error')).toBeInTheDocument();
   
});


  

