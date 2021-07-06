import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/jsx/PlaceList'

const DUMMY_PLACES = [
    {
        id:'p1',
        imageUrl:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        title:"Beautiful Scenery",
        description:'Sunset over a Lake',
        address:'Unknown',
        creatorId:'u1',
        location:{
            lat: 0,
            lng: 0
        }
    }
]

const UserPlaces = () => {
    const userId = useParams().userId
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId)
    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
