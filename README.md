# Share Places

## Introduction

> Live Site - https://share-places-you-love.netlify.app/

## Description

> Build so users can share locations they have been for memory and for others to see and be able to navigate to those places as well. A form or social media designed for travelers!

### Dependencies

* FrontEnd - "axios", "react", "react-dom", "react-router-dom", "react-transition-group"
* BackEnd - "axios", "bcryptjs", "body-parser", "dotenv", "express", "express-validator", "jsonwebtoken", "mongoose", "mongoose-unique-validator", "multer", "uuid", "nodemon"
* DataBase - "MongoDB Atlas"
* API - "Google Cloud Platform (Geocoding, Maps Javascript)"

## Code Sample

``` 
const placeSubmitHandler = async (event) => {
  event.preventDefault();
  const { title, description, address, image } = formState.inputs;
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append("description", description.value)
  formData.append("address", address.value)
  formData.append("image", image.value)
  await sendRequest(
    `${process.env.REACT_APP_BACKEND_URL}/places`,
    "post",
    formData,
    { "Content-Type": "application/json", Authorization: 'Bearer ' + auth.token }
  ).then((res) => {
    history.push('/')
  });
};
```

## Authors

Jacob McFaul
[@McTrip777](jacob.m.mcfaul@gmail.com)

## License

This project is licensed under the [MIT] License