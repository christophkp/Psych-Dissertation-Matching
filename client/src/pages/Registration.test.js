import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Registration from './Registration';
import '@testing-library/jest-dom';
import mockAxios from 'axios'
import {ToastContainer} from "react-toastify";
import * as router from 'react-router'

jest.mock('axios');

const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  });


test('test to make verify that each input is initially an empty string', () => {
    render(
        <MemoryRouter>
            <Registration />
        </MemoryRouter>
    );
    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const username = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    expect(firstName.value).toMatch("");
    expect(lastName.value).toMatch("");
    expect(username.value).toMatch("");
    expect(password.value).toMatch("");
});

test('test to make sure that invalid input adds the was-validated class', () => {
    render(
        <MemoryRouter>
            <Registration />
        </MemoryRouter>
    );
    const registerButton = screen.getByText("Register");
    const form = screen.getByTestId('registration-form');

    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const username = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');

    fireEvent.change(firstName, { target: { value: '' } });
    fireEvent.change(lastName, { target: { value: '' } });
    fireEvent.change(username, { target: { value: '' } });
    fireEvent.change(password, { target: { value: '' } });

    fireEvent.click(registerButton);

    expect(form.classList.contains('was-validated')).not.toBeFalsy();

});

test('test to make sure that valid input doesnt add the was-validated class', async() => {
    render(
        <MemoryRouter>
            <ToastContainer />
            <Registration />
        </MemoryRouter>
    );
    const registerButton = screen.getByText("Register");
    const form = screen.getByTestId('registration-form');

    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const username = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');

    fireEvent.change(firstName, { target: { value: 'test' } });
    fireEvent.change(lastName, { target: { value: 'test' } });
    fireEvent.change(username, { target: { value: 'test@gmail.com' } });
    fireEvent.change(password, { target: { value: 'test' } });

    fireEvent.click(registerButton);

    expect(form.classList.contains('was-validated')).toBeFalsy();
    expect(await screen.findByText("Registration Success")).toBeInTheDocument();

    expect(navigate).toHaveBeenCalledWith('/login');


});

test('test to make sure the axios post request gets called with valid input and shows success', async () => {
    
    render(
        <MemoryRouter>
            <ToastContainer />
            <Registration />
        </MemoryRouter>
    );
    const mockedData = { firstName: 'John', lastName: 'Doe', username: 'john@example.com', password: 'password' };
    const registerButton = screen.getByText("Register");

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: mockedData.firstName } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: mockedData.lastName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: mockedData.username } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: mockedData.password } });

    fireEvent.click(registerButton);
    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3001/register', mockedData);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("Registration Success")).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith('/login');


});

test('test to make sure the axios post request doesnt get called with invalid input', () => {
    
    render(
        <MemoryRouter>
            <Registration />
        </MemoryRouter>
    );
    const mockedData = { firstName: 'John', lastName: 'Doe', username: 'john', password: 'password' };
    const registerButton = screen.getByText("Register");

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: mockedData.firstName } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: mockedData.lastName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: mockedData.username } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: mockedData.password } });

    fireEvent.click(registerButton);
    expect(mockAxios.post).toHaveBeenCalledTimes(0);
});

test('test to make sure if the post fails, that its error is caught and displayed', async() => {
    
    render(
        <MemoryRouter>
            <ToastContainer />
            <Registration />
        </MemoryRouter>
    );
    const mockedData = { firstName: 'John', lastName: 'Doe', username: 'john@gmail.com', password: 'password' };
    const registerButton = screen.getByText("Register");

    mockAxios.post.mockRejectedValue({ response: { data: { Error: 'Error message' } } });

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: mockedData.firstName } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: mockedData.lastName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: mockedData.username } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: mockedData.password } });

    fireEvent.click(registerButton);


    expect(await screen.findByText("Error message")).toBeInTheDocument();
});