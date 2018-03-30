const { ObjectID } = require('mongodb');
const { Todo } = require('../../models/model.todo');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [
    {
        _id: new ObjectID(),
        text: 'Todo test 1',
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: 'Todo test 2',
        completed: true,
        completedAt: 333,
        _creator: userTwoId
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = { todos, populateTodos };