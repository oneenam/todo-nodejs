
var { Todo } = require('../models/model.todo');
var { database } = require('../db/database');
var { authenticate } = require('../middleware/authenticate');

module.exports = app => {

    // create new todo
    app.post('/todos', authenticate, (req, res) => {
        var todo = new Todo({
            text: req.body.text,
            _creator: req.user._id
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });

    // todo list
    app.get('/todos', authenticate, (req, res) => {
        Todo.find({
            _creator: req.user._id,
            deleted: false
        }).then((todos) => {
            res.send({ todos });
        }, (e) => {
            res.status(400).send(e);
        });
    });

};