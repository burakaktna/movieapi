const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectID,
    title: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 1,
    },
    category: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 1,
    },
    country: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 1,
    },
    year: {
        type: Number,
        max: 2040,
        min: 1900,
        required: true
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('movie', MovieSchema);