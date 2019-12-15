const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: 40,
        minlength: 2,
        required: true
    },
    surname: {
        type: String,
        maxlength: 40,
        minlength: 2,
        required: true
    },
    bio: {
        type: String,
        maxlength: 1000,
        minlength: 60,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('director', DirectorSchema);