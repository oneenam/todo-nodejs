# todo-nodejs


## Requirements
- node and npm
- mongodb (make sure you have your own local or remote mongodb database URI configured in `config/config.json`)

## Installation
1. Clone this repository
2. Install the application: `npm install`
3. Place your own mongodb URI in `config/config.json`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:3000`

Note: you can run test command to test all services using this command: `npm run test-watch` or you can test services using `Postman`

## API
#### Users
##### Registration

* path: `users/registration`

* method: `POST`

* params: `email, password`

* response: `Status 200 OK` with Headers `x-auth` value


##### Login

* path: `users/login`

* method: `POST`

* params: `email, password`

* response: `Status 200 OK` with Headers `x-auth` value

##### Info

* path: `users/me`

* method: `GET`

* params: Headers `x-auth`

* response: 
`{
    "_id": "5abe5d7f0133641a610a1873",
    "email": "userone@example.com"
}`
