
var { Todo } = require('../models/model.todo');
var { database } = require('../db/database');
var { authenticate } = require('../middleware/authenticate');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

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
            _creator: req.user._id
            //deleted: false
        }).then((todos) => {

            let result = _(todos)
                .groupBy(x => x.createdAt)
                .map((value, key) => ({ createdAt: key, todos: value }))
                .value();

            res.send({ todos: result });

        }, (e) => {
            res.status(400).send(e);
        });
    });

    // get single todo
    app.get('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findOne({
            _id: id,
            //deleted: false,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        }).catch((e) => {
            res.status(400).send(e);
        });
    });


    // update/complete todo
    app.patch('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completed = true;
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { returnNewDocument: true }, function (err, todo) {
            if (err) {
                return res.status(400).send(err);
            } else if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        });
        /*.then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send(e);
        })*/
    });

    // delete todo
    app.delete('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        }).catch((e) => {
            res.status(400).send(e);
        });
    });

};