const {v4:uuid} = require('uuid')
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error')

const DUMMY_USERS = [
    {
        id: 'u1',
        name: "Jacob",
        email: "Jacob@test.com",
        password: 'password'
    },
    {
        id: 'u2',
        name: "Lacey",
        email: "Lacey@test.com",
        password: 'password'
    },
    {
        id: 'u3',
        name: "Zech",
        email: "Zech@test.com",
        password: 'password'
    },
]

exports.getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS })
}

exports.signupUser = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs, please check your data', 422)
    }

    const { name, email, password } = req.body

    const hasUser = DUMMY_USERS.find(u => u.email === email)

    if(hasUser) throw new HttpError("Could not register user, email already exists")

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser)

    res.status(201).json({createdUser : createdUser})
}

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body
    
    const identifiedUser = DUMMY_USERS.find(u => u.email === email)

    if(!identifiedUser){
        throw new HttpError("Could not identify user", 401)
    }
    if(identifiedUser.password !== password){
        throw new HttpError("Incorrect Password for user", 401)
    }

    res.status(200).json({message : 'Logged In'})
}