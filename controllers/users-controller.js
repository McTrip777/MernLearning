const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

// const DUMMY_USERS = [
//     {
//         id: 'u1',
//         name: "Jacob",
//         email: "Jacob@test.com",
//         password: 'password'
//     },
//     {
//         id: 'u2',
//         name: "Lacey",
//         email: "Lacey@test.com",
//         password: 'password'
//     },
//     {
//         id: 'u3',
//         name: "Zech",
//         email: "Zech@test.com",
//         password: 'password'
//     },
// ]

exports.getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password')
    } catch (err) {
        const error = new HttpError('Error finding users, please try again', 500)
        return next(error)
    }

    res.json({ users: users.map(u => u.toObject({ getters: true })) })
}

exports.signupUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check your data', 422))
    }

    const { name, email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Could not sign up user. Try again', 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('User already exists, please sign in', 422)
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        places: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Something went wrong signing up user', 500)
        return next(error)
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body

    let identifiedUser
    try {
        identifiedUser = await User.findOne({ email: email.toLowerCase() })
    } catch (err) {
        const error = new HttpError('Could not log in, please try again', 500)
        return next(error)
    }

    if (!identifiedUser) {
        return next(new HttpError("Could not identify user", 401))
    }
    if (identifiedUser.password !== password) {
        return next(new HttpError("Incorrect Password for user", 401))
    }

    res.status(200).json({ message: 'Logged In' })
}