const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'pnt123',
            email: 'pnt',
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