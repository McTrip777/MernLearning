const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const { getCoordsForAddress } = require('../util/location')

const Place = require('../models/place')
const User = require('../models/user')

// let DUMMY_PLACES = [
//     {
//         id: 'p1',
//         title: "Empire State Building",
//         description: "One of the most famous sky scrapers in the world",
//         location: {
//             lat: 40.7484474,
//             lng: -73.9871516
//         },
//         address: '20 W 34th St, New York, NY 10001',
//         creator: 'u1'
//     },
//     {
//         id: 'p2',
//         // imageUrl:'https://static01.nyt.com/images/2019/09/22/us/22TRUMPTOWER/22TRUMPTOWER-videoSixteenByNineJumbo1600.jpg',
//         title: "Trump Tower",
//         description: 'Trump Tower in New York',
//         address: '725 5th Ave, New York, NY 10022',
//         creator: 'u1',
//         location: {
//             lat: 40.7624,
//             lng: -73.9738
//         }
//     },
//     {
//         id: 'p3',
//         // imageUrl:'data:image/jpeg;base64,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',
//         title: "South Pole",
//         description: 'Antarctica',
//         address: 'None',
//         creator: 'u1',
//         location: {
//             lat: -84.9999724,
//             lng: 44.999447
//         }
//     }
// ]

exports.getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong finding place.', 500)
        return next(error)
    }

    if (!place) {
        const error = new HttpError("Could not find a place with the given id", 404)
        return next(error)
    }
    res.json({ place: place.toObject({ getters: true }) })
}

exports.getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let userPlaceList
    try {
        userPlaceList = await Place.find({ creator: userId })
    } catch (err) {
        const error = new HttpError('Problem finding the users places.', 500)
        return next(error)
    }

    if (!userPlaceList || userPlaceList.length === 0) {
        return next(new HttpError("Could not find a places with the given user id", 404))
    }
    res.json({ userPlaceList: userPlaceList.map(place => place.toObject({ getters: true })) })
}

exports.createPlace = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check your data', 422))
    }
    const { title, description, address, creator } = req.body

    let location
    try {
        location = await getCoordsForAddress(address)
    } catch (error) {
        return next(error)
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location,
        image: 'https://prd-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/wyoming-scenery-wallpaper-2.jpg',
        creator
    });

    let user;
    try {
        user = await User.findById(creator)
    } catch (err) {
        const error = new HttpError('Creating place failed, user id not found', 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Creating place failed, user not found', 500)
        return next(error)
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess })

        user.places.push(createdPlace);
        await user.save({ session: sess })
        await sess.commitTransaction()
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again.', 500)
        return next(error)
    }

    res.status(201).json({ place: createdPlace })
}

exports.updatePlace = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(HttpError('Invalid inputs, please check your data', 422))
    }

    const { title, description } = req.body
    const placeId = req.params.pid

    let place
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong finding place to update.', 500)
        return next(error)
    }

    place.title = title
    place.description = description

    try {
        await place.save()
    } catch (err) {
        const error = new HttpError('Something went wrong updating the place.', 500)
        return next(error)
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })
}

exports.deletePlace = async (req, res, next) => {
    const placeId = req.params.pid
    let place
    try {
        place = await Place.findById(placeId).populate('creator')
    } catch (err) {
        const error = new HttpError('Something went wrong finding place to delete.', 500)
        return next(error)
    }

    if (!place) {
        const error = new HttpError('Could not find place for this id.', 404)
        return next(error)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await place.remove({ session: sess })
        place.creator.places.pull(place)
        await place.creator.save({ session: sess })
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong deleting the place.', 500)
        return next(error)
    }

    res.status(200).json({ message: "Deleted!" })
}