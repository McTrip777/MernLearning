const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const HttpError = require('./models/http-error')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'get, post, patch, delete, GET, POST, PATCH, DELETE')
    next()
})

app.use('/api/users', usersRoutes)
app.use('/api/places', placesRoutes)

app.use((req, res, next) => {
    const err = new HttpError("Could not find this route.", 404)
    throw err
})

app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }

    res.status(err.code || 500);
    res.json({ message: err.message || "An unknown error occurred" })
})

mongoose
    .connect(dotenv.parsed.MONDGO_DB_CONNECTION)
    .then(() => {
        app.listen(5000)
        console.log("I am working don't worry")
    })
    .catch(err => {
        console.log(err)
    })
