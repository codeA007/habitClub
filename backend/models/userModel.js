const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usermodel = new Schema({
    username: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    totalStreaks: {
        type: Number,
        required: true,
    },
    link: {
        type: 'string',
        required: true,
    }
});

module.exports = mongoose.model('User', usermodel);