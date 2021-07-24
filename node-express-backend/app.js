const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')

const app = express()

app.use(bodyParser.json())

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

app.listen(5000)