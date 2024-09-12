const session = require("express-session")
const sessionAuth = require("express").Router()

module.exports = sessionAuth.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: parseInt(process.env.EXPRESS_EXPIRE)
    }
}))