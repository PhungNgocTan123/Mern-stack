const jwt = require('jsonwebtoken');
const config = require('config');

const getToken = (user) => {

    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
        config.get('JWT_SECRET'),
        {
            expiresIn: '48h'
        });
}

const isAuth = (req, res, next) => {

    const token = req.header.authoriation;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.get("JWT_SECRET"), (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = token;
            next();
            return
        })
    }
    return res.status(401).send({ msg: "Token is not supplied" })
}

const isAdmin = (req, res, next) => { 

    if(req.user && req.user.isAdmin) { 
        return next()
    }
    return res.status(401).send({ mssg: "Admon token is not valid" })
}
module.exports = { getToken, isAuth, isAdmin };