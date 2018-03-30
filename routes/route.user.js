var { User } = require('../models/model.user');
var { database } = require('../db/database');
const _ = require('lodash');


module.exports = app => {

    //public, no auth neded
    /** login */
    app.post('/users/login', (req, res) => {

        var body = _.pick(req.body, ['email', 'password']);

        User.findByCredentials(body.email, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
            });
        }).catch((e) => {
            res.status(400).send(e);
        });

    });

    /** registration */
    app.post('/users/registration', (req, res) => {

        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);

        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });

    });

    //private, auth needed 


};