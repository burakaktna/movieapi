const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds353378.mlab.com:53378/heroku_x2f5zzgb', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error ' + err);
    });

    mongoose.Promise = global.Promise;
};