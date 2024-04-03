import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Schedule from './Schedule';
import '@testing-library/jest-dom';
import mockAxios from 'axios'
import {ToastContainer} from "react-toastify";
import * as router from 'react-router'
jest.mock('axios');

test('renders faculty when get request succeeds', async() => {
    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    mockAxios.get.mockResolvedValue(fakeUsers);

    render(<Schedule />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('John Doe')).toBeInTheDocument();

});

test('catches error if axios.get throws an exception', async() => {
    
    mockAxios.get.mockRejectedValue(new Error('Throw Error'));

    render(
        <>
            <ToastContainer/>
            <Schedule />
        </>
    );
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Internal Server Error')).toBeInTheDocument();
});

test('retrieve the correct faculty when we select from the list', async() => {
    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    
    mockAxios.get.mockResolvedValue(fakeUsers);

    render(
        <>
            <ToastContainer/>
            <Schedule />
        </>
    );
    const selectFaculty = await screen.findByText("John Doe");
    fireEvent.click(selectFaculty);
    expect(await screen.findByText('Professor: John Doe')).toBeInTheDocument();
});

test('retrieve the correct time when we select a time from the list', async() => {
    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    
    mockAxios.get.mockResolvedValue(fakeUsers);

    render(
        <>
            <ToastContainer/>
            <Schedule />
        </>
    );
    const selectTime = await screen.findByText("8:00 AM - 9:00 AM");
    fireEvent.click(selectTime);
    expect(await screen.findByText('Time: 8:00 AM - 9:00 AM')).toBeInTheDocument();
});

test('if user didnt select faculty display error', async() => {
    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    
    mockAxios.get.mockResolvedValue(fakeUsers);

    render(
        <>
            <ToastContainer/>
            <Schedule />
        </>
    );
    const submitMeeting = await screen.findByText("Schedule");
    fireEvent.click(submitMeeting);
    expect(await screen.findByText('Please select a faculty')).toBeInTheDocument();
});

test('if user select faculty schedule meeting and assure it created the meeting', async() => {
    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    
    mockAxios.get.mockResolvedValue(fakeUsers);

    render(
        <>
            <ToastContainer/>
            <Schedule />
        </>
    );
    const selectFaculty = await screen.findByText("John Doe");
    fireEvent.click(selectFaculty);
    const submitMeeting = await screen.findByText("Schedule");
    fireEvent.click(submitMeeting);
    expect(await screen.findByText('Meeting scheduled successfully!')).toBeInTheDocument();
});

test('if the meeting failed to create display error message', async() => {
    const fakeUsers ={
        data: [{
            id: 0,
            firstName: 'John',
            lastName: 'Doe',

        }]
    }
    
    mockAxios.get.mockResolvedValue(fakeUsers);
    mockAxios.post.mockRejectedValue("test");

    render(
        <>
            <ToastContainer/>
            <Schedule />
        </>
    );
    const selectFaculty = await screen.findByText("John Doe");
    fireEvent.click(selectFaculty);
    const submitMeeting = await screen.findByText("Schedule");
    fireEvent.click(submitMeeting);
    expect(await screen.findByText('Internal Server Error')).toBeInTheDocument();
});