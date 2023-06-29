# Post app Backend Project

## Project - Post Application

## FEATURE I - User

### Models

- User Model

```yaml
{
  name: { string, mandatory },
  email: { string, mandatory, valid email, unique },
  password: { string, mandatory, valid password },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}
```

## User APIs

### POST /register

- Create a user document from request body.
- Save password in encrypted format. (use bcrypt-js)
- **Response format**

```yaml
{
  "message": "User registration successfull",
  "data":
    {
      "name": "bruce",
      "email": "ash@gmail.com",
      "_id": "643c2495e44153efbabecb8f",
      "createdAt": "2023-04-16T16:38:45.110Z",
      "updatedAt": "2023-04-16T16:38:45.110Z",
    },
}
```

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
  > **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- **Response format**

```yaml
{
  "message": "Login Success",
  "data":
    {
      "_id": "6433e4e016a27dfe09b9337f",
      "name": "bruce",
      "email": "batman@gmail.com",
      "createdAt": "2023-04-10T10:28:48.448Z",
      "updatedAt": "2023-04-11T13:15:56.868Z",
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMzZTRlMDE2YTI3ZGZlMDliOTMzN2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE1Mzk3NjYsImV4cCI6MTY4MTYyNjE2Nn0.6y9aKeZMKtRrsqLW9v-1T6IlkcDMaybTC3D-fXgyj5M",
}
```

## FEATTURE II - Posts

### Models

- Post Model

```yaml
{
  {
    title: { type: String, require: true, lowercase: true },
    body: { type: String, require: true },
    status: { type: String, require: true },
    status: { type: String, require: true },
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    geoLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true },
}
```

## Posts API (authentication required / only admin can create, update and delete file)

### POST /posts

- Create a post document from request body.
- Upload image to S3 bucket and save image public url in document.
- **Response format**

```yaml
{
  "message": "post Created successfully",
  "data":
    {
      "title": "modern livingroom 2",
      "body": "3ds max vray",
      "createdBy":"ObjectID"
      "geoLocation": {
      "latitude": {
        "type": Number,
        "required": "true",
      },
      "longitude": {
        "type": Number,
        "required": "true",
      },
    },
      "_id": "6437ee55be7216124fe0c425",
      "createdAt": "2023-04-13T11:58:13.564Z",
      "updatedAt": "2023-04-13T11:58:13.564Z",
    },
}
```

### GET /File

- Returns all posts by "latitude",
  "longitude" in the collection..

- **Response format**

```yaml

{
    "data": [
         "data": {
        "0": {
            "geoLocation": {
                "latitude": 20,
                "longitude": 20
            },
            "_id": "649db57d01d559ba32b115f2",
            "title": "updatetitle",
            "body": "details",
            "createdBy": {
                "_id": "649d97073a4d63561ad9f9c9",
                "name": "ash",
                "email": "ash@gmail.com",
                "password": "$2a$10$zVbyfg0UFDDi/przxZGkeO5EvlAm4P4u/N7VL4x3Y7D6mD5LxBhd2",
                "createdAt": "2023-06-29T14:36:55.157Z",
                "updatedAt": "2023-06-29T14:36:55.157Z",
                "__v": 0
            },
            "createdAt": "2023-06-29T16:46:53.243Z",
            "updatedAt": "2023-06-29T17:11:13.733Z",
            "__v": 0,
            "status": "active"
        },
        "activeCount": 1,
        "nonActiveCount": 0
    }

}

```

### PUT /post/:postId

- Updates a post by changing at least one or all fields
- Check if the fileId exists (must have isDeleted false and is present in collection).
- **Response format**

```yaml
{
  "data":
    {
      "geoLocation": { "latitude": 20, "longitude": 20 },
      "_id": "649db57d01d559ba32b115f2",
      "title": "updatetitle",
      "body": "details",
      "createdBy": "649d97073a4d63561ad9f9c9",
      "createdAt": "2023-06-29T16:46:53.243Z",
      "updatedAt": "2023-06-29T17:11:13.733Z",
      "__v": 0,
      "status": "active",
    },
  "message": "post Updated successfully",
}
```

### DELETE /post/:postId

- Deletes a post by postId if it's not already deleted
- **Response format**

```yaml
{ "message": "post Deleted successfully" }
```
