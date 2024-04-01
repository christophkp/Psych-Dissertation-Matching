const { Users } = require('../models');
const bcrypt = require('bcrypt');

async function authRegister(req, res) {
    const { firstName, lastName, username, password } = req.body;
    try {
        const user = await Users.findOne({ where: { username: username } });
        if(user){
            res.status(400);
            return res.json({Error: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword,
        });
        res.json({User: "User Registered Successfully"});
    }
    catch(err){
        res.status(500)
        res.json({Error: err});
    }
};

async function getFaculty(req, res) {
    try{
        const faculty = await Users.findAll({ where: {role: "student"}});
        res.json(faculty);
    }catch(err){
        res.status(500);
        res.json({Error: err});
    }
};



module.exports = { authRegister, getFaculty };