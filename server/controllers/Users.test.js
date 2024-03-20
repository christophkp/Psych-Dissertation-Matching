const authRegister = require('./Users');

const res = {
    body: {
        firstName: 'testname',
        lastName: 'lastname',
        username: 'testusername@gmail.com',
        password: 'testpasss',
    }
}
test('', () => {
    authRegister();
})