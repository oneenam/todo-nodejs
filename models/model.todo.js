var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    //to keep history we can use it instead delete data permanently
    /*deleted: {
        type: Boolean,
        default: false
    },*/
    completedAt: {
        type: Number,
        default: null
    },
    createdAt: { type: Date, default: Date.now },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = { Todo };
