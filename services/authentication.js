const JWT = require('jsonwebtoken');

const secret = "sdfhwoi@fdljq01eu8&329ori31$09r(";

function createToken(user){
    const payload = {
        _id: user._id,
        fullName: user.firstName + ' ' + user.lastName,
        email: user.email,
        profileImg: user.profileImg,
        role: user.role
    };

    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = { createToken, validateToken };