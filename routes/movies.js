const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
    const promise = Movie.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/', (req, res, next) => {
    const movie = new Movie(req.body);
    const promise = movie.save();
    promise.then((data) => {
        res.json({status: 1, message: 'The movie has been saved!'});
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/top10', (req, res) => {
    const promise = Movie.find({}).limit(10).sort({imdb_score: -1});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id;
    const promise = Movie.findById(movie_id);
    promise.then((movie) => {
        if (movie) {
            res.json(movie);
        } else {
            res.json({error: {message: 'The movie was not found!', code: 1874}});
        }
    }).catch((err) => {
        res.json(err)
    });
});

router.put('/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id;
    const promise = Movie.findByIdAndUpdate(movie_id, req.body);
    promise.then((movie) => {
        if (movie) {
            res.json({status: 1, message: 'The movie has been updated!'});
        } else {
            res.json({error: {message: 'The movie was not found!', code: 1871}});
        }
    }).catch((err) => {
        res.json(err)
    });
});

router.delete('/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id;
    const promise = Movie.findByIdAndRemove(movie_id);
    promise.then((movie) => {
        if (movie) {
            res.json({status: 1, message: 'The movie has been deleted!'});
        } else {
            res.json({error: {message: 'The movie was not found!', code: 1855}});
        }
    }).catch((err) => {
        res.json(err)
    });
});
router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;
    const promise = Movie.find(
        {
            year: {
                '$gte':  parseInt(start_year),
                '$lte': parseInt(end_year)
            }
        }
    );
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});


module.exports = router;
