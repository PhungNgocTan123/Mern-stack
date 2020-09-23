const express = require('express');
const User = require('../models/User');
// const getToken = require('../util');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    const token = jwt.sign({
        id: savedUser._id,
        name: savedUser.name,
        password: savedUser.password,
        isAdmin: savedUser.isAdmin,
    },
        config.get('JWT_SECRET'),
        { expiresIn: "48h" }
    );
    if (signinUser) {
        res.send({
            token,
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
        });
    } else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
    }
});
// register 
router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) throw Error('User already exist.');
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Something went wrong saving user.");
        const token = jwt.sign({
            id: savedUser._id,
            name: savedUser.name,
            password: savedUser.password,
            isAdmin: savedUser.isAdmin,
        },
            config.get('JWT_SECRET'),
            {
                expiresIn: '48h'
            }
        )
        if (!token) throw Error('Couldnt sign the token');
        res.status(200).json({
            token,
            _id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email.email,
            isAdmin: savedUser.isAdmin,
            error: savedUser.Error,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
});

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'pnt123',
            email: 'pnt@gmail.com',
            password: 'pnt1998',
            isAdmin: true
        })

        const newUser = await user.save();
        res.send(newUser)
    } catch (error) {
        res.send({ msg: error.message });
    }
})

module.exports = router;