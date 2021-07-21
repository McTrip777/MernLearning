const express = require('express');

const placesContollers = require('../controllers/places-controller')

const router = express.Router();

router.get('/:pid', placesContollers.getPlaceById)

router.get('/user/:uid', placesContollers.getPlaceByUserId)

router.post('/', placesContollers.createPlace)

module.exports = router;