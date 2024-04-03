import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';
import mockAxios from 'axios'
jest.mock('axios');
import {ToastContainer} from "react-toastify";

test('test to check that faculties information is rendered', async() => {

    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    mockAxios.get.mockResolvedValue(fakeUsers);
  
    render(<Home />);

    expect(await screen.findByText('John Doe')).toBeTruthy();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

});

test('test to check that errors getting faculty is caught', async() => {

    mockAxios.get.mockRejectedValue({ response: { data: { Error: 'Error message' } } });
  
    render(
        <>
            <ToastContainer/>
            <Home />
        </>
    );    
    expect(await screen.findByText('Internal Server Error')).toBeInTheDocument();


});