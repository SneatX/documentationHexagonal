const session = require("express-session")
const sessionAuth = require("express").Router()

module.exports = sessionAuth.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: parseInt(process.env.EXPRESS_EXPIRE)
    }
}))