const {authRegister} = require('./Users');
const { Users } = require('../models');
const bcrypt = require('bcrypt');

jest.mock('../models');
jest.mock('bcrypt');

const req = {
    body: {
        firstName: 'testname',
        lastName: 'lastname',
        username: 'testusername@gmail.com',
        password: 'testpasss',
    }
};

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

afterEach(() => {
    jest.clearAllMocks();
});

test('test to check if an exisiting user exists that it sends a status code of 400 and json back', async () => {
    Users.findOne.mockImplementationOnce(() => ({
        firstName: 'testname',
        lastName: 'lastname',
        username: 'testusername@gmail.com',
        password: 'testpasss',
    }));

    await authRegister(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
});

test('test to check if a unique user password is hashed, created with the hashed password, and sends back json', async () => {
    Users.findOne.mockImplementationOnce(() => null);
    Users.create.mockResolvedValueOnce(() => ({
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        password: 'test',
    }));
    bcrypt.hash.mockReturnValueOnce('hashedPass');
    await authRegister(req, res);
    expect(bcrypt.hash).toHaveBeenCalledWith('testpasss', 10);
    expect(Users.create).toHaveBeenCalledWith({
        firstName: 'testname',
        lastName: 'lastname',
        username: 'testusername@gmail.com',
        password: 'hashedPass',
    });
    expect(res.json).toHaveBeenCalledTimes(1);
});

test('test to catch an error', async () => {
    Users.findOne.mockImplementationOnce(() => null);
    bcrypt.hash.mockReturnValueOnce('hashedPass');
    Users.create.mockRejectedValueOnce(new Error('Throw Error'));
    await authRegister(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
});