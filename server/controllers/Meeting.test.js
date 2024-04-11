const {scheduleMeeting} = require('./Meeting');
const { Meetings } = require('../models');

jest.mock('../models');
afterEach(() => {
    jest.clearAllMocks();
});

const req = {
    body: {
        date: '2024-04-20 04:00:00',
        time: '2024-04-20 04:00:00',
        studentId: 5,
        facultyId: 4,
    },
    user: {
        id: 4
    }
};

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
};

test('test to check that meeting creation is successful and that it sends back the meeting', async () => {
    
    const mockMeetingData = { id: 1, date: '2024-04-10', time: '09:00', studentId: 123, facultyId: 456 };
    Meetings.create.mockResolvedValueOnce(mockMeetingData);

    await scheduleMeeting(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockMeetingData);
});

test('test to check that meeting creation is unsuccessful and that it catches error and sends back status code', async () => {
    
    Meetings.create.mockRejectedValueOnce(new Error('Throw Error'));

    await scheduleMeeting(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);

});