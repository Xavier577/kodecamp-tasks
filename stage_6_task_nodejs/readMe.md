# Stage 6 task (nodejs)

This task was to test our knownledge on authorization and authentication.

# Api Endpoints

`http://localhost:3000/auth/login` => To sign in

`http://localhost:3000/auth/signup` => To create and account

`http://localhost:3000/user/profile` => To check user profile

`http://localhost:3000/user/profile/update` => To update profile

`http://localhost:3000/user/profile/delete` => To delete user profile

# Creating an Account (a user)

```
(Using curl syntax)

curl -X POST http://localhost:3000/auth/signup --header 'content-type: application/json' --data '{
      "userName": "yourUserName",
      "email": "yourEmail",
      "password": "yourPassword",
      "confirmPassword: "yourPassword"
}'

(response if successful)
{
    "okay": true,
    "message": "User created successfully"
}
```

you don't have to user curl to send your request, i am just using this as an example, you can use any rest api client like postman or insomnia but your data and headers must be set in the same way.

# Logging in a user

```
(Using curl syntax)

curl -X POST http://localhost:3000/auth/login --header 'content-type: application/json' --data '{
"email": "yourEmail",
"password": "yourPassword",

}'

(response if successful)
{
    "token": "yourJwtToken,
    "message": "user successfully signed in"
}
```

# Getting user profile

```
(Using curl syntax)

curl -X GET http://localhost:3000/user/profile --header 'authorization: yourJwtToken'

(example response if successful)
"profile": {
        "id": "5413b3ff-ae6f-471f-aa6e-3e9d75af6685",
        "email": "yourEmail@gmail.com",
        "createdAt": "2021-10-24T18:51:33.083Z",
        "updatedAt": "2021-10-24T18:51:33.083Z",
        "userName": "yourUserName"
    }
```

# Updating a user profile

```
(Using curl syntax)

curl -X PUT http://localhost:3000/user/profile/update --header 'Authorization: yourJwtToken' --data '{
      "userName": "yourUserName",
      "email": "yourEmail",
      "password": "yourPassword",
      "status": "yourNewStatus"
}'

(response if successful)
{
    "message": "user sucessfully updated"
}
```

note that your can update one or more of the various fields.

# Deleting the user account

```
(Using curl syntax)

curl -X DELETE http://localhost:3000/user/profile/delete --header 'Authorization: yourJwtToken' --data '{
      "id": "yourId"
}'

(response if successful)
{
    "message": ` ${userName} has been deleted `
}
```

note id is the id from the user profile.

# Final note

You have to be authorized to access, update and delete a user profile :)
