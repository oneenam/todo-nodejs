const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/model.user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'userone@example.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'usertwo@example.com',
        password: 'userTwoPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
        }]
    }
];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = { users, populateUsers };

