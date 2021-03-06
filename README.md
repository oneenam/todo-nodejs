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

* path: `/users/registration`

* method: `POST`

* params: `email, password`

* response: `Status 200 OK` with Headers `xauth` value


##### Login

* path: `/users/login`

* method: `POST`

* params: `email, password`

* response: `Status 200 OK` with Headers `xauth` value

##### Info

* path: `/users/me`

* method: `GET`

* params: Headers `xauth`

* response: 
`{
    "_id": "5abe5d7f0133641a610a1873",
    "email": "userone@example.com"
}`


#### Todo
##### Create

* path: `/todos`

* method: `POST`

* params: `text` with Headers `xauth` value

* response: 
`
{
    "completed": false,
    "completedAt": null,
    "_id": "5abeb3cbc93c6a26de0de378",
    "text": "Todo 10",
    "_creator": "5abe7f82732109205d53b690",
    "__v": 0
}
`
##### Select

* path: `/todos`

* method: `GET`

* params: Headers `xauth` value

* response: 
`
{
    "todos": [
        {
            "createdAt": "01 Apr 2018",
            "todos": [
                {
                    "completed": true,
                    "completedAt": 1522760568650,
                    "createdAt": "01 Apr 2018",
                    "_id": "5ac211b13848730014d2005b",
                    "text": "Todo test 1",
                    "_creator": "5ac20b1d5f08a700145139bb",
                    "__v": 0
                }
            ]
        }
    ]
}`


##### Select

* path: `/todos/:id`

* method: `PATCH`

* params: `text, completed` with Headers `xauth` value

* response: 
`
{
    "todo": {
        "completed": true,
        "completedAt": 1522447531047,
        "_id": "5abea212e1bad3236bf906f1",
        "text": "Todo 10",
        "_creator": "5abe7f82732109205d53b690",
        "__v": 0
    }
}`

##### Delete

* path: `/todos/:id`

* method: `DELETE`

* params: Headers `xauth` value

* response: 
`
{
    "todo": {
        "completed": true,
        "completedAt": 1522447531047,
        "_id": "5abea212e1bad3236bf906f1",
        "text": "Todo 10",
        "_creator": "5abe7f82732109205d53b690",
        "__v": 0
    }
}`
