const express = require('express');
const { check } = require('express-validator')

const usersContollers = require('../controllers/users-controller')

const router = express.Router();

router.get('/', usersContollers.getUsers)

router.post('/signup', 
[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
],
usersContollers.signupUser)

router.post('/login', usersContollers.loginUser)

module.exports = router;