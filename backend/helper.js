require("dotenv").config()
const Cryptr = require('cryptr');
var jwt = require('jsonwebtoken');
const cryptr = new Cryptr(process.env.SECRET_KEY);

const generateUniqueImageName = (image) => {
    return Math.floor(Math.random() * 10000) + new Date().getTime() + image
}

const encryptedPassword = (value) => cryptr.encrypt(value);
const decryptedPassword = (value) => cryptr.decrypt(value);

const generateToken = (user) => {

    return jwt.sign(user, process.env.SECRET_KEY)
};


const verifyToken = (value) => {

    return jwt.verify(value, process.env.SECRET_KEY)
};


module.exports = {
    generateUniqueImageName, encryptedPassword, decryptedPassword, generateToken, verifyToken
}